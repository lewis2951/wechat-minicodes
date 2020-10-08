require('./libs/mixin/Mixins.js');

const util = require('./utils/util');
const themeListeners = [];
const today = new Date();

App({
    globalData: {
        theme: 'light', // dark | light
    },
    themeChanged(theme) {
        this.globalData.theme = theme;
        themeListeners.forEach((listener) => {
            listener(theme);
        });
    },
    watchThemeChange(listener) {
        if (themeListeners.indexOf(listener) < 0) {
            themeListeners.push(listener);
        }
    },
    unWatchThemeChange(listener) {
        const index = themeListeners.indexOf(listener);
        if (index > -1) {
            themeListeners.splice(index, 1);
        }
    },
    onLaunch: function () {
        // 展示本地存储能力
        var list = wx.getStorageSync('list') || [];
        wx.setStorageSync('list', list)
    },
    globalData: {
        today: util.formatTime(today),
        list: wx.getStorageSync('list')
    }
});