# js-sticky-header

Makes element sticky on scroll

## Installation for Magento Theme

Create `src/skin/frontend/your-design-package/your-theme/package.json` file.

Example of `package.json`:

```json
{
  "dependencies": {
    "js-sticky-header": "git://github.com/kirchbergerknorr/js-sticky-header.git#1.1.0"
  }
}
```

Add `main.js` file in your theme:
`src/skin/frontend/your-design-package/your-theme/js/main.js`

Content of `main.js`

```js
var $ = require('jquery');
require('js-sticky-header');

$(document).ready(function ($) {
    $('.sticky').sticky();
});
```

Add to your project [gulpfile.js](gulpfile.js), see `build` task.
  
This will install dependencies in your theme, read all dependencies from `package.json` and merge js files in `bundle-main.js`.
You have to include only `bundle-main.js` in your phtml:

```html
<script type="text/javascript" src="<?php echo $this->getSkinUrl('js/bundle-main.js') ?>"></script>
```

or add in layout: 

```xml
<layout version="0.1.0">
    <default> 
        <reference name="head">
            <!-- Created by Browserify -->
            <action method="addItem"><type>skin_js</type><name>js/bundle-main.js</name></action>
        </reference>
    </default>
</layout>    
```

## Usage

```js
$(document).ready(function ($) {
    $('.sticky').sticky();
});
```
    
**css**

Your css should contain the following lines: (you can specify the classNames in js):

```css
.your-sticky-element {
    height: 108px;
    
    -webkit-transition: top 700ms;
    -moz-transition: top 700ms;
    transition: top 700ms;
     
    width: 100%;     
}

.sticky-wrapper {
    position: fixed;
    top: -108px; 
}

.sticky-wrapper.is-sticky {
    top: 0;
}
```

Attribute `top` in `.sticky-wrapper` should be the same as `height` of your element and used for css animation.

## Configuration

```js
$('.sticky').sticky({
    type: "scroll-top",                  // trigger sticky `always` or only on `scroll-top`
    stickyOnHover: true,                 // trigger hoverClass on hover of the $element
                                         // $element remains sticky if stickyOnHover true 
    minimalViewportWidth: 0,             // at what device width trigger sticky
    timeout: 100,                        // pause before trigger sticky (iPhone bugfix)
    targetElement: '',                   // which element height use as minTop value, empty value is this element
    minTop: 0,                           // at what scroll top position trigger sticky
    isStickyClass: 'is-sticky',
    stickyWrapperClass: 'sticky-wrapper',
    scrollTopClass: 'scroll-top',
    hoverClass: 'sticky-hover' 
});
```