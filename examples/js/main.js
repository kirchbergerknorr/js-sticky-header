var $ = require('jquery');
require('../../sticky-header.js');

$(document).ready(function ($) {
    $('.sticky').sticky({
        targetElement: 'footer'
    });
});