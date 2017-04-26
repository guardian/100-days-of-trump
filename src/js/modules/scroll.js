var $ = require('../vendor/jquery.js');

var windowTop,
    windowHeight,
    timeLinePos,
    timeLineHeight;

module.exports =  {
    init: function() {
        this.bindings();
        this.setValues();
        this.onScroll();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.setValues();
            this.onScroll();
        }.bind(this));
    },

    onScroll: function() {
        windowTop  = window.pageYOffset || document.documentElement.scrollTop;
        this.fixTimeline();
    },

    setValues: function() {
        windowTop  = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height()
        $('.trump-graphic').removeClass('is-sticky');
        timeLinePos = $('.trump-graphic').offset().top;
        timeLineHeight = $('.trump-graphic').height();
    },

    fixTimeline: function() {
        if (timeLinePos + timeLineHeight > windowTop + windowHeight) {
            $('.trump-graphic').removeClass('is-sticky');
        } else {
            $('.trump-graphic').addClass('is-sticky');
        }
    }
};