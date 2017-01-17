var verge = require('verge');
var jQuery = require('jquery');

;(function($, verge, document) {
    // todo: convert to jQuery plugin
    
    var scrollbarPreviousVerticalPosition;

    var stickyType = "scroll-top";
    var stickyTimer = false;
    var isCurrentlySticky = true;
    var minimalStickyViewportWidth = 0;
    var stickyTimeout = 100;
    var stickyElementHeight = 0;
    var stickyMinTop = 0;

    /**
     * Make the element sticky
     *
     * @param {jQuery} $element
     * @param {jQuery} $body
     * @param {boolean} isSticky
     */
    function makeSticky($element, $body, isSticky) {
        if (isCurrentlySticky == isSticky) {
            return;
        }

        if (stickyTimer) {
            clearTimeout(stickyTimer);
        }

        // todo: extract library-specific css to separate file
        // todo: add animation to css

        if (isSticky) {
            stickyTimer = setTimeout(function () {
                $element.addClass("is-sticky");
                $body.css('padding-top', stickyElementHeight);
            }, stickyTimeout);
        } else {
            stickyTimer = setTimeout(function () {
                $body.css('padding-top', 0);
                $element.removeClass("is-sticky");
            }, stickyTimeout);
        }

        isCurrentlySticky = isSticky;
    }

    $(document).ready(function ($) {
        // todo: make it work with multiple elements
        var $stickyElement = $("[data-sticky]"),
            $body = $('body');
        
        $stickyElement.addClass("sticky-wrapper");
        
        stickyElementHeight = $stickyElement.height();

        var stickyTargetVal = $stickyElement.data('sticky').target;
        if (stickyTargetVal) {
            stickyElementHeight = $(stickyTargetVal).height();
        }

        var stickyMinTopVal = $stickyElement.data('sticky').minTop;
        if (stickyMinTopVal) {
            stickyMinTop = stickyMinTopVal;
        } else {
            stickyMinTop = stickyElementHeight;
        }

        var stickyTypeVal = $stickyElement.data('sticky').type;
        if (stickyTypeVal) {
            stickyType = stickyTypeVal;
        }

        var stickyTimeoutVal = $stickyElement.data('sticky').timeout;
        if (stickyTimeoutVal) {
            stickyTimeout = stickyTimeoutVal;
        }

        var minimalStickyViewportWidthVal = $stickyElement.data('sticky').width;
        if (typeof minimalStickyViewportWidthVal == 'integer') {
            minimalStickyViewportWidth = minimalStickyViewportWidthVal;
        }

        $(window).scroll(function (event) {
            if (minimalStickyViewportWidth == 0 || verge.viewportW() < minimalStickyViewportWidth) {
                var scrollbarVerticalPosition = $(this).scrollTop();

                if (scrollbarVerticalPosition <= stickyMinTop
                    || stickyType == 'scroll-top' && scrollbarVerticalPosition > scrollbarPreviousVerticalPosition) {
                    // Scrolled to top or Scrolling down
                    makeSticky($stickyElement, $body, false);

                    if (scrollbarVerticalPosition <= stickyElementHeight) {
                        $body.addClass('sticky-top');
                    } else {
                        $body.removeClass('sticky-top');
                    }
                } else {
                    // Scrolling up
                    makeSticky($stickyElement, $body, true);
                }
                scrollbarPreviousVerticalPosition = scrollbarVerticalPosition;
            }
        });
    })
}(jQuery, verge, document));
