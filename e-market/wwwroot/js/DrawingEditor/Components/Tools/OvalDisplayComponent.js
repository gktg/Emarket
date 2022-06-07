class OvalDisplayComponent extends DisplayComponent {
    constructor(target, parent) {
        const options = new DisplayComponentOptions();
        Object.assign(options, {
            altText: 'Oval',
            classNames: 'fa fa-circle',
            childName: null
        });
        super(2 /* Oval */, target, parent, options);
    }
}
