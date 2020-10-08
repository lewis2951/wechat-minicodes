const util = require('../../utils/util');
//获取应用实例
const app = getApp();

Page({
  mixins: [require('../../libs/mixin/themeChanged')],
  data: {
    error: ''
  },
  onLoad: function () {
    this.setData({
      date: app.globalData.today
    });
  },
  formInputChange: function (e) {
    this.setData({
      desc: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  validate: function () {
    if (!this.data.desc) {
      this.setData({
        error: '请输入目标描述'
      });
      return false;
    }
    var len = this.data.desc.length;
    if (len > 10) {
      this.setData({
        error: '目标描述简短一点，10个字以内'
      });
      return false;
    }
    return true;
  },
  submitForm: function (e) {
    var valid = this.validate();
    if (valid) {
      app.globalData.list.unshift({
        desc: this.data.desc,
        date: this.data.date
      });
      wx.setStorageSync('list', app.globalData.list);

      wx.navigateBack({
        delta: 1,
      });
    }
  }
});