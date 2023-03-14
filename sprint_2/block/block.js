// Собственный блок
// Используя Event Bus, proxy-объекты и теорию данного курса, реализуйте базовый класс для работы с блоком. 
// Блок должен:
// Содержать жизненный цикл на основе Event Bus с методами:

// init — создание обёртки DOM-элемента и вызов CDM. Название события: init,
// componentDidMount — эмитится через метод dispatchComponentDidMount снаружи блока. Название события: flow:component-did-mount,
// componentDidUpdate — эмитится через Event Bus после изменения пропсов блока. Если пропсы не поменялись, перерендер не нужен, если явно не переопределён в классе блока такой метод. Метод должен вернуть значение boolean. Если true — компоненту нужно перерендерить, если false — не нужно. Название события: flow:component-did-update,
// render — получение уже готовой разметки со всеми значениями. Всегда делается рендер строки. Название события: flow:render. В первый раз должен быть вызван после init, затем после обновлений.
// Предоставлять методы, показывающие и скрывающие блок:

// show — делает значение display равным block,
// hide — делает значение display равным none.
// Создавать «обёртку» с указанным тегом в конструкторе.
// Перерисовываться при изменении пропсов через Proxy.
// Выкидывать ошибку «нет доступа» при попытке удалить свойства в props блока.


class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: 'flow:component-did-update',
    };

    _element = null;
    _meta = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        console.log('this._meta', this._meta)
        this.props = this._makePropsProxy(props);
        // Запускаем жизненый цикл
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        // 1. Срабатывает первое событие
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        // 2. Регистрируется "init" событие и запускается метот this.init
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        // 5. Регистрируется "flow:component-did-mount" событие и запускается метот this._componentDidMount
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        // 8. Регистрируется "flow:render" событие и запускается метот this._render
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        // 11. Регистрируется "flow:component-did-update" событие и запускается метот this._componentDidUpdate
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        // 4. Выцыпляется тэг в константу и присваевается метот создания эл-та this._element
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        // 3. Запускается метод _createResources
        // ? и создаем событие "flow:component-did-mount"
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    // 6. Запускаем метод _componentDidMount
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // 7. Ничего не происходит. Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) { }

    dispatchComponentDidMoun() { }
    // 12. Проверяем на равенство старых и новых пропсов если не равны
    _componentDidUpdate(oldProps, newProps) {
        if (newProps !== oldProps) {
            const response = this.componentDidUpdate(oldProps, newProps);
            if (response) {
                // Переопределим событие отрисовки flow:render
                this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
            }
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    // 2.1 Новая точка входа. Получаем новые пропсы.
    setProps = nextProps => {
        if (!nextProps) {
            return;
        }
        // Забираем старые пропсы
        const oldProps = this.props;
        // Заменяем пропсы на новые с помощбю вызыва метода this._makePropsProxy и передаем объект с новыми пропсами.
        this.props = this._makePropsProxy(Object.assign(this._meta.props, nextProps));
        // Вызываем событие flow:component-did-mount и передаем старые и новые пропсы.
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
    };

    get element() {
        return this._element;
    }
    // 9. Запускаем метод render() и вставляем эл-т в dom
    _render() {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }

    // 10. Ничего не происходит. Может переопределять пользователь, необязательно трогать
    render() { }

    getContent() {
        return this.element;
    }
    // 2.2 Создаем прокси
    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        // Перерисовываться при изменении пропсов через `Proxy`.
        // Выкидывать ошибку «нет доступа» при попытке удалить свойства в `props` блока
        props = new Proxy(props, {
            deleteProperty(target, prop) {
                throw new Error('нет доступа');
            },
        });
        return props;

    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this._element.style.display = "block";
    }

    hide() {
        this._element.style.display = "none";
    }
}

