export class Color {
	static Empty: Color = new Color(0, 0, 0, 0);
	static Transparent: Color = new Color(0, 0, 0, 0);
	static Black: Color = new Color(0, 0, 0, 255);
	static White: Color = new Color(255, 255, 255, 255);
	static WhiteSmoke: Color = new Color(245, 245, 245, 255);

	R: number;
	G: number;
	B: number;
	A: number;
	
	constructor(r: number, g: number, b: number, a: number = 255) {
		this.R = r;
		this.G = g;
		this.B = b;
		this.A = a;
	}

}
