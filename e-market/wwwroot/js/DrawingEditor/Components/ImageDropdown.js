class ImageDropdown {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.element = document.getElementById(this.selector);
        this.handlers = options.handlers;
        this.render();
        this.attachEvents();
    }
    render() {
        this.element.outerHTML =
            `<div id="${this.selector}" class='imageDropdown'>
                 <div style="width: ${this.options.width}px">
                    ${this.renderSelectedDiv()}
                    <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                 </div>
                 <ul class="hidden" style="width: ${this.options.childWidth || this.options.width}px">
                    ${this.renderOptions()}                    
                 </ul>
             </div>`;
    }
    renderSelectedDiv() {
        switch (this.options.selectedStyle) {
            case 1 /* Copy */:
                return `<div id="${this.selector}_selected" style="width: ${this.options.width - 20}px">${this.options.optionsList[this.options.selectedIndex].display}</div>`;
            case 0 /* Fill */:
                return `<div id="${this.selector}_selected" style="width: ${this.options.width - 20}px; height:20px; background-color: ${this.options.optionsList[this.options.selectedIndex].value}"><span></span></div>`;
        }
    }
    renderOptions() {
        let output = '';
        this.options.optionsList.map((record) => {
            switch (this.options.selectedStyle) {
                case 1 /* Copy */:
                    output += `<li class="vertical" title="${record.text}">${record.display}</li>`;
                    break;
                case 0 /* Fill */:
                    output += `<li class="horizontal" title="${record.text}">${record.display}</li>`;
                    break;
            }
        });
        return output;
    }
    attachEvents() {
        this.element = document.getElementById(this.selector);
        const container = this;
        const selectedDiv = this.element.children[0];
        const list = this.element.children[1];
        const options = [...list.children];
        selectedDiv.addEventListener('click', () => {
            if (list.classList.contains('hidden'))
                list.classList.remove('hidden');
            else
                list.classList.add('hidden');
        });
        options.forEach((element, index) => {
            element.addEventListener('click', (o) => {
                const selected = this.options.optionsList[index];
                list.classList.add('hidden');
                //Update value and display
                if (container.value != selected.value) {
                    switch (container.options.selectedStyle) {
                        case 1 /* Copy */:
                            selectedDiv.children[0].innerHTML = selected.display;
                            container.value = selected.value;
                            break;
                        case 0 /* Fill */:
                            Object.assign(selectedDiv.children[0].style, {
                                backgroundColor: selected.value
                            });
                            container.value = selected.value;
                            break;
                    }
                    if (container.handlers['change'] != null) {
                        container.handlers['change'](this.value);
                    }
                }
            });
        });
    }
}
