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

        var intervalId = false;
        var isCurrentlySticky = false;
        var scrollbarPreviousVerticalPosition = 0;

        return this.each(function() {

            var $element = $(this);
            var $body = $('body');

            var targetElement = settings.targetElement || this;
            var minTop = settings.minTop || $(targetElement).offset().top;

            var stickyElementHeight = $(targetElement).height();

            $(window).scroll(function (event) {
                if (settings.minimalViewportWidth == 0 || verge.viewportW() < settings.minimalViewportWidth) {
                    var scrollbarVerticalPosition = $body.scrollTop();

                    var isSticky = false;

                    if (scrollbarVerticalPosition <= minTop
                        || settings.type == 'scroll-top' && scrollbarVerticalPosition > scrollbarPreviousVerticalPosition) {

                        // Scrolled to top or Scrolling down
                        isSticky = false;

                        if (scrollbarVerticalPosition <= minTop) {
                            // Scrolled to top
                            $body.addClass(settings.scrollTopClass);
                            $element.removeClass(settings.stickyWrapperClass);
                            $body.css('padding-top', 0);
                        } else {
                            // Scrolled not to top
                            $body.removeClass(settings.scrollTopClass);
                            $element.addClass(settings.stickyWrapperClass);
                            $body.css('padding-top', stickyElementHeight);
                        }
                    } else {

                        // Scrolling up
                        isSticky = true;
                        $element.addClass(settings.stickyWrapperClass);
                    }

                    scrollbarPreviousVerticalPosition = scrollbarVerticalPosition;

                    if (isCurrentlySticky == isSticky) {
                        return;
                    }

                    if (intervalId) {
                        clearTimeout(intervalId);
                    }

                    // todo: extract library-specific css to separate file
                    // todo: add animation to css

                    if (isSticky) {
                        intervalId = setTimeout(function () {
                            $element.addClass(settings.isStickyClass);
                        }, settings.timeout);
                    } else {
                        intervalId = setTimeout(function () {
                            $element.removeClass(settings.isStickyClass);
                        }, settings.timeout);
                    }

                    isCurrentlySticky = isSticky;
                }
            });
        });
    };
}( jQuery, verge, document));
