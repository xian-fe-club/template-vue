module.exports = {
  root: true,
  plugins: ["stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-config-prettier"
  ],
  rules: {
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"]
      }
    ],
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"]
      }
    ],
    "at-rule-name-case": "lower",
    "block-no-empty": null,
    "no-empty-source": null,
    "selector-type-no-unknown": [
      true,
      {
        // 对于未知标签添加
        ignoreTypes: []
      }
    ],
    // 配置允许stylelint开启伪元素校验 忽略掉 ::v-deep
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ],
    // 允许stylelint开启伪类校验，忽略掉 :deep
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"]
      }
    ]
  }
};
