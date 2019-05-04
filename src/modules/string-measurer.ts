import { ResText } from 'modules/res-text';
import { Screen } from 'utils';

export class StringMeasurer {
	static measureStringWidthNoConvert(input: string) {
		mp.game.ui.setTextEntryForWidth('STRING');
		ResText.addLongString(input);
		mp.game.ui.setTextFont(0);
		mp.game.ui.setTextScale(0.35, 0.35);

		return mp.game.ui.getTextScreenWidth(false);
	}

	static measureString(input: string) {
		const screenw = Screen.width;
		const screenh = Screen.height;
		const height = 1080.0;
		const ratio = screenw / screenh;
		const width = height * ratio;

		return StringMeasurer.measureStringWidthNoConvert(input) * width;
	}

}
