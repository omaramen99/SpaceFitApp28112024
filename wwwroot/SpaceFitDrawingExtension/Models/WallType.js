import { ElementStyle } from "./ElementStyle.js";
import { Element } from './Element.js'; 

export class WallType extends Element {
    constructor(name, wallThickness, wallStyle) {
        super()
        this.Name = name;
        this.WallThickness = wallThickness;
        this.WallStyle = wallStyle;
    }
}