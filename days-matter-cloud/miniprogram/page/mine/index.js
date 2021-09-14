Page({
  data: {
    theme: 'light',
    powerList: [{
      item: [{
        title: '我的',
        page: 'pages/user/user'
      }, {
        title: '设置',
        page: 'pages/settings/settings'
      }]
    }, {
      item: [{
        title: '关于',
        page: 'pages/about/about'
      }, {
        title: '广告',
        page: 'pages/ad/ad'
      }]
    }]
  },

  onLoad: function () {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },

  jumpPage: function (e) {
    wx.navigateTo({
      url: `/page/mine/${e.currentTarget.dataset.page}`
    });
  },

  onShareAppMessage: function () {}

})