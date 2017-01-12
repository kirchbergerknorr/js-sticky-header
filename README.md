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

Add to your project `composer.json`:

```
"scripts": {
  "post-update-cmd":"cd src/skin/frontend/your-design-package/your-theme/ && npm i"
}
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
