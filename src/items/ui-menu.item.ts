import { BadgeStyle } from '../enums/badge-style.enum';
import { Font } from '../enums/font.enum';
import { Menu } from '../index';
import { ResRectangle } from '../modules/res-rectangle';
import { Alignment, ResText } from '../modules/res-text';
import { Sprite } from '../modules/sprite';
import { Color } from '../utils/color';
import { Point } from '../utils/point';
import { Size } from '../utils/size';
import { uuid } from '../utils/uuid';

export class UIMenuItem {
	public readonly id: string = uuid();

	public static readonly defaultBackColor: Color = Color.Empty;
	public static readonly defaultHighlightedBackColor: Color = Color.White;
	public static readonly defaultForeColor: Color = Color.WhiteSmoke;
	public static readonly defaultHighlightedForeColor: Color = Color.Black;

	private _event: { event: string; args: any[] };

	protected _rectangle: ResRectangle;
	protected _text: ResText;
	protected _selectedSprite: Sprite;

	protected _badgeLeft: Sprite;
	protected _badgeRight: Sprite;

	protected _labelText: ResText;

	backColor: Color = UIMenuItem.defaultBackColor;
	highlightedBackColor: Color = UIMenuItem.defaultHighlightedBackColor;

	foreColor: Color = UIMenuItem.defaultForeColor;
	highlightedForeColor: Color = UIMenuItem.defaultHighlightedForeColor;

	enabled: boolean;
	selected: boolean;
	hovered: boolean;
	description: string;

	offset: Point;
	parent: Menu;

	get text() {
		return this._text.caption;
	}
	set text(value: string) {
		this._text.caption = value;
	}

	rightLabel: string = '';
	leftBadge: BadgeStyle = BadgeStyle.None;
	rightBadge: BadgeStyle = BadgeStyle.None;

	constructor(text: string, description: string = '') {
		this.enabled = true;

		this._rectangle = new ResRectangle(
			new Point(0, 0),
			new Size(431, 38),
			new Color(150, 0, 0, 0)
		);

		this._text = new ResText(
			text,
			new Point(8, 0),
			0.33,
			Color.WhiteSmoke,
			Font.ChaletLondon,
			Alignment.Left
		);

		this.description = description;

		this._selectedSprite = new Sprite(
			'commonmenu',
			'gradient_nav',
			new Point(0, 0),
			new Size(431, 38)
		);

		this._badgeLeft = new Sprite(
			'commonmenu',
			'',
			new Point(0, 0),
			new Size(40, 40)
		);

		this._badgeRight = new Sprite(
			'commonmenu',
			'',
			new Point(0, 0),
			new Size(40, 40)
		);

		this._labelText = new ResText(
			'',
			new Point(0, 0),
			0.35,
			Color.White,
			0,
			Alignment.Right
		);
	}

	setVerticalPosition(y: number): void {
		this._rectangle.pos = new Point(this.offset.x, y + 144 + this.offset.y);
		this._selectedSprite.pos = new Point(0 + this.offset.x, y + 144 + this.offset.y);
		this._text.pos = new Point(8 + this.offset.x, y + 147 + this.offset.y);
		this._badgeLeft.pos = new Point(0 + this.offset.x, y + 142 + this.offset.y);
		this._badgeRight.pos = new Point(385 + this.offset.x, y + 142 + this.offset.y);
		this._labelText.pos = new Point(420 + this.offset.x, y + 148 + this.offset.y);
	}

	addEvent(event: string, ...args: any[]): void {
		this._event = { event: event, args: args };
	}

	fireEvent(): void {
		if (this._event) {
			mp.events.call(this._event.event, this, ...this._event.args);
		}
	}

	draw(): void {
		this._rectangle.size = new Size(431 + this.parent.widthOffset, 38);
		this._selectedSprite.size = new Size(431 + this.parent.widthOffset, 38);

		if (this.hovered && !this.selected) {
			this._rectangle.color = new Color(255, 255, 255, 20);
			this._rectangle.draw();
		}

		this._selectedSprite.color = this.selected ? this.highlightedBackColor : this.backColor;
		this._selectedSprite.draw();

		this._text.color = this.enabled
			? (this.selected ? this.highlightedForeColor : this.foreColor)
			: new Color(163, 159, 148);

		if (this.leftBadge != BadgeStyle.None) {
			this._text.pos = new Point(35 + this.offset.x, this._text.pos.y);

			this._badgeLeft.textureDict = this.badgeToSpriteLib(this.leftBadge);
			this._badgeLeft.textureName = this.badgeToSpriteName(this.leftBadge, this.selected);

			if (this.isBagdeWhiteSprite(this.leftBadge)) {
				if (!this.enabled) {
					this._badgeLeft.color = new Color(163, 159, 148);
				} else {
					this._badgeLeft.color = this.selected ? this.highlightedForeColor : this.foreColor;
				}
			} else {
				this._badgeLeft.color = Color.White
			}

			this._badgeLeft.draw();
		} else {
			this._text.pos = new Point(8 + this.offset.x, this._text.pos.y);
		}

		if (this.rightBadge != BadgeStyle.None) {
			this._badgeRight.pos = new Point(
				385 + this.offset.x + this.parent.widthOffset,
				this._badgeRight.pos.y
			);

			this._badgeRight.textureDict = this.badgeToSpriteLib(this.rightBadge);
			this._badgeRight.textureName = this.badgeToSpriteName(
				this.rightBadge,
				this.selected
			);

			if (this.isBagdeWhiteSprite(this.rightBadge)) {
				if (!this.enabled) {
					this._badgeRight.color = new Color(163, 159, 148);
				} else {
					this._badgeRight.color = this.selected ? this.highlightedForeColor : this.foreColor;
				}
			} else {
				this._badgeRight.color = Color.White
			}

			this._badgeRight.draw();
		}

		if (this.rightLabel && this.rightLabel !== '') {
			this._labelText.pos = new Point(
				420 + this.offset.x + this.parent.widthOffset,
				this._labelText.pos.y
			);

			this._labelText.caption = this.rightLabel;

			this._labelText.color = this._text.color = this.enabled ? (this.selected ? this.highlightedForeColor : this.foreColor) : new Color(163, 159, 148); 
			this._labelText.draw();
		}

		this._text.draw();
	}

	setLeftBadge(badge: BadgeStyle) {
		this.leftBadge = badge;
	}

	setRightBadge(badge: BadgeStyle) {
		this.rightBadge = badge;
	}

	setRightLabel(text: string) {
		this.rightLabel = text;
	}

	badgeToSpriteLib(badge: BadgeStyle): string {
		return 'commonmenu';
	}

	badgeToSpriteName(badge: BadgeStyle, selected: boolean): string {
		switch (badge) {
			case BadgeStyle.None:
				return '';
			case BadgeStyle.BronzeMedal:
				return 'mp_medal_bronze';
			case BadgeStyle.GoldMedal:
				return 'mp_medal_gold';
			case BadgeStyle.SilverMedal:
				return 'medal_silver';
			case BadgeStyle.Alert:
				return 'mp_alerttriangle';
			case BadgeStyle.Crown:
				return 'mp_hostcrown';
			case BadgeStyle.Ammo:
				return selected ? 'shop_ammo_icon_b' : 'shop_ammo_icon_a';
			case BadgeStyle.Armour:
				return selected ? 'shop_armour_icon_b' : 'shop_armour_icon_a';
			case BadgeStyle.Barber:
				return selected ? 'shop_barber_icon_b' : 'shop_barber_icon_a';
			case BadgeStyle.Clothes:
				return selected ? 'shop_clothing_icon_b' : 'shop_clothing_icon_a';
			case BadgeStyle.Franklin:
				return selected ? 'shop_franklin_icon_b' : 'shop_franklin_icon_a';
			case BadgeStyle.Bike:
				return selected ? 'shop_garage_bike_icon_b' : 'shop_garage_bike_icon_a';
			case BadgeStyle.Car:
				return selected ? 'shop_garage_icon_b' : 'shop_garage_icon_a';
			case BadgeStyle.Gun:
				return selected ? 'shop_gunclub_icon_b' : 'shop_gunclub_icon_a';
			case BadgeStyle.Heart:
				return selected ? 'shop_health_icon_b' : 'shop_health_icon_a';
			case BadgeStyle.Lock:
				return 'shop_lock';
			case BadgeStyle.Makeup:
				return selected ? 'shop_makeup_icon_b' : 'shop_makeup_icon_a';
			case BadgeStyle.Mask:
				return selected ? 'shop_mask_icon_b' : 'shop_mask_icon_a';
			case BadgeStyle.Michael:
				return selected ? 'shop_michael_icon_b' : 'shop_michael_icon_a';
			case BadgeStyle.Star:
				return 'shop_new_star';
			case BadgeStyle.Tatoo:
				return selected ? 'shop_tattoos_icon_b' : 'shop_tattoos_icon_';
			case BadgeStyle.Tick:
				return 'shop_tick_icon';
			case BadgeStyle.Trevor:
				return selected ? 'shop_trevor_icon_b' : 'shop_trevor_icon_a';
			default:
				return '';
		}
	}

	isBagdeWhiteSprite(badge: BadgeStyle): boolean {
		switch (badge) {
			case BadgeStyle.Lock:
			case BadgeStyle.Tick:
			case BadgeStyle.Crown:
				return true;
			default:
				return false;
		}
	}

	badgeToColor(badge: BadgeStyle, selected: boolean): Color {
		switch (badge) {
			case BadgeStyle.Lock:
			case BadgeStyle.Tick:
			case BadgeStyle.Crown:
				return selected
					? new Color(255, 0, 0, 0)
					: new Color(255, 255, 255, 255);
			default:
				return new Color(255, 255, 255, 255);
		}
	}

}
