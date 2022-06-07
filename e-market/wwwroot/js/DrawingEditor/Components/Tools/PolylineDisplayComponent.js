class PolylineDisplayComponent extends DisplayComponent {
    constructor(target, parent) {
        const options = new DisplayComponentOptions();
        Object.assign(options, {
            altText: 'Pencil',
            classNames: 'fas fa-pencil-alt',
            childName: null
        });
        super(5 /* Polyline */, target, parent, options);
    }
}
