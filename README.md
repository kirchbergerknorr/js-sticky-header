# js-sticky-header

Makes element sticky for mobile devices

## Installation for Magento Theme

Create `src/skin/frontend/your-design-package/your-theme/package.json` file.

Example of `package.json`:

```
{
  "dependencies": {
    "js-sticky-header": "git://github.com/kirchbergerknorr/js-sticky-header.git#0.1.2"
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
  "post-update-cmd":"cd src/skin/frontend/your-design-package/your-theme/ && npm i && browserify js/main.js -o js/bundle.js"
}
```

This will install dependencies in your theme, read all dependencies from `package.json` and merge js files in `bundle.js`.
You have to include only `bundle.js` in your phtml:

```
<script type="text/javascript" src="<?php echo $this->getSkinUrl('js/bundle.js') ?>"></script>
```

## Usage

Default configuration:

    <header id="header" data-sticky>

Custom configuration:

    <header id="header"
      data-sticky='{
        "type":"scroll-top|always",
        "timeout":"100",
        "width":"767"
       }'>
