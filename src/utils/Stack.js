const Stack = (() => {
    let map = new WeakMap();
    let _items = [];

    class Stack {
        constructor(items = []) {
            map.set(this, []);
            _items = map.get(this);

            if (items.length > 0) items.forEach((item) => _items.push(item));
        }

        push(...items) {
            items.forEach((item) => _items.push(item));
            return this;
        }

        pop(count = 0) {
            if (count === 0) _items.pop();
            else _items.splice(-count, count);
            return this;
        }

        peek() {
            return _items[_items.length - 1];
        }

        size() {
            return _items.length;
        }

        isEmpty() {
            return _items.length == 0;
        }

        toArray() {
            return _items;
        }

        contains(expression) {
            return typeof expression === 'function' ? !!_items.find(expression) : _items.includes(expression);
        }
    }

    return Stack;
})();

export default Stack;
