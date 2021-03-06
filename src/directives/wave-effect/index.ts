import {DirectiveOption} from 'vue-class-component';
import Effect from '../../materialize/effect';

var waveEffect: DirectiveOption = {

    bind: function() {
        this.hide = (e) => {
            Effect.hide(e, this.el);
        };
        this.show = (e) => {
            Effect.show(e, this.el);
        };

        this.el.addEventListener("mousedown", this.show, false);
        this.el.addEventListener("mouseleave", this.hide, false);
        this.el.addEventListener("mouseup", this.hide, false);
    },

    unbind: function() {
        this.el.removeEventListener("mousedown", this.show);
        this.el.removeEventListener("mouseleave", this.hide);
        this.el.removeEventListener("mouseup", this.hide);
    },
    
};

export default waveEffect;