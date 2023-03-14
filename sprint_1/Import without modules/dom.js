window.utils = (function () {
    const TAG = 'div';

    function createElement(tag = TAG, content) {
        const element = document.createElement(tag);
        element.textContent = content;
        return element;
    }

    return { createElement };
})();

