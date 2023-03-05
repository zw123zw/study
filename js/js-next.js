(function (window, $) {
    console.log($('#someElemet').text());

    function faa() {
        console.log(33);
    }
    console.log(faa.name);

    console.log(fbb);
    var fbb = function () {
        console.log(311);
    }

    var fac = function facfun(num) {
        if (num <= 1) {
            return num
        } else {
            return num * facfun(num - 1)
        }
    }
    console.log(fac(5));

    console.log(window.navigator);

    console.log(document.getElementsByTagName('head')[0]);
})(window, jQuery)