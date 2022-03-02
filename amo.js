const shrink = 0.996;
function Amo(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.element;
    this.w = w;
    this.h = h;

    this.setElement = function(element) {
        this.element = element;
        this.element.style.transform = "translateY(" + this.y + "px)";
    }
    this.update = function() {
        this.w = this.w*shrink;
        this.h = this.h*shrink;
        this.element.style.width = this.w + "px";
        this.element.style.height = this.h + "px";
    }
    this.getX = function() {
        return this.x - this.w/2;
    }
    this.getY = function() {
        return this.y - this.h/2;
    }
    this.remove = function() {
        var out = false;
        if (this.w < 5 || this.h < 5) {
            out = true;
        }
        return out;
    }
}