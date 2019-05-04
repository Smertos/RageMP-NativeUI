import { Rectangle } from 'modules/rectangle';
import { Color, Point, Screen, Size } from 'utils';

export class Container extends Rectangle {
	public items: any[];

	constructor(position: Point, size: Size, color: Color) {
		super(position, size, color);
		this.items = [];
	}

	addItem(item: any) {
		this.items.push(item);
	}

	draw(offset?: Point) {
		if (!this.enabled) return;

		offset = offset || new Point();

		const screenw = Screen.width;
		const screenh = Screen.height;
		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		const w = this.size.width / width;
		const h = this.size.height / height;
		const x = (this.pos.x + offset.x) / width + w * 0.5;
		const y = (this.pos.y + offset.y) / height + h * 0.5;

		mp.game.graphics.drawRect(
			x, y, w, h,
			this.color.R, this.color.G, this.color.B, this.color.A
		);

		for (let item of this.items) {
			item.Draw(new Size(this.pos.x + offset.x, this.pos.y + offset.y));
		}
	}
}
