var verge = require('verge');
var jQuery = require('jquery');

;(function($, verge, document) {

    // todo: extract to separate magento module

    // todo: idea: make configurable in backend instead of html markup,
    //             so you can define element id in backend

    var scrollbarPreviousVerticalPosition;

    var stickyType = "scroll-top";
    var stickyTimer = false;
    var isCurrentlySticky = true;
    var minimalStickyViewportWidth = 0;
    var stickyTimeout = 100;

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
                $body.addClass("sticky-header");
            }, stickyTimeout);
        } else {
            stickyTimer = setTimeout(function () {
                $element.removeClass("is-sticky");
                $body.removeClass("sticky-header");
            }, stickyTimeout);
        }

        isCurrentlySticky = isSticky;
    }

    $(document).ready(function ($) {
        var $stickyElement = $("[data-sticky]"),
            $body = $('body'),
            stickyElementHeight = $stickyElement.height();

        var stickyTargetVal = $stickyElement.data('sticky').target;
        if (stickyTargetVal) {
            stickyElementHeight = $(stickyTargetVal).height();
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

                if (scrollbarVerticalPosition <= stickyElementHeight
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
