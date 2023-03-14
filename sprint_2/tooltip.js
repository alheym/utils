// Tooltip
// При наведении на текст покажите подсказку с сообщением из атрибута data-tooltip:


(function () {

    class Tooltip {
        constructor() {
            this.el = document.createElement('div');
            this.el.style.position = 'absolute';

            this.el.classList.add(this.name);
            document.body.appendChild(this.el);

            this.onHide = this.onHide.bind(this);
        }

        get name() {
            return 'tooltip';
        }

        get indent() {
            return 5;
        }

        delegate(eventName, element, cssSelector, callback) {
            const fn = event => {
                if (!event.target.matches(cssSelector)) {
                    return;
                }

                callback(event);
            };

            element.addEventListener(eventName, fn);

            return this;
        }

        onShow = (event) => {
            let target = event.target;

            let tooltipHtml = target.dataset.tooltip;

            this.el.innerHTML = tooltipHtml;

            this.el.classList.add('tooltip_active');

            let coords = target.getBoundingClientRect();

            let top = coords.top - this.el.offsetHeight - 5;
            if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
                top = coords.top + target.offsetHeight + 5;
            }

            this.el.style.top = top + 'px';
        }

        onHide() {
            this.el.classList.remove('tooltip_active');
        }

        attach(root) {
            this
                .delegate('mouseover', root, '[data-tooltip]', this.onShow)
                .delegate('mouseout', root, '[data-tooltip]', this.onHide);
        }

        detach() {
        }
    }

    window.Tooltip = Tooltip;
})();

const tooltip = new Tooltip();
tooltip.attach(document.body);
