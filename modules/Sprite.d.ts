import { Color } from "../utils/Color";
import { Point } from "../utils/Point";
import { Size } from "../utils/Size";
export declare class Sprite {
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
