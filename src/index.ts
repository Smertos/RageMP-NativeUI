import { BadgeStyle, Font } from 'enums';
import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from 'items';
import { Alignment, Container, ItemsCollection, ListItem, ResRectangle, ResText, Sprite, StringMeasurer } from 'modules';
import { Color, Common, LiteEvent, Point, Screen, Size, uuid } from 'utils';

export class Menu {
	private readonly _mainMenu: Container;
	private readonly _logo: Sprite;
	private readonly _upAndDownSprite: Sprite;
	private readonly _title: ResText;
	private readonly _subtitle: ResText;
	private readonly _extraRectangleUp: ResRectangle;
	private readonly _extraRectangleDown: ResRectangle;
	private readonly _descriptionBar: ResRectangle;
	private readonly _descriptionRectangle: Sprite;
	private readonly _descriptionText: ResText;
	private readonly _counterText: ResText;
	private readonly _background: Sprite;

	private title: string;
	private subtitle: string;
	private counterPretext: string = '';
	private counterOverride: string = undefined;
	private spriteLibrary: string;
	private spriteName: string;
	private offset: Point;
	private lastUpDownNavigation = 0;
	private lastLeftRightNavigation = 0;
	private extraOffset: number = 0;
	private safezoneOffset: Point = new Point(0, 0);
	private maxItemsOnScreen: number = 9;
	private mouseEdgeEnabled: boolean = true;
	private _activeItem: number = 1000;
	private _justOpened: boolean = true;
	private _minItem: number;
	private _maxItem: number = this.maxItemsOnScreen;

	readonly indexChange = new LiteEvent();
	readonly listChange = new LiteEvent();
	readonly sliderChange = new LiteEvent();
	readonly sliderSelect = new LiteEvent();
	readonly checkboxChange = new LiteEvent();
	readonly itemSelect = new LiteEvent();
	readonly menuOpen = new LiteEvent();
	readonly menuClose = new LiteEvent();
	readonly menuChange = new LiteEvent();
	readonly id: string = uuid();

	AUDIO_LIBRARY: string = 'HUD_FRONTEND_DEFAULT_SOUNDSET';
	AUDIO_UPDOWN: string = 'NAV_UP_DOWN';
	AUDIO_LEFTRIGHT: string = 'NAV_LEFT_RIGHT';
	AUDIO_SELECT: string = 'SELECT';
	AUDIO_BACK: string = 'BACK';
	AUDIO_ERROR: string = 'ERROR';

	parentMenu: Menu;
	parentItem: UIMenuItem;
	children: Map<string, Menu>; // (uuid, Menu)
	widthOffset: number = 0;
	visible: boolean = true;
	mouseControlsEnabled: boolean = false;
	menuItems: (UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem)[] = [];

	get currentSelection() {
		return this._activeItem % this.menuItems.length;
	}
	set currentSelection(v) {
		this.menuItems[this._activeItem % this.menuItems.length].selected = false;
		this._activeItem = 1000 - (1000 % this.menuItems.length) + v;
		if (this.currentSelection > this._maxItem) {
			this._maxItem = this.currentSelection;
			this._minItem = this.currentSelection - this.maxItemsOnScreen;
		} else if (this.currentSelection < this._minItem) {
			this._maxItem = this.maxItemsOnScreen + this.currentSelection;
			this._minItem = this.currentSelection;
		}
	}


	constructor(title: string, subtitle: string, offset: Point, spriteLibrary: string, spriteName: string) {
		if (!(offset instanceof Point)) offset = Point.parse(offset);

		this.title = title;
		this.subtitle = subtitle;
		this.spriteLibrary = spriteLibrary || 'commonmenu';
		this.spriteName = spriteName || 'interaction_bgd';
		this.offset = new Point(offset.x, offset.y);
		this.children = new Map();

		// Create everything
		this._mainMenu = new Container(
			new Point(0, 0),
			new Size(700, 500),
			new Color(0, 0, 0, 0)
		);

		this._logo = new Sprite(
			this.spriteLibrary,
			this.spriteName,
			new Point(0 + this.offset.x, 0 + this.offset.y),
			new Size(431, 107)
		);
		
		this._title = new ResText(
			this.title,
			new Point(215 + this.offset.x, 20 + this.offset.y),
			1.15,
			new Color(255, 255, 255),
			1,
			Alignment.Centered
		);

		this._mainMenu.addItem(this._title);

		if (this.subtitle !== '') {
			this._mainMenu.addItem(
				new ResRectangle(
					new Point(0 + this.offset.x, 107 + this.offset.y),
					new Size(431, 37),
					new Color(0, 0, 0, 255)
				)
			);

			this._mainMenu.addItem(
				(this._subtitle = new ResText(
					this.subtitle,
					new Point(8 + this.offset.x, 110 + this.offset.y),
					0.35,
					new Color(255, 255, 255),
					0,
					Alignment.Left
				))
			);

			if (this.subtitle.startsWith('~')) {
				this.counterPretext = this.subtitle.substr(0, 3);
			}

			this._counterText = new ResText(
				'',
				new Point(425 + this.offset.x, 110 + this.offset.y),
				0.35,
				new Color(255, 255, 255),
				0,
				Alignment.Right
			);

			this.extraOffset += 37;
		}

		this._upAndDownSprite = new Sprite(
			'commonmenu',
			'shop_arrows_upanddown',
			new Point(
				190 + this.offset.x,
				147 +
					37 * (this.maxItemsOnScreen + 1) +
					this.offset.y -
					37 +
					this.extraOffset
			),
			new Size(50, 50)
		);

		this._extraRectangleUp = new ResRectangle(
			new Point(
				0 + this.offset.x,
				144 +
					38 * (this.maxItemsOnScreen + 1) +
					this.offset.y -
					37 +
					this.extraOffset
			),
			new Size(431, 18),
			new Color(0, 0, 0, 200)
		);

		this._extraRectangleDown = new ResRectangle(
			new Point(
				0 + this.offset.x,
				144 +
					18 +
					38 * (this.maxItemsOnScreen + 1) +
					this.offset.y -
					37 +
					this.extraOffset
			),
			new Size(431, 18),
			new Color(0, 0, 0, 200)
		);

		this._descriptionBar = new ResRectangle(new Point(this.offset.x, 123), new Size(431, 4), Color.Black);
		this._descriptionRectangle = new Sprite('commonmenu', 'gradient_bgd', new Point(this.offset.x, 127), new Size(431, 30));
		this._descriptionText = new ResText( 'Description', new Point(this.offset.x + 5, 125), 0.35, new Color(255, 255, 255, 255), Font.ChaletLondon, Alignment.Left);
		this._background = new Sprite('commonmenu', 'gradient_bgd', new Point(this.offset.x, 144 + this.offset.y - 37 + this.extraOffset), new Size(290, 25));

		mp.events.add('render', this.render.bind(this));
	}

	private recalculateDescriptionPosition() {
		this._descriptionBar.pos = new Point(this.offset.x, 149 - 37 + this.extraOffset + this.offset.y);
		this._descriptionRectangle.pos = new Point(this.offset.x, 149 - 37 + this.extraOffset + this.offset.y);
		this._descriptionText.pos = new Point(this.offset.x + 8, 155 - 37 + this.extraOffset + this.offset.y);

		this._descriptionBar.size = new Size(431 + this.widthOffset, 4);
		this._descriptionRectangle.size = new Size(431 + this.widthOffset, 30);

		let count = this.menuItems.length;
		if (count > this.maxItemsOnScreen + 1) count = this.maxItemsOnScreen + 2;

		this._descriptionBar.pos = new Point(this.offset.x, 38 * count + this._descriptionBar.pos.y);
		this._descriptionRectangle.pos = new Point(this.offset.x, 38 * count + this._descriptionRectangle.pos.y);
		this._descriptionText.pos = new Point(this.offset.x + 8, 38 * count + this._descriptionText.pos.y);
	}

	setMenuWidthOffset(widthOffset: number) {
		this.widthOffset = widthOffset;

		if (this._logo != null) {
			this._logo.size = new Size(431 + this.widthOffset, 107);
		}

		this._mainMenu.items[0].pos = new Point((this.widthOffset + this.offset.x + 431) / 2, 20 + this.offset.y);

		if (this._counterText) {
			this._counterText.pos = new Point(425 + this.offset.x + widthOffset, 110 + this.offset.y);
		}

		if (this._mainMenu.items.length >= 2) {
			const tmp = this._mainMenu.items[1];
			tmp.size = new Size(431 + this.widthOffset, 37);
		}
	}

	addItem(item: UIMenuItem) {
		if (this._justOpened) this._justOpened = false;

		item.offset = this.offset;
		item.parent = this;

		item.setVerticalPosition(this.menuItems.length * 25 - 37 + this.extraOffset);

		this.menuItems.push(item);

		item.description = this.formatDescription(item.description);

		this.refreshIndex();
		this.recalculateDescriptionPosition();
	}

	refreshIndex() {
		if (!this.menuItems.length) {
			this._activeItem = 1000;
			this._maxItem = this.maxItemsOnScreen;
			this._minItem = 0;

			return;
		}

		for (let i = 0; i < this.menuItems.length; i++)
			this.menuItems[i].selected = false;

		this._activeItem = 1000 - (1000 % this.menuItems.length);
		this._maxItem = this.maxItemsOnScreen;
		this._minItem = 0;
	}

	clear() {
		this.menuItems = [];
		this.recalculateDescriptionPosition();
	}

	open() {
		Common.playSound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
		this.visible = true;
		this._justOpened = true;
		this.menuOpen.emit();
	}

	close() {
		Common.playSound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
		this.visible = false;
		this.refreshIndex();
		this.menuClose.emit();
	}

	set subtitleCaption(text: string) {
		this.subtitle = text;
		this._subtitle.caption = text;
	}

	goLeft(): void {
		if (
			!(this.menuItems[this.currentSelection] instanceof UIMenuListItem) &&
			!(this.menuItems[this.currentSelection] instanceof UIMenuSliderItem)
		) {
			return;
		}

		if (this.menuItems[this.currentSelection] instanceof UIMenuListItem) {
			const it = <UIMenuListItem > this.menuItems[this.currentSelection];

			if (!it.collection.length) return;

			it.index--;
			Common.playSound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
			this.listChange.emit(it, it.index);
		} else if (
			this.menuItems[this.currentSelection] instanceof UIMenuSliderItem
		) {
			const it = this.menuItems[this.currentSelection] as UIMenuSliderItem;

			it.index--;
			Common.playSound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
			this.sliderChange.emit(it, it.index, it.indexToItem(it.index));
			// it.sliderChangedTrigger(it.index);
		}
	}

	goRight(): void {
		if (
			!(this.menuItems[this.currentSelection] instanceof UIMenuListItem) &&
			!(this.menuItems[this.currentSelection] instanceof UIMenuSliderItem)
		) {
			return;
		}

		if (this.menuItems[this.currentSelection] instanceof UIMenuListItem) {
			const it = <UIMenuListItem>this.menuItems[this.currentSelection];

			if (!it.collection.length) return;

			it.index++;
			Common.playSound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
			this.listChange.emit(it, it.index);
		} else if (
			this.menuItems[this.currentSelection] instanceof UIMenuSliderItem
		) {
			const it = <UIMenuSliderItem>this.menuItems[this.currentSelection];
			it.index++;
			Common.playSound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
			this.sliderChange.emit(it, it.index, it.indexToItem(it.index));
			// it.SliderChangedTrigger(it.Index);
		}
	}

	selectItem(): void {
		if (!this.menuItems[this.currentSelection].enabled) {
			Common.playSound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
			return;
		}

		const it = this.menuItems[this.currentSelection] as UIMenuCheckboxItem;
		if (this.menuItems[this.currentSelection] instanceof UIMenuCheckboxItem) {
			it.checked = !it.checked;
			Common.playSound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
			this.checkboxChange.emit(it, it.checked);
		} else {
			Common.playSound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);

			this.itemSelect.emit(it, this.currentSelection);

			if (this.children.has(it.id)) {
				const subMenu = this.children.get(it.id);
				this.visible = false;

				subMenu.visible = true;
				subMenu._justOpened = true;
				subMenu.menuOpen.emit();

				this.menuChange.emit(subMenu, true);
			}
		}

		it.fireEvent();
	}

	getMousePosition(relative: boolean = false): [number, number] {
		const screenW = Screen.width;
		const screenH = Screen.height;
		const cursor = mp.gui.cursor.position;

		if (!relative) return cursor;

		const [mouseX, mouseY] = cursor;
		return [mouseX / screenW, mouseY / screenH];
	}

	getScreenResolutionMantainRatio(): Size {
		const screenw = Screen.width;
		const screenh = Screen.height;
		const height = 1080.0;
		const ratio = screenw / screenh;
		var width = height * ratio;

		return new Size(width, height);
	}

	isMouseInBounds(topLeft: Point, boxSize: Size) {
		const res = this.getScreenResolutionMantainRatio();
		const [mouseX, mouseY] = this.getMousePosition();
		return (
			mouseX >= topLeft.x &&
			mouseX <= topLeft.x + boxSize.width &&
			(mouseY > topLeft.y && mouseY < topLeft.y + boxSize.height)
		);
	}

	isMouseInListItemArrows(
		item,
		topLeft,
		safezone // TODO: Ability to scroll left and right
	) {
		mp.game.invoke('0x54ce8ac98e120cab'.toUpperCase(), 'jamyfafi');
		mp.game.ui.addTextComponentSubstringPlayerName(item.Text);

		const screenSize = this.getScreenResolutionMantainRatio();
		const { width: screenW, height: screenH } = screenSize;

		const height = 1080.0;
		const ratio = screenW / screenH;
		var width = height * ratio;
		const labelSize =
			mp.game.invoke('0x85f061da64ed2f67'.toUpperCase(), 0) * width * 0.35;

		const labelSizeX = 5 + labelSize + 10;
		const arrowSizeX = 431 - labelSizeX;
		return this.isMouseInBounds(topLeft, new Size(labelSizeX, 38))
			? 1
			: this.isMouseInBounds(new Point(topLeft.X + labelSizeX, topLeft.Y), new Size(arrowSizeX, 38)) ? 2 : 0;
	}

	processMouse() {
		if (
			!this.visible ||
			this._justOpened ||
			this.menuItems.length == 0 ||
			!this.mouseControlsEnabled
		) {
			/*Common.EnableControl(0, GameControl.LookUpDown);
                Common.EnableControl(0, GameControl.LookLeftRight);
                Common.EnableControl(0, GameControl.Aim);
				Common.EnableControl(0, GameControl.Attack);*/
			this.menuItems.filter(i => i.hovered).forEach(i => (i.hovered = false));
			return;
		}

		if (!mp.gui.cursor.visible) mp.gui.cursor.visible = true;
		let limit = this.menuItems.length - 1;
		let counter = 0;
		if (this.menuItems.length > this.maxItemsOnScreen + 1)
			limit = this._maxItem;

		if (
			this.isMouseInBounds(new Point(0, 0), new Size(30, 1080)) &&
			this.mouseEdgeEnabled
		) {
			mp.game.cam.setGameplayCamRelativeHeading(
				mp.game.cam.getGameplayCamRelativeHeading() + 5.0
			);
			mp.game.ui.setCursorSprite(6);
		} else if (
			this.isMouseInBounds(
				new Point(this.getScreenResolutionMantainRatio().width - 30.0, 0),
				new Size(30, 1080)
			) &&
			this.mouseEdgeEnabled
		) {
			mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() - 5.0);
			mp.game.ui.setCursorSprite(7);
		} else if (this.mouseEdgeEnabled) {
			mp.game.ui.setCursorSprite(1);
		}

		for (let i = this._minItem; i <= limit; i++) {
			let xpos = this.offset.x;
			let ypos = this.offset.y + 144 - 37 + this.extraOffset + counter * 38;
			let xsize = 431 + this.widthOffset;

			const ysize = 38;
			const uiMenuItem = this.menuItems[i];

			if (this.isMouseInBounds(new Point(xpos, ypos), new Size(xsize, ysize))) {
				uiMenuItem.hovered = true;
				if (
					mp.game.controls.isControlJustPressed(0, 24) ||
					mp.game.controls.isDisabledControlJustPressed(0, 24)
				)
					if (uiMenuItem.selected && uiMenuItem.enabled) {
						if (
							this.menuItems[i] instanceof UIMenuListItem &&
							this.isMouseInListItemArrows(this.menuItems[i], new Point(xpos, ypos), 0) > 0
						) {
							const res = this.isMouseInListItemArrows(this.menuItems[i], new Point(xpos, ypos), 0);

							switch (res) {
								case 1:
									Common.playSound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
									//this.MenuItems[i].ItemActivate(this);
									this.menuItems[i].fireEvent();
									this.itemSelect.emit(this.menuItems[i], i);
									break;
								case 2:
									var it = this.menuItems[i] as any;
									if (
										(it.Collection == null
											? it.Items.Count
											: it.Collection.Count) > 0
									) {
										it.Index++;
										Common.playSound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
										this.listChange.emit(it, it.Index);
									}
									break;
							}
						} else this.selectItem();
					} else if (!uiMenuItem.selected) {
						this.currentSelection = i;

						Common.playSound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);

						this.indexChange.emit(this.currentSelection);
						this.selectItem();
					} else if (!uiMenuItem.enabled && uiMenuItem.selected) {
						Common.playSound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
					}
			} else uiMenuItem.hovered = false;
			counter++;
		}
		const extraY =
			144 +
			38 * (this.maxItemsOnScreen + 1) +
			this.offset.y -
			37 +
			this.extraOffset +
			this.safezoneOffset.y;
		const extraX = this.safezoneOffset.x + this.offset.x;

		if (this.menuItems.length <= this.maxItemsOnScreen + 1) return;
		if (
			this.isMouseInBounds(
				new Point(extraX, extraY),
				new Size(431 + this.widthOffset, 18)
			)
		) {
			this._extraRectangleUp.color = new Color(30, 30, 30, 255);
			if (
				mp.game.controls.isControlJustPressed(0, 24) ||
				mp.game.controls.isDisabledControlJustPressed(0, 24)
			) {
				if (this.menuItems.length > this.maxItemsOnScreen + 1)
					this.goUpOverflow();
				else this.goUp();
			}
		} else this._extraRectangleUp.color = new Color(0, 0, 0, 200);

		if (
			this.isMouseInBounds(
				new Point(extraX, extraY + 18),
				new Size(431 + this.widthOffset, 18)
			)
		) {
			this._extraRectangleDown.color = new Color(30, 30, 30, 255);
			if (
				mp.game.controls.isControlJustPressed(0, 24) ||
				mp.game.controls.isDisabledControlJustPressed(0, 24)
			) {
				if (this.menuItems.length > this.maxItemsOnScreen + 1) {
					this.goDownOverflow();
				} else {
					this.goDown();
				}
			}
		} else this._extraRectangleDown.color = new Color(0, 0, 0, 200);
	}

	processControl() {
		if (!this.visible) return;

		if (this._justOpened) {
			this._justOpened = false;
			return;
		}

		if (mp.game.controls.isControlJustReleased(0, 177)) {
			this.goBack();
		}

		if (!this.menuItems.length) return;

		if (
			mp.game.controls.isControlPressed(0, 172) &&
			this.lastUpDownNavigation + 120 < Date.now()
		) {
			// isControlJustPressed
			// Up
			this.lastUpDownNavigation = Date.now();
			if (this.menuItems.length > this.maxItemsOnScreen + 1) {
				this.goUpOverflow();
			} else {
				this.goUp();
			}
		} else if (mp.game.controls.isControlJustReleased(0, 172)) {
			this.lastUpDownNavigation = 0;
		} else if (
			mp.game.controls.isControlPressed(0, 173) &&
			this.lastUpDownNavigation + 120 < Date.now()
		) {
			// isControlJustPressed
			// Down
			this.lastUpDownNavigation = Date.now();
			if (this.menuItems.length > this.maxItemsOnScreen + 1)
				this.goDownOverflow();
			else this.goDown();
		} else if (mp.game.controls.isControlJustReleased(0, 173)) {
			this.lastUpDownNavigation = 0;
		} else if (
			mp.game.controls.isControlPressed(0, 174) &&
			this.lastLeftRightNavigation + 100 < Date.now()
		) {
			// Left
			this.lastLeftRightNavigation = Date.now();
			this.goLeft();
		} else if (mp.game.controls.isControlJustReleased(0, 174)) {
			this.lastLeftRightNavigation = 0;
		} else if (
			mp.game.controls.isControlPressed(0, 175) &&
			this.lastLeftRightNavigation + 100 < Date.now()
		) {
			// Right
			this.lastLeftRightNavigation = Date.now();
			this.goRight();
		} else if (mp.game.controls.isControlJustReleased(0, 175)) {
			this.lastLeftRightNavigation = 0;
		} else if (mp.game.controls.isControlJustPressed(0, 201)) {
			// Select
			this.selectItem();
		}
	}

	private formatDescription(input: string) {
		if (input.length > 99) input = input.slice(0, 99);

		const maxPixelsPerLine = 425 + this.widthOffset;
		let aggregatePixels = 0;
		let output = '';
		const words = input.split(' ');
		for (const word of words) {
			const offset = StringMeasurer.measureString(word);
			aggregatePixels += offset;
			if (aggregatePixels > maxPixelsPerLine) {
				output += '\n' + word + ' ';
				aggregatePixels = offset + StringMeasurer.measureString(' ');
			} else {
				output += word + ' ';
				aggregatePixels += StringMeasurer.measureString(' ');
			}
		}
		return output;
	}

	goUpOverflow() {
		if (this.menuItems.length <= this.maxItemsOnScreen + 1) return;

		if (this._activeItem % this.menuItems.length <= this._minItem) {
			if (this._activeItem % this.menuItems.length == 0) {
				this._minItem = this.menuItems.length - this.maxItemsOnScreen - 1;
				this._maxItem = this.menuItems.length - 1;
				this.menuItems[
					this._activeItem % this.menuItems.length
				].selected = false;
				this._activeItem = 1000 - (1000 % this.menuItems.length);
				this._activeItem += this.menuItems.length - 1;
				this.menuItems[
					this._activeItem % this.menuItems.length
				].selected = true;
			} else {
				this._minItem--;
				this._maxItem--;
				this.menuItems[this._activeItem % this.menuItems.length].selected = false;
				this._activeItem--;
				this.menuItems[this._activeItem % this.menuItems.length].selected = true;
			}
		} else {
			this.menuItems[this._activeItem % this.menuItems.length].selected = false;
			this._activeItem--;
			this.menuItems[this._activeItem % this.menuItems.length].selected = true;
		}
		Common.playSound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
		this.indexChange.emit(this.currentSelection);
	}

	goUp() {
		if (this.menuItems.length > this.maxItemsOnScreen + 1) return;

		this.menuItems[this._activeItem % this.menuItems.length].selected = false;
		this._activeItem--;
		this.menuItems[this._activeItem % this.menuItems.length].selected = true;

		Common.playSound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
		this.indexChange.emit(this.currentSelection);
	}

	goDownOverflow() {
		if (this.menuItems.length <= this.maxItemsOnScreen + 1) return;

		if (this._activeItem % this.menuItems.length >= this._maxItem) {
			if (this._activeItem % this.menuItems.length === this.menuItems.length - 1) {
				this._minItem = 0;
				this._maxItem = this.maxItemsOnScreen;
				this.menuItems[this._activeItem % this.menuItems.length].selected = false;
				this._activeItem = 1000 - (1000 % this.menuItems.length);
				this.menuItems[this._activeItem % this.menuItems.length].selected = true;
			} else {
				this._minItem++;
				this._maxItem++;
				this.menuItems[ this._activeItem % this.menuItems.length ].selected = false;

				this._activeItem++;
				this.menuItems[ this._activeItem % this.menuItems.length ].selected = true;
			}
		} else {
			this.menuItems[this._activeItem % this.menuItems.length].selected = false;
			this._activeItem++;
			this.menuItems[this._activeItem % this.menuItems.length].selected = true;
		}

		Common.playSound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
		this.indexChange.emit(this.currentSelection);
	}

	goDown(): void {
		if (this.menuItems.length > this.maxItemsOnScreen + 1) return;

		this.menuItems[this._activeItem % this.menuItems.length].selected = false;
		this._activeItem++;
		this.menuItems[this._activeItem % this.menuItems.length].selected = true;

		Common.playSound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
		this.indexChange.emit(this.currentSelection);
	}

	goBack(): void {
		Common.playSound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
		this.visible = false;

		if (this.parentMenu != null) {
			this.parentMenu.visible = true;
			this.parentMenu._justOpened = true;
			this.parentMenu.menuOpen.emit();
			this.menuChange.emit(this.parentMenu, false);
		}

		this.menuClose.emit();
	}

	bindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem): void {
		menuToBind.parentMenu = this;
		menuToBind.parentItem = itemToBindTo;
		this.children.set(itemToBindTo.id, menuToBind);
	}

	releaseMenuFromItem(releaseFrom: UIMenuItem): boolean {
		if (!this.children.has(releaseFrom.id)) return false;

		const menu: Menu = this.children.get(releaseFrom.id);
		menu.parentItem = null;
		menu.parentMenu = null;
		this.children.delete(releaseFrom.id);

		return true;
	}

	private render(): void {
		if (!this.visible) return;

		if (this._justOpened) {
			if (this._logo != null && !this._logo.isTextureDictionaryLoaded)
				this._logo.loadTextureDictionary();
			if (!this._background.isTextureDictionaryLoaded)
				this._background.loadTextureDictionary();
			if (!this._descriptionRectangle.isTextureDictionaryLoaded)
				this._descriptionRectangle.loadTextureDictionary();
			if (!this._upAndDownSprite.isTextureDictionaryLoaded)
				this._upAndDownSprite.loadTextureDictionary();
		}
		this._mainMenu.draw();

		this.processMouse();
		this.processControl();

		this._background.size =
			this.menuItems.length > this.maxItemsOnScreen + 1
				? new Size(431 + this.widthOffset, 38 * (this.maxItemsOnScreen + 1))
				: new Size(431 + this.widthOffset, 38 * this.menuItems.length);
		this._background.draw();

		if (this.menuItems.length > 0) {
			this.menuItems[this._activeItem % this.menuItems.length].selected = true;
			if (
				this.menuItems[this._activeItem % this.menuItems.length].description.trim() !== ''
			) {
				this.recalculateDescriptionPosition();
				let descCaption = this.menuItems[this._activeItem % this.menuItems.length].description;
				// descCaption = this.formatDescription(descCaption);
				this._descriptionText.caption = descCaption;
				const numLines = this._descriptionText.caption.split('\n').length;
				this._descriptionRectangle.size = new Size(431 + this.widthOffset, numLines * 25 + 15);

				this._descriptionBar.draw();
				this._descriptionRectangle.draw();
				this._descriptionText.draw();
			}
		}

		if (this.menuItems.length <= this.maxItemsOnScreen + 1) {
			let count = 0;

			for (const item of this.menuItems) {
				item.setVerticalPosition(count * 38 - 37 + this.extraOffset);
				item.draw();
				count++;
			}

			if (this._counterText && this.counterOverride) {
				this._counterText.caption = this.counterPretext + this.counterOverride;
				this._counterText.draw();
			}
		} else {
			let count = 0;

			for (let index = this._minItem; index <= this._maxItem; index++) {
				var item = this.menuItems[index];
				item.setVerticalPosition(count * 38 - 37 + this.extraOffset);
				item.draw();
				count++;
			}

			this._extraRectangleUp.size = new Size(431 + this.widthOffset, 18);
			this._extraRectangleDown.size = new Size(431 + this.widthOffset, 18);
			this._upAndDownSprite.pos = new Point(
				190 + this.offset.x + this.widthOffset / 2,
				147 + 37 * (this.maxItemsOnScreen + 1) + this.offset.y - 37 + this.extraOffset
			);

			this._extraRectangleUp.draw();
			this._extraRectangleDown.draw();
			this._upAndDownSprite.draw();

			if (this._counterText) {
				if (!this.counterOverride) {
					const cap = this.currentSelection + 1 + ' / ' + this.menuItems.length;
					this._counterText.caption = this.counterPretext + cap;
				} else {
					this._counterText.caption = this.counterPretext + this.counterOverride;
				}

				this._counterText.draw();
			}
		}

		this._logo.draw();
	}

}

export {
	UIMenuItem,
	UIMenuListItem,
	UIMenuCheckboxItem,
	UIMenuSliderItem,
	BadgeStyle,
	Point,
	Size,
	Color,
	Font,
	ItemsCollection,
	ListItem
};
