import { uuid } from 'utils';

export class ListItem {
	readonly id: string = uuid();

	displayText: string;
	data: any;

	constructor(text: string = '', data: any = null) {
		this.displayText = text;
		this.data = data;
	}
}
