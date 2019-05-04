import { Text } from 'modules/text';
import { Color, Point, Screen, Size } from 'utils';

export enum Alignment {
	Left,
	Centered,
	Right
}

export class ResText extends Text {
	textAlignment: Alignment = Alignment.Left;
	dropShadow: boolean;
	outline: boolean;
	wordWrap: Size;

	constructor(caption, pos, scale, color?, font?, justify?) {
		super(caption, pos, scale, color || new Color(255, 255, 255), font || 0, false);

		if (justify) {
			this.textAlignment = justify;
		}
	}

	draw(): void;
	draw(offset: Size): void;
	draw(caption, pos, scale, color, font, arg2): void;

	draw(
		arg1?,
		pos?,
		scale?,
		color?,
		font?,
		arg2?,
		dropShadow?,
		outline?,
		wordWrap?
	) {
		let caption = arg1;
		let centered = arg2;
		let textAlignment = arg2;

		if (!arg1) arg1 = new Size(0, 0);

		if (arg1 && !pos) {
			textAlignment = this.textAlignment;
			caption = this.caption;
			pos = new Point(this.pos.x + arg1.Width, this.pos.y + arg1.Height);
			scale = this.scale;
			color = this.color;
			font = this.font;

			if (centered == true || centered == false) {
				centered = this.centered;
			} else {
				centered = undefined;
				dropShadow = this.dropShadow;
				outline = this.outline;
				wordWrap = this.wordWrap;
			}
		}

		const screenw = Screen.width;
		const screenh = Screen.height;

		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		const x = this.pos.x / width;
		const y = this.pos.y / height;

		mp.game.ui.setTextFont(parseInt(font));
		mp.game.ui.setTextScale(1.0, scale);
		mp.game.ui.setTextColour(color.R, color.G, color.B, color.A);

		if (centered !== undefined) {
			mp.game.ui.setTextCentre(centered);
		} else {
			if (dropShadow) mp.game.ui.setTextDropshadow(2, 0, 0, 0, 0);

			if (outline) console.warn('not working!');

			switch (textAlignment) {
				case Alignment.Centered:
					mp.game.ui.setTextCentre(true);
					break;
				case Alignment.Right:
					mp.game.ui.setTextRightJustify(true);
					mp.game.ui.setTextWrap(0.0, x);
					break;
			}

			if (wordWrap) {
				const xsize = (this.pos.x + wordWrap.Width) / width;
				mp.game.ui.setTextWrap(x, xsize);
			}
		}

		mp.game.ui.setTextEntry('STRING');
		ResText.addLongString(caption);
		mp.game.ui.drawText(x, y);
	}

	static addLongString(str: string) {
		const strLen = 99;

		for (var i = 0; i < str.length; i += strLen) {
			const substr = str.substr(i, Math.min(strLen, str.length - i));
			mp.game.ui.addTextComponentSubstringPlayerName(substr);
		}
	}
}
