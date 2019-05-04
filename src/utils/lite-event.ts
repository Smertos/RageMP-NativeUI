type EventHandler = { (...args: any[]): void };

export interface ILiteEvent {
	on(handler: EventHandler): void;
	off(handler: EventHandler): void;
}

export class LiteEvent implements ILiteEvent {
	private handlers: EventHandler[] = [];

	on(handler: EventHandler): void {
		this.handlers.push(handler);
	}

	off(handler: EventHandler): void {
		this.handlers = this.handlers.filter(h => h !== handler);
	}

	emit(...args: any[]) {
		this.handlers.slice(0).forEach(h => h(...args));
	}

	expose(): ILiteEvent {
		return this;
	}
}
