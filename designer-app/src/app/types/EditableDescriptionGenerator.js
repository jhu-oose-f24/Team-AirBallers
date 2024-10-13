import DescriptionGenerator from "./DescriptionGenerator";

export default class EditableDescriptionGenerator {
    constructor() {
        this.description = "";
        this.edits = {
            color: null,
            sleeveLength: null,
        };
    }

    async generateInitialDescription(userPrompt) {
        this.description = await DescriptionGenerator.createFrom(userPrompt);
        return this.description;
    }

    setColor(hexColor) {
        if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
          this.edits.color = hexColor;
        } else {
          throw new Error("Invalid hex color format. Please use #RRGGBB format.");
        }
    }

    setSleeveLength(lengthCm) {
        if (typeof lengthCm === "number" && lengthCm > 0) {
          this.edits.sleeveLength = lengthCm;
        } else {
          throw new Error("Invalid sleeve length. Please provide a positive number in cm.");
        }
    }

    applyEdits() {
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
        return this.description;
    }

    getDescription() {
        return this.description;
    }

}