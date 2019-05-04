import { UIMenuItem } from 'items/ui-menu.item';
import { Sprite } from 'modules/sprite';
import { Color, ILiteEvent, LiteEvent, Point, Size } from 'utils';

export class UIMenuCheckboxItem extends UIMenuItem {
	private readonly _checkedSprite: Sprite;
	private readonly onCheckedChanged: LiteEvent = new LiteEvent();

	get checkedChanged(): ILiteEvent {
		return this.onCheckedChanged.expose();
	}

	checked: boolean = false;

	constructor(text: string, check: boolean = false, description: string = '') {
		super(text, description);

		this._checkedSprite = new Sprite('commonmenu', 'shop_box_blank', new Point(410, 95), new Size(50, 50));
		this.checked = check;
	}

	setVerticalPosition(y: number): void {
		super.setVerticalPosition(y);

		this._checkedSprite.pos = new Point(380 + this.offset.x + this.parent.widthOffset, y + 138 + this.offset.y);
	}

	draw(): void {
		super.draw();

		this._checkedSprite.pos = this._checkedSprite.pos = new Point(380 + this.offset.x + this.parent.widthOffset, this._checkedSprite.pos.y);

		const isDefaultHightlitedForeColor = this.highlightedForeColor == UIMenuItem.defaultHighlightedForeColor;

		if (this.selected && isDefaultHightlitedForeColor) {
			this._checkedSprite.textureName = this.checked ? 'shop_box_tickb' : 'shop_box_blankb';
		} else {
			this._checkedSprite.textureName = this.checked ? 'shop_box_tick' : 'shop_box_blank';
		}

		this._checkedSprite.color = this.enabled
			? this.selected && !isDefaultHightlitedForeColor
				? this.highlightedForeColor
				: this.foreColor
			: new Color(163, 159, 148);

		this._checkedSprite.draw();
	}

}
