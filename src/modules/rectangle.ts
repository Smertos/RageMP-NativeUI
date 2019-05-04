import { Element } from 'modules/element';
import { Color, Point, Size } from 'utils';

export class Rectangle extends Element {
	pos: Point;
	size: Size;
	color: Color;

	constructor(position: Point, size: Size, color: Color) {
		super();

		this.enabled = true;
		this.pos = position;
		this.size = size;
		this.color = color;
	}

	draw(position: Point, size: Size, color: Color) {
		if (!position) position = new Point(0, 0);
		if (!size && !color) {
			position = new Point(this.pos.x + position.x, this.pos.y + position.x);
			size = this.size;
			color = this.color;
		}

		const w = size.width / 1280.0;
		const h = size.height / 720.0;
		const x = position.x / 1280.0 + w * 0.5;
		const y = position.y / 720.0 + h * 0.5;

		mp.game.graphics.drawRect(x, y, w, h, color.R, color.G, color.B, color.A);
	}
}
