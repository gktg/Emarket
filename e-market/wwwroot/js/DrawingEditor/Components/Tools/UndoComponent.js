class UndoComponent extends ControlComponent {
    constructor(target, parent) {
        super(target, //Selector
        "fa fa-undo", //Icon CSS Classes
        "Undo", //Tooltip
        parent, {
            'click': () => { parent.undo(); }
        });
    }
    render() {
        const html = `<button id="${this.target.replace('#', '')}" title="${this.hoverText}" class="btn btn-info">
                        <i class="${this.cssClass}"></i>
                     </button>`;
        $(this.target).replaceWith(html);
    }
}
class UploadBackGroundImageComponent extends ControlComponent {
    constructor(target, parent) {
        super(target, //Selector
        "fa fa-image", //Icon CSS Classes
        "uploadBackGroundImage", //Tooltip
        parent, {
            'click': () => { parent.openImageUpload(); }
        });
    }
    render() {
        const html = `<button id="${this.target.replace('#', '')}" title="${this.hoverText}" class="btn btn-info">
                        <i class="${this.cssClass}"></i>
                     </button>`;
        $(this.target).replaceWith(html);
    }
}
