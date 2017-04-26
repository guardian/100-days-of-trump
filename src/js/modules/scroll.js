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
        this.setSection();
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
    },

    setSection: function() {
        $('.trump__section').each(function(i) {
            if (windowTop > $(this).offset().top - ($(this).height() / 4) - timeLineHeight) {
                $('.trump-graphic').removeClass(function(index, className) {
                    return (className.match (/(^|\s)trump-graphic--\S+/g) || []).join(' ');
                });
                $('.trump-graphic').addClass('trump-graphic--' + $(this).attr('data-handle'));
            }
        });
    }
};