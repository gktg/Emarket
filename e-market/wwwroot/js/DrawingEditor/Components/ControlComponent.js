class ControlComponent {
    constructor(selector, classNames, altText, parent, handlers) {
        this.target = selector;
        this.cssClass = classNames;
        this.hoverText = altText;
        this.canvassDrawer = parent;
        this.render();
        this.handlers = handlers;
        this.attachEvents();
    }
    attachEvents() {
        if (this.handlers['click'] != null) {
            $(this.target).click(this, () => {
                this.handlers['click']();
            });
        }
        if (this.handlers['change'] != null) {
            $(this.target).change(this, () => {
                this.handlers['change']();
            });
        }
    }
}
