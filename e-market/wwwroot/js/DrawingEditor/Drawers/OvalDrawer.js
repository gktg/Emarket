class OvalDrawer {
    constructor() {
        this.drawingMode = 2 /* Oval */;
    }
    make(x, y, options, rx, ry) {
        this.origX = x;
        this.origY = y;
        return new Promise(resolve => {
            resolve(new fabric.Ellipse(Object.assign({ left: x, top: y, rx: rx, ry: ry, fill: 'transparent' }, options)));
        });
    }
    resize(object, x, y) {
        object.set({
            originX: this.origX > x ? 'right' : 'left',
            originY: this.origY > y ? 'bottom' : 'top',
            rx: Math.abs(x - object.left) / 2,
            ry: Math.abs(y - object.top) / 2
        }).setCoords();
        return new Promise(resolve => {
            resolve(object);
        });
    }
}
