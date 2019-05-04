import { Color, Point, Size, Screen } from 'utils';

export class Sprite {
	private _textureDict: string;

	textureName: string;
	pos: Point;
	size: Size;
	heading: number;
	color: Color;
	visible: boolean;

	set textureDict(value) {
		this._textureDict = value;

		if (!this.isTextureDictionaryLoaded) {
			this.loadTextureDictionary();
		}
	}
	get textureDict(): string {
		return this._textureDict;
	}

	get isTextureDictionaryLoaded() {
		return mp.game.graphics.hasStreamedTextureDictLoaded(this._textureDict);
	}

	constructor(
		textureDict,
		textureName,
		pos,
		size,
		heading = 0,
		color = new Color(255, 255, 255)
	) {
		this.textureDict = textureDict;
		this.textureName = textureName;
		this.pos = pos;
		this.size = size;
		this.heading = heading;
		this.color = color;
		this.visible = true;
	}

	loadTextureDictionary() {
		mp.game.graphics.requestStreamedTextureDict(this._textureDict, true);
		while (!this.isTextureDictionaryLoaded) {
			//@ts-ignore
			mp.game.wait(0);
		}
	}

	draw(
		textureDictionary?,
		textureName?,
		pos?,
		size?,
		heading?,
		color?,
		loadTexture?
	) {
		textureDictionary = textureDictionary || this.textureDict;
		textureName = textureName || this.textureName;
		pos = pos || this.pos;
		size = size || this.size;
		heading = heading || this.heading;
		color = color || this.color;
		loadTexture = loadTexture || true;

		if (loadTexture) {
			if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDictionary)) {
				mp.game.graphics.requestStreamedTextureDict(textureDictionary, true);
			}
		}

		const screenw = Screen.width;
		const screenh = Screen.height;
		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		const w = this.size.width / width;
		const h = this.size.height / height;
		const x = this.pos.x / width + w * 0.5;
		const y = this.pos.y / height + h * 0.5;

		mp.game.graphics.drawSprite(
			textureDictionary,
			textureName,
			x, y, w, h,
			heading,
			color.R, color.G, color.B, color.A
		);
	}

}
