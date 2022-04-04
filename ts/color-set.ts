export class ColorSet {
	public mainColor: string;
	public secondaryColor: string;
	public interactiveColor: string;

	public constructor(mainColor: string, secondaryColor: string, interactiveColor: string) {
		this.mainColor = mainColor;
		this.secondaryColor = secondaryColor;
		this.interactiveColor = interactiveColor;
	}
}

export const colorSets: Map<string, ColorSet> = new Map<string, ColorSet>([
	['red', new ColorSet('red', 'green', 'blue')],
	['green', new ColorSet('green', 'blue', 'red')],
	['blue', new ColorSet('blue', 'green', 'red')],
]);
