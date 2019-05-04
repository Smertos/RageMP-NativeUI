import { BadgeStyle } from 'enums';
import { UIMenuItem } from 'items/ui-menu.item';
import { ResRectangle } from 'modules/res-rectangle';
import { Sprite } from 'modules/sprite';
import { Color, Point, Size } from 'utils';

export class UIMenuSliderItem extends UIMenuItem {
	private _arrowLeft: Sprite;
	private _arrowRight: Sprite;
	private _rectangleBackground: ResRectangle;
	private _rectangleSlider: ResRectangle;
	private _rectangleDivider: ResRectangle;
	private _items: any[];
	private _index: number;

	get index() {
		return this._index % this._items.length;
	}
	set index(value) {
		this._index = 100000000 - (100000000 % this._items.length) + value;
	}

	constructor(
		text: string,
		items: any[],
		index: number,
		description: string = '',
		divider: boolean = false
	) {
		super(text, description);

		this._items = items;
		this._arrowLeft = new Sprite('commonmenutu', 'arrowleft', new Point(0, 105), new Size(15, 15));
		this._arrowRight = new Sprite('commonmenutu', 'arrowright', new Point(0, 105), new Size(15, 15));

		this._rectangleBackground = new ResRectangle(new Point(0, 0), new Size(150, 9), new Color(4, 32, 57, 255));
		this._rectangleSlider = new ResRectangle(new Point(0, 0), new Size(75, 9), new Color(57, 116, 200, 255));
		this._rectangleDivider = new ResRectangle(new Point(0, 0), new Size(2.5, 20), divider ? Color.WhiteSmoke : Color.Transparent);
		this.index = index;
	}

	setVerticalPosition(y: number): void {
		this._rectangleBackground.pos = new Point(250 + this.offset.x + this.parent.widthOffset, y + 158.5 + this.offset.y);
		this._rectangleSlider.pos = new Point(250 + this.offset.x + this.parent.widthOffset, y + 158.5 + this.offset.y);
		this._rectangleDivider.pos = new Point(323.5 + this.offset.x + this.parent.widthOffset, y + 153 + this.offset.y);
		this._arrowLeft.pos = new Point(235 + this.offset.x + this.parent.widthOffset, 155.5 + y + this.offset.y);
		this._arrowRight.pos = new Point(400 + this.offset.x + this.parent.widthOffset, 155.5 + y + this.offset.y);

		super.setVerticalPosition(y);
	}

	indexToItem(index: number): any {
		return this._items[index];
	}

	draw() {
		super.draw();

		this._arrowLeft.color = this.enabled
			? this.selected
				? Color.Black
				: Color.WhiteSmoke
			: new Color(163, 159, 148);

		this._arrowRight.color = this.enabled
			? this.selected
				? Color.Black
				: Color.WhiteSmoke
			: new Color(163, 159, 148);

		let offset = ((this._rectangleBackground.size.width - this._rectangleSlider.size.width) / (this._items.length - 1)) * this.index;

		this._rectangleSlider.pos = new Point(250 + this.offset.x + offset + +this.parent.widthOffset, this._rectangleSlider.pos.y);

		if (this.selected) {
			this._arrowLeft.draw();
			this._arrowRight.draw();
		}

		this._rectangleBackground.draw();
		this._rectangleSlider.draw();
		this._rectangleDivider.draw();
	}

	setRightBadge(badge: BadgeStyle) {}

	setRightLabel(text: string) {}
}
