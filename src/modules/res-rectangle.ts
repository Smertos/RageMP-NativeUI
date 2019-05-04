import { Rectangle } from 'modules/rectangle';
import { Point, Screen, Size, Color } from 'utils';

export class ResRectangle extends Rectangle {
	constructor(pos, size, color) {
		super(pos, size, color);
	}

	draw(): void;
	draw(offset): void;
	draw(pos, size, color): void;

	draw(pos?: Point, size?: Size, color?: Color) {
		if (!pos) pos = new Point();
		if (pos && !size && !color) {
			pos = new Point(this.pos.x + pos.x, this.pos.y + pos.y);
			size = this.size;
			color = this.color;
		}

		const screenw = Screen.width;
		const screenh = Screen.height;
		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		const w = size.width / width;
		const h = size.height / height;
		const x = pos.x / width + w * 0.5;
		const y = pos.y / height + h * 0.5;

		mp.game.graphics.drawRect(x, y, w, h, color.R, color.G, color.B, color.A);
	}
}
