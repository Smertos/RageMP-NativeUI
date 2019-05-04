import { Font } from 'enums';
import { Element } from 'modules/element';
import { ResText } from 'modules/res-text';
import { Color, Point, Size } from 'utils';

const isOffset = (offset: string | Size): offset is Size => typeof offset !== 'string';

export class Text extends Element {
	caption: string;
	pos: Point;
	scale: number;
	color: Color;
	font: number;
	centered: boolean;

	constructor(caption: string, pos: Point, scale: number, color: Color, font: Font, centered: boolean) {
		super();

		this.caption = caption;
		this.pos = pos;
		this.scale = scale;
		this.color = color || new Color(255, 255, 255, 255);
		this.font = font || 0;
		this.centered = centered || false;
	}

	draw(caption: string | Size, pos: Point, scale: number, color: Color, font: number, centered: boolean) {
		if (isOffset(caption) && !pos && !scale && !color && !font && !centered) {
			pos = new Point(this.pos.x + caption.width, this.pos.y + caption.height);
			scale = this.scale;
			color = this.color;
			font = this.font;
			centered = this.centered;
		}

		const x = pos.x / 1280.0;
		const y = pos.y / 720.0;

		mp.game.ui.setTextFont(+font);
		mp.game.ui.setTextScale(scale, scale);
		mp.game.ui.setTextColour(color.R, color.G, color.B, color.A);
		mp.game.ui.setTextCentre(centered);
		mp.game.ui.setTextEntry('STRING');

		if (!isOffset(caption)) {
			ResText.addLongString(caption);
		}

		mp.game.ui.drawText(x, y);
	}
}

