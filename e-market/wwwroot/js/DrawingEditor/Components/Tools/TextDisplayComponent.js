class TextDisplayComponent extends DisplayComponent {
    constructor(target, parent) {
        const options = new DisplayComponentOptions();
        Object.assign(options, {
            altText: 'Text',
            classNames: 'fa fa-font',
            childName: 'textComponentInput'
        });
        super(4 /* Text */, target, parent, options);
    }
    render() {
        super.render();
        //We need to render a hidden textbox next to the text button.
        $(this.target).parent().append(`<input id="${this.childName}" class="col-sm-6 form-control hidden" />`);
    }
    //Show the textbox if the text button is selected
    selectionUpdated(newTarget) {
        $(newTarget).removeClass('hidden');
    }
    selectedChanged(componentName) {
        //If the text button is selected, show the textbox
        if (componentName === this.target) {
            $(`#${this.childName}`).removeClass('hidden');
        }
        //Otherwise, hide the textbox.
        else {
            $(`#${this.childName}`).addClass('hidden').val('');
        }
    }
}
