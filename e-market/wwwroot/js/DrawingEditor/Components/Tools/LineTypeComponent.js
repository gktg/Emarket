class LineTypeComponent {
    constructor(target, parent) {
        this.target = target;
        this.parent = parent;
        this.render();
    }
    render() {
        var opt = new ImageDropdownOptions();
        Object.assign(opt, {
            selectedStyle: 1 /* Copy */,
            selectedIndex: 0,
            width: 50,
            optionsList: [
                {
                    display: '<svg width="50px" height="10px" viewBox="0 0 50 10"><line x1="1" y1="1" x2="50" y2="1" stroke="black" stroke-width="3px" /></svg>',
                    value: 'solid',
                    text: 'Solid'
                },
                {
                    display: '<svg width="50px" height="10px" viewBox="0 0 50 10"><line x1="3" y1="1" x2="50" y2="1" stroke="black" stroke-linecap="round" stroke-width="3px" stroke-dasharray="1 6" /></svg>',
                    value: 'dotted',
                    text: 'Dotted'
                },
                {
                    display: '<svg width="50px" height="10px" viewBox="0 0 50 10"><line x1="3" y1="1" x2="50" y2="1" stroke="black" stroke-width="3px" stroke-dasharray="6 6" /></svg>',
                    value: 'dashed',
                    text: 'Dashed'
                }
            ],
            handlers: {
                'change': (lineType) => {
                    this.selectedType = lineType;
                    this.update();
                }
            }
        });
        new ImageDropdown(this.target, opt);
    }
    update() {
        switch (this.selectedType) {
            case 'solid':
                delete this.parent.drawerOptions.strokeLineCap;
                delete this.parent.drawerOptions.strokeDashArray;
                break;
            case 'dotted':
                this.parent.drawerOptions.strokeLineCap = 'round';
                this.parent.drawerOptions.strokeDashArray = [1, this.parent.drawerOptions.strokeWidth * 2];
                break;
            case 'dashed':
                delete this.parent.drawerOptions.strokeLineCap;
                this.parent.drawerOptions.strokeDashArray = [this.parent.drawerOptions.strokeWidth * 2, this.parent.drawerOptions.strokeWidth * 1.5];
                break;
        }
    }
}
