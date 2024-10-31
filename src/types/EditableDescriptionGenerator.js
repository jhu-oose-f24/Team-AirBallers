import { PrismaClient } from "@prisma/client";
import DescriptionGenerator from "./DescriptionGenerator";

export default class EditableDescriptionGenerator {
    constructor() {
        this.description = "";
        this.edits = {
            // Common edits
            color: null,
            fabric: null,

            // T-shirt specific edits
            sleeveLength: null,
            fit: null,
            neckline: null,
            length: null,
            hemline: null,

            // Pants specific edits
            rise: null,
            cut: null,
            seams: null,
            wash: null,
            distressing: null
        };
        this.garmentType = null; // 'tshirt' or 'pants'
    }

    async generateInitialDescription(userPrompt) {
        this.description = await DescriptionGenerator.createFrom(userPrompt);
        // Detect garment type from the description
        this.garmentType = this.description.toLowerCase().includes('pants') ? 'pants' : 'tshirt';
        return this.description;
    }

    // Common Edits
    setColor(hexColor) {
        if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
            this.edits.color = hexColor;
        } else {
            throw new Error("Invalid hex color format. Please use #RRGGBB format.");
        }
    }

    setFabric(fabric) {
        const validFabrics = [
            'cotton', 'polyester', 'linen', 'wool', 'silk', 'denim',
            'jersey', 'fleece', 'spandex', 'rayon', 'blend'
        ];
        if (validFabrics.includes(fabric.toLowerCase())) {
            this.edits.fabric = fabric;
        } else {
            throw new Error(`Invalid fabric. Please choose from: ${validFabrics.join(', ')}`);
        }
    }

    // T-shirt specific edits
    setSleeveLength(lengthCm) {
        if (typeof lengthCm === "number" && lengthCm > 0) {
            this.edits.sleeveLength = lengthCm;
        } else {
            throw new Error("Invalid sleeve length. Please provide a positive number in cm.");
        }
    }

    setFit(fit) {
        const validFits = ['slim', 'regular', 'loose', 'oversized', 'fitted'];
        if (validFits.includes(fit.toLowerCase())) {
            this.edits.fit = fit;
        } else {
            throw new Error(`Invalid fit. Please choose from: ${validFits.join(', ')}`);
        }
    }

    setNeckline(neckline) {
        const validNecklines = ['crew', 'v-neck', 'scoop', 'boat', 'mock', 'turtleneck'];
        if (validNecklines.includes(neckline.toLowerCase())) {
            this.edits.neckline = neckline;
        } else {
            throw new Error(`Invalid neckline. Please choose from: ${validNecklines.join(', ')}`);
        }
    }

    setLength(length) {
        const validLengths = ['cropped', 'regular', 'longline', 'tunic'];
        if (validLengths.includes(length.toLowerCase())) {
            this.edits.length = length;
        } else {
            throw new Error(`Invalid length. Please choose from: ${validLengths.join(', ')}`);
        }
    }

    // Pants specific edits
    setRise(rise) {
        const validRises = ['high-rise', 'mid-rise', 'low-rise'];
        if (validRises.includes(rise.toLowerCase())) {
            this.edits.rise = rise;
        } else {
            throw new Error(`Invalid rise. Please choose from: ${validRises.join(', ')}`);
        }
    }

    setCut(cut) {
        const validCuts = ['skinny', 'straight', 'bootcut', 'relaxed', 'tapered'];
        if (validCuts.includes(cut.toLowerCase())) {
            this.edits.cut = cut;
        } else {
            throw new Error(`Invalid cut. Please choose from: ${validCuts.join(', ')}`);
        }
    }

    setSeams(seams) {
        const validSeams = ['flat-felled', 'overlock', 'chain stitch'];
        if (validSeams.includes(seams.toLowerCase())) {
            this.edits.seams = seams;
        } else {
            throw new Error(`Invalid seams. Please choose from: ${validSeams.join(', ')}`);
        }
    }

    setWash(wash) {
        const validWashes = ['light', 'medium', 'dark'];
        if (validWashes.includes(wash.toLowerCase())) {
            this.edits.wash = wash;
        } else {
            throw new Error(`Invalid wash. Please choose from: ${validWashes.join(', ')}`);
        }
    }

    setDistressing(distressing) {
        const validDistressing = ['none', 'light', 'moderate', 'heavy'];
        if (validDistressing.includes(distressing.toLowerCase())) {
            this.edits.distressing = distressing;
        } else {
            throw new Error(`Invalid distressing. Please choose from: ${validDistressing.join(', ')}`);
        }
    }

    applyEdits() {
        let editDescription = "";
        
        // Common edits
        if (this.edits.color) {
            editDescription += `\nEDIT: USE COLOR ${this.edits.color}`;
        }
        if (this.edits.fabric) {
            editDescription += `\nEDIT: CHANGE FABRIC TO ${this.edits.fabric.toUpperCase()}`;
        }

        // T-shirt specific edits
        if (this.garmentType === 'tshirt') {
            if (this.edits.sleeveLength) {
                editDescription += `\nEDIT: CHANGE SLEEVE LENGTH TO ${this.edits.sleeveLength} cm`;
            }
            if (this.edits.fit) {
                editDescription += `\nEDIT: CHANGE FIT TO ${this.edits.fit.toUpperCase()}`;
            }
            if (this.edits.neckline) {
                editDescription += `\nEDIT: CHANGE NECKLINE TO ${this.edits.neckline.toUpperCase()}`;
            }
            if (this.edits.length) {
                editDescription += `\nEDIT: CHANGE LENGTH TO ${this.edits.length.toUpperCase()}`;
            }
        }

        // Pants specific edits
        if (this.garmentType === 'pants') {
            if (this.edits.rise) {
                editDescription += `\nEDIT: CHANGE RISE TO ${this.edits.rise.toUpperCase()}`;
            }
            if (this.edits.cut) {
                editDescription += `\nEDIT: CHANGE CUT TO ${this.edits.cut.toUpperCase()}`;
            }
            if (this.edits.seams) {
                editDescription += `\nEDIT: CHANGE SEAMS TO ${this.edits.seams.toUpperCase()}`;
            }
            if (this.edits.wash) {
                editDescription += `\nEDIT: CHANGE WASH TO ${this.edits.wash.toUpperCase()}`;
            }
            if (this.edits.distressing) {
                editDescription += `\nEDIT: CHANGE DISTRESSING TO ${this.edits.distressing.toUpperCase()}`;
            }
        }

        if (editDescription) {
            this.description += editDescription;
        }
        return this.description;
    }

    getDescription() {
        return this.description;
    }

    toJSON() {
        return {
            description: this.description,
            edits: this.edits,
            garmentType: this.garmentType
        };
    }

    static fromJSON(json) {
        const instance = new EditableDescriptionGenerator();
        instance.description = json.description || "";
        instance.garmentType = json.garmentType || null;
        instance.edits = {
            // Common edits
            color: json.edits?.color || null,
            fabric: json.edits?.fabric || null,

            // T-shirt specific edits
            sleeveLength: json.edits?.sleeveLength || null,
            fit: json.edits?.fit || null,
            neckline: json.edits?.neckline || null,
            length: json.edits?.length || null,
            hemline: json.edits?.hemline || null,

            // Pants specific edits
            rise: json.edits?.rise || null,
            cut: json.edits?.cut || null,
            seams: json.edits?.seams || null,
            wash: json.edits?.wash || null,
            distressing: json.edits?.distressing || null
        };
        return instance;
    }
}