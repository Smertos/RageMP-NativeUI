import { BadgeStyle, Font } from 'enums';
import { UIMenuItem } from 'items/ui-menu.item';
import { StringMeasurer } from 'modules/string-measurer';
import { ItemsCollection } from 'modules/items-collection';
import { ListItem } from 'modules/list-item';
import { Alignment, ResText } from 'modules/res-text';
import { Sprite } from 'modules/sprite';
import { Color, LiteEvent, Point, Size } from 'utils';

export class UIMenuListItem extends UIMenuItem {
	private readonly onListChanged = new LiteEvent();

	private currOffset: number = 0;
	private _collection: Array<ListItem> = [];

	protected _itemText: ResText;
	protected _arrowLeft: Sprite;
	protected _arrowRight: Sprite;

	get collection(): Array<ListItem> {
		return this._collection;
	}
	set collection(value) {
		if (!value) {
			throw new Error('The collection can\'t be null');
		}

		this._collection = value;
	}

	set selectedItem(value: ListItem) {
		const idx = this.collection.findIndex(li => li.id === value.id);
		this.index = Math.max(idx, 0);
	}

	get selectedItem() {
		return this.collection.length ? this.collection[this.index] : null;
	}

	get selectedValue() {
		if (!this.selectedItem) return null;

		return this.selectedItem.data == null ? this.selectedItem.displayText : this.selectedItem.data;
	}

	scrollingEnabled: boolean = true;
	holdTimeBeforeScroll: number = 200;

	public get listChanged() {
		return this.onListChanged.expose();
	}

	protected _index: number = 0;

	get index(): number {
		if (this.collection == null) return -1;
		if (this.collection != null && !this.collection.length) return -1;

		return this._index % this.collection.length;
	}
	set index(value: number) {
		if (this.collection == null) return;
		if (this.collection != null && this.collection.length == 0) return;

		this._index = 100000 - (100000 % this.collection.length) + value;

		const caption = this.collection.length >= this.index ? this.collection[this.index].displayText : ' ';
		this.currOffset = StringMeasurer.measureString(caption);
	}

	constructor(
		text: string,
		description: string = '',
		collection: ItemsCollection = new ItemsCollection([]),
		startIndex: number = 0
	) {
		super(text, description);

		this.collection = collection.getListItems();
		this.index = startIndex;

		this._arrowLeft = new Sprite('commonmenu', 'arrowleft', new Point(110, 105), new Size(30, 30));
		this._arrowRight = new Sprite('commonmenu', 'arrowright', new Point(280, 105), new Size(30, 30));

		this._itemText = new ResText('', new Point(290, 104), 0.35, Color.White, Font.ChaletLondon, Alignment.Right);
	}

	setCollection(collection: ItemsCollection) {
		this.collection = collection.getListItems();
	}

	setCollectionItem(
		index: number,
		item: ListItem | string,
		resetSelection: boolean = true
	) {
		if (index > this.collection.length) {
			throw new Error('Index out of bounds');
		}

		if (typeof item === 'string') {
			item = new ListItem(item);
		}

		this.collection.splice(index, 1, item);

		if (resetSelection) {
			this.index = 0;
		}
	}

	setVerticalPosition(y: number) {
		this._arrowLeft.pos = new Point(300 + this.offset.x + this.parent.widthOffset, 147 + y + this.offset.y);
		this._arrowRight.pos = new Point(400 + this.offset.x + this.parent.widthOffset, 147 + y + this.offset.y);
		this._itemText.pos = new Point(300 + this.offset.x + this.parent.widthOffset, y + 147 + this.offset.y);

		super.setVerticalPosition(y);
	}

	setRightLabel(text: string) {
		return this;
	}

	setRightBadge(badge: BadgeStyle) {
		return this;
	}

	draw() {
		super.draw();

		const caption = this.collection.length >= this.index ? this.collection[this.index].displayText : ' ';
		const offset = this.currOffset;

		this._itemText.caption = caption;
		this._itemText.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new Color(163, 159, 148);
		this._arrowLeft.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new Color(163, 159, 148);
		this._arrowRight.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new Color(163, 159, 148);

		this._arrowLeft.pos = new Point(375 - offset + this.offset.x + this.parent.widthOffset, this._arrowLeft.pos.y);

		if (this.selected) {
			this._arrowLeft.draw();
			this._arrowRight.draw();
			this._itemText.pos = new Point(405 + this.offset.x + this.parent.widthOffset, this._itemText.pos.y);
		} else {
			this._itemText.pos = new Point(420 + this.offset.x + this.parent.widthOffset, this._itemText.pos.y);
		}

		this._itemText.draw();
	}

}
