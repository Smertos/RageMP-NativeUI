export class Point {
	static parse(point: number[]): Point;
	static parse(point: { x: number; y: number }): Point;
	static parse(point: string): Point;
	static parse(arg: any): Point {
		if (Array.isArray(arg)) {
			const [x, y] = arg;
			return new Point(x, y);
		} else if (typeof arg === 'object' && arg.x && arg.y) {
			return new Point(arg.x, arg.y);
		} else if (typeof arg === 'string' && arg.indexOf(',') !== -1) {
			const [x, y] = arg.split(',').map(parseFloat);
			return new Point(x, y);
		}

		return new Point(0, 0);
	}

	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}
