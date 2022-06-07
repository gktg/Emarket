//The below code (and all of DrawingEditor) was originally developed 
//by my teammate Christopher Jestice (https://www.linkedin.com/in/christopher-jestice)
//Refinements are by me, Matthew Jones (https://exceptionnotfound.net).
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrawingEditor {
    constructor(selector, canvasHeight, canvasWidth) {
        this.selector = selector;
        this.isObjectSelected = false;
        this.keyCodes = {
            'C': 67,
            'V': 86,
            'X': 88,
            'Y': 89,
            'Z': 90
        };
        $(`#${selector}`).replaceWith(`<canvas id="${selector}" height=${canvasHeight} width=${canvasWidth}> </canvas>`);
        this.cursorMode = 0 /* Draw */;
        this.canvas = new fabric.Canvas(`${selector}`, { selection: false });
        this.components = [];
        this.drawers = [
            new LineDrawer(),
            new RectangleDrawer(),
            new OvalDrawer(),
            new TriangleDrawer(),
            new TextDrawer(),
            new PolylineDrawer()
        ];
        this._drawer = this.drawers[0 /* Line */];
        this.drawerOptions = {
            stroke: 'black',
            strokeWidth: 1,
            selectable: true,
            strokeUniform: true
        };
        this.copier = new Copier(this);
        this.isDown = false;
        this.stateManager = new StateManager(this.canvas);
        this.initializeKeyCodeEvents();
        this.initializeCanvasEvents();
        document.getElementById("imageLoader").addEventListener("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;
                fabric.Image.fromURL(data, function (img) {
                    editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
                        scaleX: editor.canvas.width / img.width,
                        scaleY: editor.canvas.height / img.height
                    });
                });
            };
            reader.readAsDataURL(file);
        });
    }
    //Properties
    get drawingMode() { return this._drawer.drawingMode; }
    set drawingMode(value) { this._drawer = this.drawers[value]; }
    initializeCanvasEvents() {
        this.canvas.on('mouse:down', (o) => {
            const e = o.e;
            const pointer = this.canvas.getPointer(o.e);
            this.mouseDown(pointer.x, pointer.y);
            this.isObjectSelected = this.canvas.getActiveObject() !== null;
        });
        this.canvas.on('mouse:move', (o) => {
            const pointer = this.canvas.getPointer(o.e);
            this.mouseMove(pointer.x, pointer.y);
        });
        this.canvas.on('mouse:over', (o) => {
            if (this.isDown || this.isObjectSelected || o.target === null) {
                return;
            }
            if (o.target != null && o.target.selectable) {
                this.canvas.setActiveObject(o.target);
                this.canvas.renderAll();
            }
        });
        this.canvas.on('mouse:out', (o) => {
            if (this.isObjectSelected) {
                return;
            }
            this.canvas.discardActiveObject().renderAll();
        });
        this.canvas.on('mouse:up', (o) => {
            this.isDown = false;
            switch (this.cursorMode) {
                case 0 /* Draw */:
                    this.isObjectSelected = false;
                    this.saveState();
            }
        });
        this.canvas.on('object:selected', (o) => {
            this.cursorMode = 1 /* Select */;
            //sets currently selected object
            this.object = o.target;
            if (this.components['delete'] !== undefined) {
                this.components['delete'][0].enable();
            }
        });
        this.canvas.on('selection:cleared', (o) => {
            if (this.components['delete'] !== undefined) {
                this.components['delete'][0].disable();
            }
            this.cursorMode = 0 /* Draw */;
        });
        this.canvas.on("object:modified", (e) => {
            this.saveState();
        });
    }
    make(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._drawer.make(x, y, this.drawerOptions);
        });
    }
    mouseMove(x, y) {
        if (!(this.cursorMode.valueOf() === 0 /* Draw */.valueOf() && this.isDown)) {
            return;
        }
        this._drawer.resize(this.object, x, y);
        this.canvas.renderAll();
    }
    mouseDown(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isDown = true;
            if (this.cursorMode !== 0 /* Draw */) {
                return;
            }
            this.object = yield this.make(x, y);
            this.canvas.add(this.object);
            this.canvas.renderAll();
        });
    }
    addComponents(componentList) {
        componentList.forEach((item) => {
            this.addComponent(item.id, item.type);
        });
    }
    addComponent(target, component) {
        switch (component) {
            case 'line':
                this.components[component] = [new LineDisplayComponent(target, this)];
                break;
            case 'rect':
                this.components[component] = [new RectangleDisplayComponent(target, this)];
                break;
            case 'uploadBackGroundImage':
                this.components[component] = [new UploadBackGroundImageComponent(target, this)];
                break;
            case 'oval':
                this.components[component] = [new OvalDisplayComponent(target, this)];
                break;
            case 'tria':
                this.components[component] = [new TriangleDisplayComponent(target, this)];
                break;
            case 'text':
                this.components[component] = [new TextDisplayComponent(target, this)];
                break;
            case 'polyline':
                this.components[component] = [new PolylineDisplayComponent(target, this)];
                break;
            case 'delete':
                this.components[component] = [new DeleteComponent(target, this)];
                break;
            case 'lineColorChooser':
                this.components[component] = [
                    new ColorChooserComponent(target, this, '#000000', {
                        'change': (newColor) => {
                            this.setLineColor(newColor);
                        }
                    })
                ];
                break;
            case 'fillColorChooser':
                this.components[component] = [
                    new ColorChooserComponent(target, this, '', {
                        'change': (newColor) => {
                            this.setFillColor(newColor);
                        }
                    })
                ];
                break;
            case 'lineType':
                this.components[component] = [new LineTypeComponent(target, this)];
                break;
            case 'lineThickness':
                this.components[component] = [new LineThicknessComponent(target, this)];
                break;
            case 'undo':
                this.components[component] = [new UndoComponent(target, this)];
                break;
            case 'redo':
                this.components[component] = [new RedoComponent(target, this)];
                break;
        }
    }
    componentSelected(componentName) {
        this.canvas.discardActiveObject();
        for (var key in this.components) {
            if (!this.components.hasOwnProperty(key))
                continue;
            const obj = this.components[key];
            if (obj[0].target === componentName) {
                this.drawingMode = obj[0].drawingMode;
            }
            //Not all types have a selectedChanged event
            if (obj[0].selectedChanged !== undefined)
                obj[0].selectedChanged(componentName);
        }
    }
    deleteSelected() {
        this.canvas.remove(this.canvas.getActiveObject());
        this.canvas.renderAll();
        this.saveState();
    }
    setFillColor(color) {
        this.drawerOptions.fill = color;
    }
    setLineColor(color) {
        this.drawerOptions.stroke = color;
    }
    setStrokeWidth(strokeWidth) {
        this.drawerOptions.strokeWidth = strokeWidth;
    }
    undo() {
        this.stateManager.undo();
    }
    redo() {
        this.stateManager.redo();
    }
    openImageUpload() {
        $('#imageLoader').trigger('click');
    }
    saveState() {
        this.stateManager.saveState();
        this.canvas.renderAll();
        ShareDraw();
    }
    initializeKeyCodeEvents() {
        window.addEventListener('keydown', (event) => {
            //process Ctrl Commands
            if (event.ctrlKey) {
                switch (event.keyCode) {
                    case this.keyCodes['Z']:
                        this.undo();
                        break;
                    case this.keyCodes['Y']:
                        this.redo();
                        break;
                    case this.keyCodes['C']:
                        this.copier.copy();
                        break;
                    case this.keyCodes['X']:
                        this.copier.cut();
                        break;
                    case this.keyCodes['V']:
                        this.copier.paste();
                        break;
                }
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });
    }
    ;
    setSaveFunc(saveFunction) {
        this.saveFunc = saveFunction;
    }
    save() {
        this.saveFunc();
    }
    getJson() {
        const outP = this.canvas.toJSON();
        return outP;
    }
}
var editor;
