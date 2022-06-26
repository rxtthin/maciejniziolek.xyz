export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    GetLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Normalized() {
        let len = this.GetLength();
        let result = new Vector2(0, 0);
        if (len != 0) {
            result.x /= len;
            result.y /= len;
        }
        else {
            result.x = 0;
            result.y = 0;
        }
        return result;
    }
}
