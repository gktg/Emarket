class RectangleDisplayComponent extends DisplayComponent {
    constructor(target, parent) {
        const options = new DisplayComponentOptions();
        Object.assign(options, {
            altText: 'Rectangle',
            classNames: 'fa fa-square',
            childName: null
        });
        super(1 /* Rectangle */, target, parent, options);
    }
}
