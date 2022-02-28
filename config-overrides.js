const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#8AC23B",
      "@second-color": "#0D6FB7",
      "@white": "#ffffff",
      "@light-blue": "#F4FAFD",
      "@font-family": '"Poppins", sans-serif',
      "@font-size-base": "14px",
      "@font-size-sm": "0.928em",
      "@text-color": "#707070",
      "@border-radius-base": "4px",
      "@border-color-base": "#1118271A",

      "@layout-body-background": "#EBEEF3",
      "@layout-header-background": "#Ffffff",
      "@layout-footer-background": "@layout-body-background",
      "@layout-sider-background": "@light-blue",

      "@heading-6-size": "14rem / @font-size-base",
      "@heading-5-size": "18rem / @font-size-base",
      "@heading-4-size": "22rem / @font-size-base",
      "@heading-3-size": "26rem / @font-size-base",
      "@heading-2-size": "30rem / @font-size-base",
      "@heading-1-size": "34rem / @font-size-base",
      "@heading-color": "@text-color",

      "@menu-bg": "@light-blue",
      "@menu-item-color": "@second-color",
      "@menu-highlight-color": "@white",
      "@menu-item-active-bg": "@second-color",
      "@menu-item-height": "3.57rem",
      "@menu-icon-size": "20px",

      "@input-height-base": "40px",
      "@breadcrumb-base-color": "@text-color",
      "@breadcrumb-last-item-color": "@text-color",
      "@breadcrumb-font-size": "0.858em",
      "@btn-default-color": "@primary-color",
      "@btn-default-border": "@primary-color",
      "@tabs-highlight-color": "@text-color",
      "@tabs-horizontal-padding": "0.7143rem 1.143rem",
      "@tabs-title-font-size": "1.2857em",

      "@table-header-bg": "@second-color",
      "@table-header-color": "@text-color",
      "@table-padding-vertical": "0.7143rem",
    },
  })
);
