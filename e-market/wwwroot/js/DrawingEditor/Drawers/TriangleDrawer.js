class TriangleDrawer {
    constructor() {
        this.drawingMode = 3 /* Triangle */;
    }
    make(x, y, options, width, height) {
        this.origX = x;
        this.origY = y;
        return new Promise(resolve => {
            resolve(new fabric.Triangle(Object.assign({ left: x, top: y, width: width, height: height, fill: 'transparent' }, options)));
        });
    }
    resize(object, x, y) {
        object.set({
            originX: this.origX > x ? 'right' : 'left',
            originY: this.origY > y ? 'bottom' : 'top',
            width: Math.abs(this.origX - x),
            height: Math.abs(this.origY - y),
        }).setCoords();
        return new Promise(resolve => {
            resolve(object);
        });
    }
}
