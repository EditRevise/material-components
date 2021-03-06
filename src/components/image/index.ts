import Component from 'vue-class-component';
import MaterialBox from '../../materialize/materialbox';
import mdLeanOverlay from '../lean-overlay';

const ESC = 27;

@Component({
    props: {
        src: {
            type: String,
            required: true,
            twoWay: false
        },
        caption: {
            type: String,
            required: false,
            "default": null,
            twoWay: false
        },
        height: {
            type: String,
            required: false,
            "default": null,
            twoWay: false
        },
        width: {
            type: String,
            required: false,
            "default": null,
            twoWay: false
        }
    },
    components: {
        mdLeanOverlay
    },
    template: require('./image.html')
})
export default class Image {
    private $els: any;

    private src: string;
    private active: boolean;
    private materialBox: MaterialBox;
    private originalSizes: any;

    data() {
        return {
            active: false
        }
    }

    compiled(){
        this.$els.img.setAttribute('src', this.src);
    }

    ready() {
        var img = this.$els.img;
        var placeholder = this.$els.placeholder;
        this.materialBox = new MaterialBox(img, placeholder);
        // Return on ESC
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === ESC) {
                this.close();
            }
        });
        window.addEventListener("scroll", () => {
            this.close();
        });
    }

    toggle() {
        if (this.active) {
            this.close()
        }
        else {
            this.maximialize();
        }
    }

    maximialize() {
        if (!this.active) {
            this.active = true;
            this.originalSizes = this.getSizes();
            this.materialBox.maximalize(this.originalSizes);
        }
    }

    close() {
        if (this.active) {
            this.active = false;
            this.materialBox.close(this.originalSizes);
        }
    }

     getSizes() {
        var el: HTMLElement = this.$els.img;
        return {
            width: el.offsetWidth,
            height: el.offsetHeight,
            left: el.offsetLeft,
            top: el.offsetTop
        }
    }
}