window.otherUtils = (function () {
    function myOtherSuperFunc1() {
        window.utils.mySuperFunc1(); // Вызывали из file1.js
        console.log('otherUtils.myOtherSuperFunc1');
    }
    function myOtherSuperFunc2() {
        console.log('otherUtils.myOtherSuperFunc2');
    }
    
    return {
        myOtherSuperFunc1,
        myOtherSuperFunc2,
    };
})();
