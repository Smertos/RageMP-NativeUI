declare module 'native-ui/enums/BadgeStyle' {
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
declare module 'native-ui/enums/Font' {
  export enum Font {
      ChaletLondon = 0,
      HouseScript = 1,
      Monospace = 2,
      CharletComprimeColonge = 4,
      Pricedown = 7
  }

}
declare module 'native-ui/index' {
  import { UIMenuCheckboxItem } from "native-ui/items/UIMenuCheckboxItem";
  import { UIMenuItem } from "native-ui/items/UIMenuItem";
  import { UIMenuListItem } from "native-ui/items/UIMenuListItem";
  import { UIMenuSliderItem } from "native-ui/items/UIMenuSliderItem";
  import { LiteEvent } from "native-ui/utils/LiteEvent";
  import { Point } from "native-ui/utils/Point";
  import { Size } from "native-ui/utils/Size";
  export class Menu {
      readonly Id: string;
      private title;
      private subtitle;
      private counterPretext;
      private counterOverride;
      private spriteLibrary;
      private spriteName;
      private offset;
      private lastUpDownNavigation;
      private lastLeftRightNavigation;
      private _activeItem;
      private extraOffset;
      ParentMenu: Menu;
      ParentItem: UIMenuItem;
      Children: Map<string, Menu>;
      WidthOffset: number;
      Visible: boolean;
      MouseControlsEnabled: boolean;
      private _justOpened;
      private safezoneOffset;
      private MaxItemsOnScreen;
      private _minItem;
      private _maxItem;
      AUDIO_LIBRARY: string;
      AUDIO_UPDOWN: string;
      AUDIO_LEFTRIGHT: string;
      AUDIO_SELECT: string;
      AUDIO_BACK: string;
      AUDIO_ERROR: string;
      MenuItems: (UIMenuItem | UIMenuListItem | UIMenuSliderItem | UIMenuCheckboxItem)[];
      CurrentSelection: number;
      readonly IndexChange: LiteEvent;
      readonly ListChange: LiteEvent;
      readonly SliderChange: LiteEvent;
      readonly SliderSelect: LiteEvent;
      readonly CheckboxChange: LiteEvent;
      readonly ItemSelect: LiteEvent;
      readonly MenuOpen: LiteEvent;
      readonly MenuClose: LiteEvent;
      readonly MenuChange: LiteEvent;
      private MouseEdgeEnabled;
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
      constructor(title: any, subtitle: any, offset: any, spriteLibrary: any, spriteName: any);
      private RecalculateDescriptionPosition;
      SetMenuWidthOffset(widthOffset: number): void;
      AddItem(item: UIMenuItem): void;
      RefreshIndex(): void;
      Clear(): void;
      Open(): void;
      Close(): void;
      Subtitle: string;
      GoLeft(): void;
      GoRight(): void;
      SelectItem(): void;
      getMousePosition(relative?: boolean): number[];
      GetScreenResolutionMantainRatio(): Size;
      IsMouseInBounds(topLeft: Point, boxSize: Size): boolean;
      IsMouseInListItemArrows(item: any, topLeft: any, safezone: any): 1 | 0 | 2;
      ProcessMouse(): void;
      ProcessControl(): void;
      private FormatDescription;
      GoUpOverflow(): void;
      GoUp(): void;
      GoDownOverflow(): void;
      GoDown(): void;
      GoBack(): void;
      BindMenuToItem(menuToBind: Menu, itemToBindTo: UIMenuItem): void;
      ReleaseMenuFromItem(releaseFrom: UIMenuItem): boolean;
      private render;
  }

}
declare module 'native-ui/items/UIMenuCheckboxItem' {
  import { ILiteEvent } from "native-ui/utils/LiteEvent";
  import { UIMenuItem } from "native-ui/items/UIMenuItem";
  export class UIMenuCheckboxItem extends UIMenuItem {
      private readonly _checkedSprite;
      private readonly OnCheckedChanged;
      readonly CheckedChanged: ILiteEvent;
      Checked: boolean;
      constructor(text: string, check?: boolean, description?: string);
      SetVerticalPosition(y: number): void;
      Draw(): void;
  }

}
declare module 'native-ui/items/UIMenuItem' {
  import { BadgeStyle } from "native-ui/enums/BadgeStyle";
  import { Menu } from "native-ui/index";
  import { ResRectangle } from "native-ui/modules/ResRectangle";
  import { ResText } from "native-ui/modules/ResText";
  import { Sprite } from "native-ui/modules/Sprite";
  import { Color } from "native-ui/utils/Color";
  import { Point } from "native-ui/utils/Point";
  export class UIMenuItem {
      readonly Id: string;
      static readonly DefaultBackColor: Color;
      static readonly DefaultHighlightedBackColor: Color;
      static readonly DefaultForeColor: Color;
      static readonly DefaultHighlightedForeColor: Color;
      private _event;
      protected _rectangle: ResRectangle;
      protected _text: ResText;
      protected _selectedSprite: Sprite;
      protected _badgeLeft: Sprite;
      protected _badgeRight: Sprite;
      protected _labelText: ResText;
      BackColor: Color;
      HighlightedBackColor: Color;
      ForeColor: Color;
      HighlightedForeColor: Color;
      Enabled: boolean;
      Selected: boolean;
      Hovered: boolean;
      Description: string;
      Offset: Point;
      Parent: Menu;
      Text: string;
      RightLabel: string;
      LeftBadge: BadgeStyle;
      RightBadge: BadgeStyle;
      constructor(text: any, description?: string);
      SetVerticalPosition(y: number): void;
      addEvent(event: string, ...args: any[]): void;
      fireEvent(): void;
      Draw(): void;
      SetLeftBadge(badge: BadgeStyle): void;
      SetRightBadge(badge: BadgeStyle): void;
      SetRightLabel(text: string): void;
      BadgeToSpriteLib(badge: BadgeStyle): string;
      BadgeToSpriteName(badge: BadgeStyle, selected: boolean): "" | "mp_medal_bronze" | "mp_medal_gold" | "medal_silver" | "mp_alerttriangle" | "mp_hostcrown" | "shop_ammo_icon_b" | "shop_ammo_icon_a" | "shop_armour_icon_b" | "shop_armour_icon_a" | "shop_barber_icon_b" | "shop_barber_icon_a" | "shop_clothing_icon_b" | "shop_clothing_icon_a" | "shop_franklin_icon_b" | "shop_franklin_icon_a" | "shop_garage_bike_icon_b" | "shop_garage_bike_icon_a" | "shop_garage_icon_b" | "shop_garage_icon_a" | "shop_gunclub_icon_b" | "shop_gunclub_icon_a" | "shop_health_icon_b" | "shop_health_icon_a" | "shop_lock" | "shop_makeup_icon_b" | "shop_makeup_icon_a" | "shop_mask_icon_b" | "shop_mask_icon_a" | "shop_michael_icon_b" | "shop_michael_icon_a" | "shop_new_star" | "shop_tattoos_icon_b" | "shop_tattoos_icon_" | "shop_tick_icon" | "shop_trevor_icon_b" | "shop_trevor_icon_a";
      IsBagdeWhiteSprite(badge: BadgeStyle): boolean;
      BadgeToColor(badge: BadgeStyle, selected: boolean): Color;
  }

}
declare module 'native-ui/items/UIMenuListItem' {
  import { BadgeStyle } from "native-ui/enums/BadgeStyle";
  import { ItemsCollection } from "native-ui/modules/ItemsCollection";
  import { ListItem } from "native-ui/modules/ListItem";
  import { ResText } from "native-ui/modules/ResText";
  import { Sprite } from "native-ui/modules/Sprite";
  import { UIMenuItem } from "native-ui/items/UIMenuItem";
  export class UIMenuListItem extends UIMenuItem {
      protected _itemText: ResText;
      protected _arrowLeft: Sprite;
      protected _arrowRight: Sprite;
      private _holdTime;
      private currOffset;
      private collection;
      Collection: ListItem[];
      SelectedItem: ListItem;
      readonly SelectedValue: any;
      ScrollingEnabled: boolean;
      HoldTimeBeforeScroll: number;
      private readonly OnListChanged;
      readonly ListChanged: import("native-ui/utils/LiteEvent").ILiteEvent;
      protected _index: number;
      Index: number;
      constructor(text: string, description?: string, collection?: ItemsCollection, startIndex?: number);
      setCollection(collection: ItemsCollection): void;
      setCollectionItem(index: number, item: ListItem | string, resetSelection?: boolean): void;
      SetVerticalPosition(y: number): void;
      SetRightLabel(text: string): this;
      SetRightBadge(badge: BadgeStyle): this;
      Draw(): void;
  }

}
declare module 'native-ui/items/UIMenuSliderItem' {
  import { BadgeStyle } from "native-ui/enums/BadgeStyle";
  import { UIMenuItem } from "native-ui/items/UIMenuItem";
  export class UIMenuSliderItem extends UIMenuItem {
      private _arrowLeft;
      private _arrowRight;
      private _rectangleBackground;
      private _rectangleSlider;
      private _rectangleDivider;
      private _items;
      private _index;
      Index: number;
      constructor(text: string, items: any[], index: number, description?: string, divider?: boolean);
      SetVerticalPosition(y: number): void;
      IndexToItem(index: number): any;
      Draw(): void;
      SetRightBadge(badge: BadgeStyle): void;
      SetRightLabel(text: string): void;
  }

}
declare module 'native-ui/modules/Container' {
  import { Rectangle } from "native-ui/modules/Rectangle";
  export class Container extends Rectangle {
      Items: any[];
      constructor(pos: any, size: any, color: any);
      addItem(item: any): void;
      Draw(offset?: any): void;
  }

}
declare module 'native-ui/modules/Element' {
  export class Element {
      enabled: boolean;
      constructor();
  }

}
declare module 'native-ui/modules/ItemsCollection' {
  export class ItemsCollection {
      private items;
      constructor(items: any[]);
      length(): number;
      getListItems(): any[];
  }

}
declare module 'native-ui/modules/ListItem' {
  export class ListItem {
      readonly Id: string;
      DisplayText: string;
      Data: any;
      constructor(text?: string, data?: any);
  }

}
declare module 'native-ui/modules/Rectangle' {
  import { Color } from "native-ui/utils/Color";
  import { Point } from "native-ui/utils/Point";
  import { Size } from "native-ui/utils/Size";
  import { Element } from "native-ui/modules/Element";
  export class Rectangle extends Element {
      pos: Point;
      size: Size;
      color: Color;
      constructor(pos: any, size: any, color: any);
      Draw(pos: any, size: any, color: any): void;
  }

}
declare module 'native-ui/modules/ResRectangle' {
  import { Rectangle } from "native-ui/modules/Rectangle";
  export class ResRectangle extends Rectangle {
      constructor(pos: any, size: any, color: any);
      Draw(): void;
      Draw(offset: any): void;
      Draw(pos: any, size: any, color: any): void;
  }

}
declare module 'native-ui/modules/ResText' {
  import { Size } from "native-ui/utils/Size";
  import { Text } from "native-ui/modules/Text";
  export enum Alignment {
      Left = 0,
      Centered = 1,
      Right = 2
  }
  export class ResText extends Text {
      TextAlignment: Alignment;
      DropShadow: boolean;
      Outline: boolean;
      WordWrap: Size;
      constructor(caption: any, pos: any, scale: any, color?: any, font?: any, justify?: any);
      Draw(): void;
      Draw(offset: Size): void;
      Draw(caption: any, pos: any, scale: any, color: any, font: any, arg2: any): void;
      static AddLongString(str: string): void;
  }

}
declare module 'native-ui/modules/Sprite' {
  import { Color } from "native-ui/utils/Color";
  import { Point } from "native-ui/utils/Point";
  import { Size } from "native-ui/utils/Size";
  export class Sprite {
      TextureName: string;
      pos: Point;
      size: Size;
      heading: number;
      color: Color;
      visible: boolean;
      private _textureDict;
      constructor(textureDict: any, textureName: any, pos: any, size: any, heading?: number, color?: Color);
      LoadTextureDictionary(): void;
      TextureDict: string;
      readonly IsTextureDictionaryLoaded: boolean;
      Draw(textureDictionary?: any, textureName?: any, pos?: any, size?: any, heading?: any, color?: any, loadTexture?: any): void;
  }

}
declare module 'native-ui/modules/StringMeasurer' {
  export class StringMeasurer {
      static MeasureStringWidthNoConvert(input: string): number;
      static MeasureString(str: string): number;
  }

}
declare module 'native-ui/modules/Text' {
  import { Color } from "native-ui/utils/Color";
  import { Point } from "native-ui/utils/Point";
  import { Element } from "native-ui/modules/Element";
  export class Text extends Element {
      caption: string;
      pos: Point;
      scale: number;
      color: Color;
      font: number;
      centered: boolean;
      constructor(caption: any, pos: any, scale: any, color: any, font: any, centered: any);
      Draw(caption: any, pos: any, scale: any, color: any, font: any, centered: any): void;
  }

}
declare module 'native-ui/utils/Color' {
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
      constructor(r: any, g: any, b: any, a?: number);
  }

}
declare module 'native-ui/utils/Common' {
  export class Common {
      static PlaySound(audioName: string, audioRef: string): void;
  }

}
declare module 'native-ui/utils/LiteEvent' {
  export interface ILiteEvent {
      on(handler: {
          (...args: any[]): void;
      }): void;
      off(handler: {
          (...args: any[]): void;
      }): void;
  }
  export class LiteEvent implements ILiteEvent {
      private handlers;
      on(handler: {
          (...args: any[]): void;
      }): void;
      off(handler: {
          (...args: any[]): void;
      }): void;
      emit(...args: any[]): void;
      expose(): ILiteEvent;
  }

}
declare module 'native-ui/utils/Point' {
  export class Point {
      static Parse(point: number[]): Point;
      static Parse(point: {
          X: number;
          Y: number;
      }): Point;
      X: number;
      Y: number;
      constructor(x: number, y: number);
  }

}
declare module 'native-ui/utils/Screen' {
  export const Screen: {
      width: number;
      height: number;
  };

}
declare module 'native-ui/utils/Size' {
  export class Size {
      Width: number;
      Height: number;
      constructor(w?: number, h?: number);
  }

}
declare module 'native-ui/utils/uuid' {
  export const uuid: () => string;

}
declare module 'native-ui' {
  import main = require('native-ui/index');
  export = main;
}