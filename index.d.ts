import { UIMenuCheckboxItem } from "./items/UIMenuCheckboxItem";
import { UIMenuItem } from "./items/UIMenuItem";
import { UIMenuListItem } from "./items/UIMenuListItem";
import { UIMenuSliderItem } from "./items/UIMenuSliderItem";
import { LiteEvent } from "./utils/LiteEvent";
import { Point } from "./utils/Point";
import { Size } from "./utils/Size";
export declare class Menu {
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
    IsMouseInListItemArrows(item: any, topLeft: any, safezone: any): 0 | 1 | 2;
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
