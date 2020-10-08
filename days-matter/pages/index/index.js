const util = require('../../utils/util');
//获取应用实例
const app = getApp();

Page({
  mixins: [require('../../libs/mixin/themeChanged')],
  data: {
    list: [],
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }]
  },
  onLoad: function () {
    this.setData({
      today: app.globalData.today,
      list: app.globalData.list
    });
  },
  onShow: function () {
    var list = this.data.list;
    list.forEach(item => {
      item.days = util.days(this.data.today, item.date);
    });

    this.setData({
      list: list
    });
  },
  add: function () {
    wx.navigateTo({
      url: '../form/form',
    })
  },
  slideButtonTap: function (e) {
    app.globalData.list.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      list: app.globalData.list
    });
    wx.setStorageSync('list', app.globalData.list);
  },
  changeTheme: function () {
    app.themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
  }
});