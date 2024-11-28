export class Element {
    constructor() 
    {
        
        this.ElementId = getRandomInt(999999)
    }



}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }