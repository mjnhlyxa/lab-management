class Stack {
    constructor(items = []) {
        this._items = [];
        if (items.length > 0) items.forEach((item) => this._items.push(item));
    }

    push(...items) {
        items.forEach((item) => this._items.push(item));
        return this;
    }

    pop(count = 0) {
        if (count === 0) this._items.pop();
        else this._items.splice(-count, count);
        return this;
    }

    peek() {
        return this._items[this._items.length - 1];
    }

    size() {
        return this._items.length;
    }

    isEmpty() {
        return this._items.length == 0;
    }

    toArray() {
        return this._items;
    }

    contains(expression) {
        return typeof expression === 'function' ? !!this._items.find(expression) : this._items.includes(expression);
    }
}
export default Stack;
