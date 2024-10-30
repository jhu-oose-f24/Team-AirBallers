import { PrismaClient } from "@prisma/client";
import DescriptionGenerator from "./DescriptionGenerator";

const prisma = new PrismaClient();

export default class EditableDescriptionGenerator {
  constructor() {
    this.id = null;
    this.description = "";
    this.edits = {
      color: null,
      sleeveLength: null,
    };
    this.createdAt = null;
    this.updatedAt = null;
  }

  async save() {
    const data = {
      description: this.description,
      edits: JSON.stringify(this.edits),
      updatedAt: new Date(),
    };

    if (this.id) {
      const updated = await prisma.description.update({
        where: { id: this.id },
        data,
      });
      this.updatedAt = updated.updatedAt;
      return updated;
    } else {
      const saved = await prisma.description.create({
        data: {
          ...data,
          createdAt: new Date(),
        },
      });
      this.id = saved.id;
      this.createdAt = saved.createdAt;
      this.updatedAt = saved.updatedAt;
      return saved;
    }
  }

  static async load(id) {
    const doc = await prisma.description.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new Error("Description not found");
    }

    const instance = new EditableDescriptionGenerator();
    instance.id = doc.id;
    instance.description = doc.description;
    instance.edits =
      typeof doc.edits === "string" ? JSON.parse(doc.edits) : doc.edits;
    instance.createdAt = doc.createdAt;
    instance.updatedAt = doc.updatedAt;
    return instance;
  }

  async generateInitialDescription(userPrompt) {
    this.description = await DescriptionGenerator.createFrom(userPrompt);
    return await this.save();
  }

  async setColor(hexColor) {
    if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
      this.edits.color = hexColor;
      return await this.save();
    } else {
      throw new Error("Invalid hex color format. Please use #RRGGBB format.");
    }
  }

  async setSleeveLength(lengthCm) {
    if (typeof lengthCm === "number" && lengthCm > 0) {
      this.edits.sleeveLength = lengthCm;
      return await this.save();
    } else {
      throw new Error(
        "Invalid sleeve length. Please provide a positive number in cm.",
      );
    }
  }

  async applyEdits() {
    let editDescription = "";
    if (this.edits.color) {
      editDescription += `\nEDIT: USE COLOR ${this.edits.color}`;
    }
    if (this.edits.sleeveLength) {
      editDescription += `\nEDIT: CHANGE SLEEVE LENGTH TO ${this.edits.sleeveLength} cm`;
    }
    if (editDescription) {
      this.description += editDescription;
    }
    return await this.save();
  }

  getDescription() {
    return this.description;
  }

  toJSON() {
    return {
      id: this.id,
      description: this.description,
      edits:
        typeof this.edits === "string" ? JSON.parse(this.edits) : this.edits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
