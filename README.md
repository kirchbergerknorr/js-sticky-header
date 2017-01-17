# js-sticky-header

Makes element sticky for mobile devices

## Installation for Magento Theme

Create `src/skin/frontend/your-design-package/your-theme/package.json` file.

Example of `package.json`:

```
{
  "dependencies": {
    "js-sticky-header": "git://github.com/kirchbergerknorr/js-sticky-header.git#0.1.3"
  }
}
```

Add `main.js` file in your theme:
`src/skin/frontend/your-design-package/your-theme/js/main.js`

Content of `main.js`
```
var stickyHeader = require('js-sticky-header');
```

Add to your project `composer.json`:

```
"scripts": {
  "post-update-cmd":"cd src/skin/frontend/your-design-package/your-theme/ && npm i && browserify js/main.js -o js/bundle-main.js"
}
```

This will install dependencies in your theme, read all dependencies from `package.json` and merge js files in `bundle-main.js`.
You have to include only `bundle-main.js` in your phtml:

```
<script type="text/javascript" src="<?php echo $this->getSkinUrl('js/bundle-main.js') ?>"></script>
```

## Usage

Default configuration:

    <header id="header" data-sticky>

Custom configuration:

    <header id="header"
      data-sticky='{
        "type":"scroll-top|always",
        "timeout":"100",
        "width":"0",
        "target":"",
        "minTop":"0"
       }'>

## Configuration

- `type` - trigger sticky `always` or only on `scroll-top`
- `timeout` - pause before trigger sticky (bugfix)
- `width` - at what device width trigger sticky
- `minTop` - at what scroll top position trigger sticky
- `target` - which element height use as minTop value, empty value is this element
