import { Element } from './Element.js'; 
export class LineBasedElement extends Element {
    constructor(startPoint, endPoint) {
        super();
        this.StartPoint = startPoint;
        this.EndPoint = endPoint;
    }

    get Length() {
        return this.StartPoint.distanceTo(this.EndPoint);
    }
}
