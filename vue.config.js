// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/styles/mixins/index";
                              @import "~@/styles/varible/index";
                             `
            }
        }
    }
};
