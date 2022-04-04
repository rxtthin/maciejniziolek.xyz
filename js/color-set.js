export class ColorSet {
    constructor(mainColor, secondaryColor, interactiveColor) {
        this.mainColor = mainColor;
        this.secondaryColor = secondaryColor;
        this.interactiveColor = interactiveColor;
    }
}
export const colorSets = new Map([
    ['red', new ColorSet('red', 'green', 'blue')],
    ['green', new ColorSet('green', 'blue', 'red')],
    ['blue', new ColorSet('blue', 'green', 'red')],
]);
