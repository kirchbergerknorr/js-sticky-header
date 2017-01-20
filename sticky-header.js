var verge = require('verge');
var jQuery = require('jquery');

;(function ($) {
    $.fn.sticky = function( options ) {

        var settings = $.extend({
            type: "scroll-top",
            minimalViewportWidth: 0,
            timeout: 100,
            targetElement: '',
            minTop: 0,
            isStickyClass: 'is-sticky',
            stickyWrapperClass: 'sticky-wrapper',
            scrollTopClass: 'scroll-top'
        }, options );

        return this.each(function() {

            var intervalId = false;
            var isCurrentlySticky = false;
            var scrollbarPreviousVerticalPosition = 0;

            var $element = $(this);
            var $body = $('body');

            var targetElement = settings.targetElement || this;
            
            var stickyElementHeight = $(targetElement).height()
                + parseInt($(targetElement).css('margin-bottom').replace('px', ''))
                + parseInt($(targetElement).css('margin-top').replace('px', ''));

            var minTop = settings.minTop;
            if (!minTop) {
                if (settings.type == 'scroll-top') {
                    minTop = $(targetElement).offset().top + stickyElementHeight;
                } else {
                    minTop = $(targetElement).offset().top;
                }
            }

            $(window).scroll(function (event) {
                if (settings.minimalViewportWidth == 0 || verge.viewportW() < settings.minimalViewportWidth) {
                    var scrollbarVerticalPosition = $body.scrollTop();

                    var isSticky = false;
                    var isScrollingDown = scrollbarVerticalPosition > scrollbarPreviousVerticalPosition;
                    var isVisible = scrollbarVerticalPosition <= minTop;

                    if (isVisible) {
                        isSticky = false;
                    } else if (isScrollingDown) {
                        isSticky = (settings.type == 'always');
                    } else {
                        isSticky = true;
                    }

                    scrollbarPreviousVerticalPosition = scrollbarVerticalPosition;

                    if (isCurrentlySticky == isSticky) {
                        return;
                    }

                    if (intervalId) {
                        clearTimeout(intervalId);
                    }

                    if (isSticky) {
                        intervalId = setTimeout(function () {
                            $element.addClass(settings.isStickyClass);
                            $element.addClass(settings.stickyWrapperClass);
                            $body.removeClass(settings.scrollTopClass);
                            $body.css('padding-top', stickyElementHeight);
                        }, settings.timeout);
                    } else {
                        intervalId = setTimeout(function () {
                            $element.removeClass(settings.isStickyClass);
                            $element.removeClass(settings.stickyWrapperClass);
                            $body.addClass(settings.scrollTopClass);
                            $body.css('padding-top', 0);
                        }, settings.timeout);
                    }

                    isCurrentlySticky = isSticky;
                }
            });
        });
    };
}( jQuery, verge, document));
