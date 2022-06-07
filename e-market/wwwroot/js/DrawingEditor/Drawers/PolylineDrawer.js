class PolylineDrawer {
    constructor() {
        this.drawingMode = 5 /* Polyline */;
    }
    make(x, y, options, rx, ry) {
        return new Promise(resolve => {
            resolve(new fabric.Polyline([{ x, y }], Object.assign(Object.assign({}, options), { fill: 'transparent' })));
        });
    }
    resize(object, x, y) {
        object.points.push(new fabric.Point(x, y));
        const dim = object._calcDimensions();
        object.set({
            left: dim.left,
            top: dim.top,
            width: dim.width,
            height: dim.height,
            dirty: true,
            pathOffset: new fabric.Point(dim.left + dim.width / 2, dim.top + dim.height / 2)
        }).setCoords();
        return new Promise(resolve => {
            resolve(object);
        });
    }
}
