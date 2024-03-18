import { Drawable, Point, DEFAULT_CELL_SIZE } from './Utils';
import { Cell } from './Map';

export class Robot implements Drawable {
    static size: number = DEFAULT_CELL_SIZE * 0.8;
    
    public isMoving = false;
    constructor(
        public colorCode: String,
    ) {}

    draw(context: CanvasRenderingContext2D, at: Point, scale: number): void {
        const img = new Image();
        img.onload = () => {
            context.drawImage(img, at.x, at.y, Robot.size * scale, Robot.size * scale);
        };
        throw new Error('Method not implemented.');
    }
}