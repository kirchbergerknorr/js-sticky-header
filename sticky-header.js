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
            var isCurrentlySticky = null;
            var isCurrentlyVisible = null;
            var scrollbarPreviousVerticalPosition = 0;

            var $element = $(this);
            var $body = $('body');

            var targetElement = settings.targetElement || this;
            
            var stickyElementHeight = $(targetElement).height()
                + parseInt($(targetElement).css('margin-bottom').replace('px', ''))
                + parseInt($(targetElement).css('margin-top').replace('px', ''));

            var minTop = settings.minTop || $(targetElement).offset().top;

            $(window).scroll(function (event) {
                if (settings.minimalViewportWidth == 0 || verge.viewportW() < settings.minimalViewportWidth) {
                    var scrollbarVerticalPosition = $body.scrollTop();

                    var isSticky = false;
                    var isScrollingDown = scrollbarVerticalPosition > scrollbarPreviousVerticalPosition;
                    var isVisible = scrollbarVerticalPosition <= minTop;
                    var isVisibleSticky = scrollbarVerticalPosition <= minTop + stickyElementHeight;

                    if (isVisible) {
                        isSticky = false;
                    } else if (isScrollingDown) {
                        isSticky = (settings.type == 'always') || isVisibleSticky;
                    } else {
                        isSticky = true;
                    }

                    scrollbarPreviousVerticalPosition = scrollbarVerticalPosition;

                    if (isCurrentlySticky == isSticky && isCurrentlyVisible == isVisible) {
                        return;
                    }

                    if (intervalId) {
                        clearTimeout(intervalId);
                    }

                    intervalId = setTimeout(function () {
                        if (isSticky) {
                            $element.addClass(settings.isStickyClass);
                        } else {
                            $element.removeClass(settings.isStickyClass);
                        }

                        if (isVisible) {
                            $body.addClass(settings.scrollTopClass);
                            $body.css('padding-top', 0);
                            $element.removeClass(settings.stickyWrapperClass);
                        } else {
                            $body.removeClass(settings.scrollTopClass);
                            $body.css('padding-top', stickyElementHeight);
                            $element.addClass(settings.stickyWrapperClass);
                        }
                    }, settings.timeout);

                    isCurrentlySticky = isSticky;
                    isCurrentlyVisible = isVisible;
                }
            });
        });
    };
}( jQuery, verge, document));
