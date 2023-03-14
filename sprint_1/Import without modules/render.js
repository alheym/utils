window.otherUtils = (function () {
    const TAG = 'p';

    function renderDOM(selector, content) {
        const root = document.querySelector(selector);

        if (!root) {
            return;
        }

        const element = window.utils.createElement(TAG, content); // createElement из файла dom.js

        root.appendChild(element);
    }

    return { renderDOM };
})();
