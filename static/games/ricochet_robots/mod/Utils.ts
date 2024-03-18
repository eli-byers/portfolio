// Utils.js: Handles all shared functionalities.

export const DEFAULT_CELL_SIZE = 100;

export interface Drawable {
    draw(context: CanvasRenderingContext2D, at: Point, scale: number): void;
}

export class Point {
    constructor(
        public x: number,
        public y: number
    ) {}

    public shiftedBy(x: number, y: number) : Point {
        return new Point(this.x + x, this.y + y);
    }
}