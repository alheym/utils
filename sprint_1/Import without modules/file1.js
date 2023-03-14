window.utils = (function () {
    // Здесь суперреализации функций, которые хочется переиспользовать в проекте

    function mySuperFunc1() {
        console.log('utils.mySuperFunc1');
    }

    function mySuperFunc2() {
        console.log('utils.mySuperFunc2');
    }

    return {
        mySuperFunc1,
        mySuperFunc2,
    };
})();
