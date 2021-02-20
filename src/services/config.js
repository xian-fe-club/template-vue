const {
  application: devBucket
} = require("../../ciri_config/.ciri-upload.config.js");
const {
  application: debugBucket
} = require("../../ciri_config/.ciri-upload.debug.config.js");
const {
  application: prodBucket
} = require("../../ciri_config/.ciri-upload.prod.config.js");

const production = {
  api: "",
  cdnBucket: prodBucket,
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
};

const dev = {
  api: "",
  cdnBucket: devBucket,
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
};
const test = {
  api: "6",
  cdnBucket: debugBucket, // 公用测试bucket
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
};
module.exports = (env => {
  let config;
  switch (env) {
    case "development": {
      config = dev;
      break;
    }
    case "test": {
      config = test;
      break;
    }
    case "debug": {
      config = production;
      break;
    }
    case "production": {
      config = production;
      break;
    }
    default: {
      config = dev;
      break;
    }
  }
  return config;
})(process.env.VUE_APP_ENV);
