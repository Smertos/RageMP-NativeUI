declare module 'native-ui/enums/badge-style' {
  export enum BadgeStyle {
      None = 0,
      BronzeMedal = 1,
      GoldMedal = 2,
      SilverMedal = 3,
      Alert = 4,
      Crown = 5,
      Ammo = 6,
      Armour = 7,
      Barber = 8,
      Clothes = 9,
      Franklin = 10,
      Bike = 11,
      Car = 12,
      Gun = 13,
      Heart = 14,
      Makeup = 15,
      Mask = 16,
      Michael = 17,
      Star = 18,
      Tatoo = 19,
      Trevor = 20,
      Lock = 21,
      Tick = 22
  }

}
declare module 'native-ui/enums/font' {
  export enum Font {
      ChaletLondon = 0,
      HouseScript = 1,
      Monospace = 2,
      CharletComprimeColonge = 4,
      Pricedown = 7
  }

}
declare module 'native-ui/enums/index' {
  export { BadgeStyle } from 'native-ui/enums/badge-style';
  export { Font } from 'native-ui/enums/font';

}
declare module 'native-ui/index' {
  import { BadgeStyle, Font } from 'enums';
  import { UIMenuCheckboxItem, UIMenuItem, UIMenuListItem, UIMenuSliderItem } from 'items';
  import { ItemsCollection, ListItem } from 'modules';
  import { Color, LiteEvent, Point, Size } from 'utils';
  export class Menu {
      private readonly _mainMenu;
      private readonly _logo;
      private readonly _upAndDownSprite;
      private readonly _title;
      private readonly _subtitle;
      private readonly _extraRectangleUp;
      private readonly _extraRectangleDown;
      private readonly _descriptionBar;
      private readonly _descriptionRectangle;
      private readonly _descriptionText;
      private readonly _counterText;
      private readonly _background;
      private title;
      private subtitle;
      private counterPretext;
      private counterOverride;
      private spriteLibrary;
      private spriteName;
      private offset;
      private lastUpDownNavigation;
      private lastLeftRightNavigation;
      private extraOffset;
      private safezoneOffset;
      private maxItemsOnScreen;
      private mouseEdgeEnabled;
      private _activeItem;
      private _justOpened;
      private _minItem;
      private _maxItem;
      readonly indexChange: LiteEvent;
      readonly listChange: LiteEvent;
      readonly sliderChange: LiteEvent;
      readonly sliderSelect: LiteEvent;
      readonly checkboxChange: LiteEvent;
      readonly itemSelect: LiteEvent;
      readonly menuOpen: LiteEvent;
      readonly menuClose: LiteEvent;
      readonly menuChange: LiteEvent;
      readonly id: string;
      AUDIO_LIBRARY: string;
      AUDIO_UPDOWN: string;
      AUDIO_LEFTRIGHT: string;
      AUDIO_SELECT: string;
      AUDIO_BACK: string;
      AUDIO_ERROR: string;
      parentMenu: Menu;
      parentItem: UIMenuItem;
      children: Map<string, Menu>;
      widthOffset: number;
      visible: boolean;
      mouseControlsEnabled: boolean;
      menuItems: (UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem)[];
      currentSelection: number;
      constructor(title: string, subtitle: string, offset: Point, spriteLibrary?: string, spriteName?: string);
      private recalculateDescriptionPosition;
      setMenuWidthOffset(widthOffset: number): void;
      addItem(item: UIMenuItem): void;
      refreshIndex(): void;
      clear(): void;
      open(): void;
      close(): void;
      subtitleCaption: string;
      goLeft(): void;
      goRight(): void;
      selectItem(): void;
      getMousePosition(relative?: boolean): [number, number];
      getScreenResolutionMantainRatio(): Size;
      isMouseInBounds(topLeft: Point, boxSize: Size): boolean;
      isMouseInListItemArrows(item: any, topLeft: any, safezone: any): 1 | 0 | 2;
      processMouse(): void;
      processControl(): void;
      private formatDescription;
      goUpOverflow(): void;
      goUp(): void;
      goDownOverflow(): void;
      goDown(): void;
      goBack(): void;
      bindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem): void;
      releaseMenuFromItem(releaseFrom: UIMenuItem): boolean;
      private render;
  }
  export { UIMenuItem, UIMenuListItem, UIMenuCheckboxItem, UIMenuSliderItem, BadgeStyle, Point, Size, Color, Font, ItemsCollection, ListItem };

}
declare module 'native-ui/items/index' {
  export { UIMenuCheckboxItem } from 'native-ui/items/ui-menu-checkbox';
  export { UIMenuItem } from 'native-ui/items/ui-menu';
  export { UIMenuListItem } from 'native-ui/items/ui-menu-list';
  export { UIMenuSliderItem } from 'native-ui/items/ui-menu-slider';

}
declare module 'native-ui/items/ui-menu-checkbox' {
  import { UIMenuItem } from 'items/ui-menu.item';
  import { ILiteEvent } from 'utils';
  export class UIMenuCheckboxItem extends UIMenuItem {
      private readonly _checkedSprite;
      private readonly onCheckedChanged;
      readonly checkedChanged: ILiteEvent;
      checked: boolean;
      constructor(text: string, check?: boolean, description?: string);
      setVerticalPosition(y: number): void;
      draw(): void;
  }

}
declare module 'native-ui/items/ui-menu-list' {
  import { BadgeStyle } from 'enums';
  import { UIMenuItem } from 'items/ui-menu.item';
  import { ItemsCollection } from 'modules/items-collection';
  import { ListItem } from 'modules/list-item';
  import { ResText } from 'modules/res-text';
  import { Sprite } from 'modules/sprite';
  export class UIMenuListItem extends UIMenuItem {
      private readonly onListChanged;
      private currOffset;
      private _collection;
      protected _itemText: ResText;
      protected _arrowLeft: Sprite;
      protected _arrowRight: Sprite;
      collection: Array<ListItem>;
      selectedItem: ListItem;
      readonly selectedValue: any;
      scrollingEnabled: boolean;
      holdTimeBeforeScroll: number;
      readonly listChanged: import("native-ui/utils/index").ILiteEvent;
      protected _index: number;
      index: number;
      constructor(text: string, description?: string, collection?: ItemsCollection, startIndex?: number);
      setCollection(collection: ItemsCollection): void;
      setCollectionItem(index: number, item: ListItem | string, resetSelection?: boolean): void;
      setVerticalPosition(y: number): void;
      setRightLabel(text: string): this;
      setRightBadge(badge: BadgeStyle): this;
      draw(): void;
  }

}
declare module 'native-ui/items/ui-menu-slider' {
  import { BadgeStyle } from 'enums';
  import { UIMenuItem } from 'items/ui-menu.item';
  export class UIMenuSliderItem extends UIMenuItem {
      private _arrowLeft;
      private _arrowRight;
      private _rectangleBackground;
      private _rectangleSlider;
      private _rectangleDivider;
      private _items;
      private _index;
      index: number;
      constructor(text: string, items: any[], index: number, description?: string, divider?: boolean);
      setVerticalPosition(y: number): void;
      indexToItem(index: number): any;
      draw(): void;
      setRightBadge(badge: BadgeStyle): void;
      setRightLabel(text: string): void;
  }

}
declare module 'native-ui/items/ui-menu' {
  import { BadgeStyle } from 'native-ui/enums/badge-style';
  import { Menu } from 'native-ui/index';
  import { ResRectangle } from 'native-ui/modules/res-rectangle';
  import { ResText } from 'native-ui/modules/res-text';
  import { Sprite } from 'native-ui/modules/sprite';
  import { Color } from 'native-ui/utils/color';
  import { Point } from 'native-ui/utils/point';
  export class UIMenuItem {
      readonly id: string;
      static readonly defaultBackColor: Color;
      static readonly defaultHighlightedBackColor: Color;
      static readonly defaultForeColor: Color;
      static readonly defaultHighlightedForeColor: Color;
      private _event;
      protected _rectangle: ResRectangle;
      protected _text: ResText;
      protected _selectedSprite: Sprite;
      protected _badgeLeft: Sprite;
      protected _badgeRight: Sprite;
      protected _labelText: ResText;
      backColor: Color;
      highlightedBackColor: Color;
      foreColor: Color;
      highlightedForeColor: Color;
      enabled: boolean;
      selected: boolean;
      hovered: boolean;
      description: string;
      offset: Point;
      parent: Menu;
      text: string;
      rightLabel: string;
      leftBadge: BadgeStyle;
      rightBadge: BadgeStyle;
      constructor(text: string, description?: string);
      setVerticalPosition(y: number): void;
      addEvent(event: string, ...args: any[]): void;
      fireEvent(): void;
      draw(): void;
      setLeftBadge(badge: BadgeStyle): void;
      setRightBadge(badge: BadgeStyle): void;
      setRightLabel(text: string): void;
      badgeToSpriteLib(badge: BadgeStyle): string;
      badgeToSpriteName(badge: BadgeStyle, selected: boolean): string;
      isBagdeWhiteSprite(badge: BadgeStyle): boolean;
      badgeToColor(badge: BadgeStyle, selected: boolean): Color;
  }

}
declare module 'native-ui/modules/container' {
  import { Rectangle } from 'modules/rectangle';
  import { Color, Point, Size } from 'utils';
  export class Container extends Rectangle {
      items: any[];
      constructor(position: Point, size: Size, color: Color);
      addItem(item: any): void;
      draw(offset?: Point): void;
  }

}
declare module 'native-ui/modules/element' {
  export class Element {
      enabled: boolean;
      constructor();
  }

}
declare module 'native-ui/modules/index' {
  export { Container } from 'native-ui/modules/container';
  export { Element } from 'native-ui/modules/element';
  export { ItemsCollection } from 'native-ui/modules/items-collection';
  export { ListItem } from 'native-ui/modules/list-item';
  export { Rectangle } from 'native-ui/modules/rectangle';
  export { ResRectangle } from 'native-ui/modules/res-rectangle';
  export { Alignment, ResText } from 'native-ui/modules/res-text';
  export { Sprite } from 'native-ui/modules/sprite';
  export { StringMeasurer } from 'native-ui/modules/string-measurer';
  export { Text } from 'native-ui/modules/text';

}
declare module 'native-ui/modules/items-collection' {
  export class ItemsCollection {
      private items;
      constructor(items: any[]);
      length(): number;
      getListItems(): Array<any>;
  }

}
declare module 'native-ui/modules/list-item' {
  export class ListItem {
      readonly id: string;
      displayText: string;
      data: any;
      constructor(text?: string, data?: any);
  }

}
declare module 'native-ui/modules/rectangle' {
  import { Element } from 'modules/element';
  import { Color, Point, Size } from 'utils';
  export class Rectangle extends Element {
      pos: Point;
      size: Size;
      color: Color;
      constructor(position: Point, size: Size, color: Color);
      draw(position: Point, size: Size, color: Color): void;
  }

}
declare module 'native-ui/modules/res-rectangle' {
  import { Rectangle } from 'modules/rectangle';
  export class ResRectangle extends Rectangle {
      constructor(pos: any, size: any, color: any);
      draw(): void;
      draw(offset: any): void;
      draw(pos: any, size: any, color: any): void;
  }

}
declare module 'native-ui/modules/res-text' {
  import { Text } from 'modules/text';
  import { Size } from 'utils';
  export enum Alignment {
      Left = 0,
      Centered = 1,
      Right = 2
  }
  export class ResText extends Text {
      textAlignment: Alignment;
      dropShadow: boolean;
      outline: boolean;
      wordWrap: Size;
      constructor(caption: any, pos: any, scale: any, color?: any, font?: any, justify?: any);
      draw(): void;
      draw(offset: Size): void;
      draw(caption: any, pos: any, scale: any, color: any, font: any, arg2: any): void;
      static addLongString(str: string): void;
  }

}
declare module 'native-ui/modules/sprite' {
  import { Color, Point, Size } from 'utils';
  export class Sprite {
      private _textureDict;
      textureName: string;
      pos: Point;
      size: Size;
      heading: number;
      color: Color;
      visible: boolean;
      textureDict: string;
      readonly isTextureDictionaryLoaded: boolean;
      constructor(textureDict: any, textureName: any, pos: any, size: any, heading?: number, color?: Color);
      loadTextureDictionary(): void;
      draw(textureDictionary?: any, textureName?: any, pos?: any, size?: any, heading?: any, color?: any, loadTexture?: any): void;
  }

}
declare module 'native-ui/modules/string-measurer' {
  export class StringMeasurer {
      static measureStringWidthNoConvert(input: string): number;
      static measureString(input: string): number;
  }

}
declare module 'native-ui/modules/text' {
  import { Font } from 'enums';
  import { Element } from 'modules/element';
  import { Color, Point, Size } from 'utils';
  export class Text extends Element {
      caption: string;
      pos: Point;
      scale: number;
      color: Color;
      font: number;
      centered: boolean;
      constructor(caption: string, pos: Point, scale: number, color: Color, font: Font, centered: boolean);
      draw(caption: string | Size, pos: Point, scale: number, color: Color, font: number, centered: boolean): void;
  }

}
declare module 'native-ui/utils/color' {
  export class Color {
      static Empty: Color;
      static Transparent: Color;
      static Black: Color;
      static White: Color;
      static WhiteSmoke: Color;
      R: number;
      G: number;
      B: number;
      A: number;
      constructor(r: number, g: number, b: number, a?: number);
  }

}
declare module 'native-ui/utils/common' {
  export class Common {
      static playSound(audioName: string, audioRef: string): void;
  }

}
declare module 'native-ui/utils/index' {
  export { Color } from 'native-ui/utils/color';
  export { Common } from 'native-ui/utils/common';
  export { ILiteEvent, LiteEvent } from 'native-ui/utils/lite-event';
  export { Point } from 'native-ui/utils/point';
  export { Screen } from 'native-ui/utils/screen';
  export { Size } from 'native-ui/utils/size';
  export { uuid } from 'native-ui/utils/uuid';

}
declare module 'native-ui/utils/lite-event' {
  type EventHandler = {
      (...args: any[]): void;
  };
  export interface ILiteEvent {
      on(handler: EventHandler): void;
      off(handler: EventHandler): void;
  }
  export class LiteEvent implements ILiteEvent {
      private handlers;
      on(handler: EventHandler): void;
      off(handler: EventHandler): void;
      emit(...args: any[]): void;
      expose(): ILiteEvent;
  }
  export {};

}
declare module 'native-ui/utils/point' {
  export class Point {
      static parse(point: number[]): Point;
      static parse(point: {
          x: number;
          y: number;
      }): Point;
      static parse(point: string): Point;
      x: number;
      y: number;
      constructor(x?: number, y?: number);
  }

}
declare module 'native-ui/utils/screen' {
  export const Screen: {
      width: number;
      height: number;
  };

}
declare module 'native-ui/utils/size' {
  export class Size {
      width: number;
      height: number;
      constructor(width?: number, height?: number);
  }

}
declare module 'native-ui/utils/uuid' {
  export const uuid: () => string;

}
declare module 'native-ui' {
  import main = require('native-ui/index');
  export = main;
}