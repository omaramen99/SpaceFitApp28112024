export class ElementStyle {
    constructor(fillColor, fillAlpha, lineColor, lineWidth, lineStyle) {
        this.FillColor = fillColor;
        this.FillAlpha = fillAlpha;
        this.LineColor = lineColor;
        this.LineWidth = lineWidth;
        this.LineStyle = lineStyle;
    }
    Clone()
    {
        return new ElementStyle(this.FillColor,this.FillAlpha,this.LineColor,this.LineWidth,this.LineStyle)
    }
}

