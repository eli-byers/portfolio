// Map.js: Handles all functionalities related to the game map.

import { Drawable, Point, DEFAULT_CELL_SIZE } from './Utils';
import { BoardPart, BOARD_BOX } from './BoardParts';

export class Wall implements Drawable {
    static size: number = DEFAULT_CELL_SIZE;
    
    imagePath: String;
    code: String;

    constructor(wallCode: String) {
        this.imagePath = `../images/${wallCode}.png`;
        this.code = wallCode;
    }
    
    draw(context: CanvasRenderingContext2D, at: Point, scale: number): void {
        const img = new Image();
        img.onload = () => {
            context.drawImage(img, at.x, at.y, Wall.size * scale, Wall.size * scale);
        };
    }
}

enum Color { Yellow = 1, Red, Blue, Green, Wild }

export class Target implements Drawable {
    static size: number = DEFAULT_CELL_SIZE * 0.4;

    edge: number;
    imagePath: String;
    color: Color;
    
    constructor(targetCode: number) {
        this.color = Math.floor(targetCode / 10);
        this.imagePath = `../images/${targetCode}.png`
    }

    draw(context: CanvasRenderingContext2D, at: Point, scale: number): void {
        const img = new Image();
        img.onload = () => {
            context.drawImage(img, at.x, at.y, Target.size * scale, Target.size * scale);
        };
        throw new Error('Method not implemented.');
    }
}

export class Cell implements Drawable {
    static size = DEFAULT_CELL_SIZE;

    scale: number;
    size: number;
    origin: Point;
    imagePath: String;

    hasTopWall: Boolean = false;
    hasRightWall: Boolean = false;
    hasBottomWall: Boolean = false;
    hasLeftWall: Boolean = false;
    
    wall?: Wall | null = null;
    target?: Target | null = null;

    constructor(origin: Point, scale: number, cellCode?: number[][]) {
        this.origin = origin;
        this.size = Cell.size * scale;
        this.imagePath = `../images/cell.png`
        if (cellCode) this.parseCellCode(cellCode);
    }
    
    parseCellCode(cellCode: number[][]) {

        // calculate cell code
        this.hasTopWall = (cellCode[0][0] + cellCode[0][1]) == 0;
        this.hasRightWall = (cellCode[1][0] + cellCode[1][1]) == 0;
        this.hasBottomWall = (cellCode[0][0] + cellCode[1][0]) == 0;
        this.hasLeftWall = (cellCode[0][1] + cellCode[1][1]) == 0;

        // TODO combind walls into corners
        this.wall = null;

        // Create target if exists in the cellCode
        const flattened = cellCode.reduce((acc, val) => acc.concat(val), []);
        const targetCode = Math.max(...flattened);
        if (targetCode > 1) this.target = new Target(targetCode);
    }

    draw(context: CanvasRenderingContext2D): void {
        const img = new Image();
        img.onload = () => {
            context.drawImage(img, this.origin.x, this.origin.y, this.size, this.size);
        };
        if (this.wall || this.target) {
            var center: Point = this.origin.shiftedBy(this.size/2, this.size/2);
            this.wall?.draw(context, center, this.scale);
            this.target?.draw(context, center, this.scale);
        }
    }
}

export class GameBoard implements Drawable {
    origin: Point;
    cells: Cell[][]

    constructor(origin: Point, scale: number) {
        this.origin = origin;
        const board = GameBoard.makeRandomBoard();
        this.cells = this.initializeCells(board, scale);
    }
    
    static makeRandomBoard(): BoardPart {
        var boardParts: BoardPart[] = []
        for (var boardPard of BOARD_BOX) {
            const randomSideIdx = Math.round(Math.random());
            boardParts.push(boardPard[randomSideIdx]);
        }
        GameBoard.shuffleInPlace(boardParts);
        
        var topLeft = boardParts[0];
        var topRight = boardParts[1].rotateClockwise();
        var bottomLeft = boardParts[2].rotateClockwise().rotateClockwise();
        var bottomRight = boardParts[3].rotateCounterclockwise();

        var top = BoardPart.joinHorizontally(topLeft, topRight);
        var bottom = BoardPart.joinHorizontally(bottomLeft, bottomRight);

        return BoardPart.joinVertically(top, bottom);
    }

    static shuffleInPlace<T>(array: T[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    } 

    initializeCells(board: BoardPart, scale: number) : Cell[][] {
        var cells: Cell[][] = []
        
        // check every other row as board parts represent a cell with a 2x2 sub matrix
        for (let rowIdx = 0; rowIdx < board.matrix.length; rowIdx+=2) {
            var topRow = board.matrix[rowIdx];
            var bottomRow = board.matrix[rowIdx + 1];
            var cellRow: Cell[] = []
            for (let colIdx = 0; colIdx < topRow.length; colIdx+=2) {
                
                // calculate scaled cell origin
                var cellX = this.origin.x + (DEFAULT_CELL_SIZE * scale * (colIdx + 1));
                var cellY = this.origin.y + (DEFAULT_CELL_SIZE * scale * (rowIdx + 1));
                var cellOrigin = new Point(cellX, cellY);

                var cellCode: number[][] = [
                    topRow.slice(colIdx, colIdx + 2),
                    bottomRow.slice(colIdx, colIdx + 2)
                ]
                
                cellRow.push(new Cell(cellOrigin, scale, cellCode))
            }
            cells.push(cellRow);
        }

        return cells;
    }

    cellAt(row: number, col: number) {
        if (row < 0 || row > this.cells.length || col < 0 || col > this.cells.length) {
            console.log(`row:${row} or col:${col} out of bounds: 0-${this.cells.length-1}`);
            throw new Error("Index out of bounds");
        }
        return this.cells[row][col]
    }

    draw(context: CanvasRenderingContext2D): void {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.draw(context);
            });
        });
    }
}
