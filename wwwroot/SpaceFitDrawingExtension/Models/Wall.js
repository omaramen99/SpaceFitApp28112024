import { LineBasedElement } from './LineBasedElement.js'; 
export class Wall extends LineBasedElement {
    constructor(startPoint, endPoint, wallType) {
        super(startPoint, endPoint);
        this.WallType = wallType;
    }

    // Additional methods specific to the Wall class can be added here
    get Polygon() {
        return CreateRectangle(this.StartPoint, this.EndPoint, this.WallType.WallThickness);
    }

    static Create(startPoint, endPoint, wallType) {
        return new Wall(startPoint, endPoint, wallType);
    }
}
function CreateRectangle(sp, ep, thickness) {

const p1 = { x: sp.x, y: sp.y };
const p2 = { x: ep.x, y: ep.y };

// Calculate the perpendicular points
const dx = p2.x - p1.x;
const dy = p2.y - p1.y;
//const length = Math.sqrt(dx * dx + dy * dy);
const angle = Math.atan2(dy, dx);

const p3 = {
  x: p1.x + thickness * Math.cos(angle - Math.PI / 2),
  y: p1.y + thickness * Math.sin(angle - Math.PI / 2)
};

const p4 = {
  x: p2.x + thickness * Math.cos(angle - Math.PI / 2),
  y: p2.y + thickness * Math.sin(angle - Math.PI / 2)
};

const p5 = {
  x: p2.x + thickness * Math.cos(angle + Math.PI / 2),
  y: p2.y + thickness * Math.sin(angle + Math.PI / 2)
};

const p6 = {
  x: p1.x + thickness * Math.cos(angle + Math.PI / 2),
  y: p1.y + thickness * Math.sin(angle + Math.PI / 2)
};

return [p3, p4, p5, p6]
}