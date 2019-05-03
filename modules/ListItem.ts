import { uuid } from "../utils/uuid";

export class ListItem {
	public readonly Id: string = uuid();

	public DisplayText: string;
	public Data: any;

	constructor(text: string = "", data: any = null) {
		this.DisplayText = text;
		this.Data = data;
	}
}
