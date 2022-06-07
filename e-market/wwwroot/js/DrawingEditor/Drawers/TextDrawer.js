class TextDrawer {
    constructor() {
        this.drawingMode = 4 /* Text */;
    }
    make(x, y, options) {
        const text = document.getElementById('textComponentInput');
        return new Promise(resolve => {
            resolve(new fabric.Text(text.value, Object.assign({ left: x, top: y }, options)));
        });
    }
    resize(object, x, y) {
        object.set({
            left: x,
            top: y
        }).setCoords();
        return new Promise(resolve => {
            resolve(object);
        });
    }
}
