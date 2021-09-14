Page({
  data: {
    imageSrc: 'cloud://days-matter-5gnsu5w3973c21e2.6461-days-matter-5gnsu5w3973c21e2-1303204640/code.png',
    cname: '倒数日',
    ename: 'Days Matter',
    copyright: '@2020-2021',
    auth: 'lewis2951'
  },

  onLoad: function (options) {
    const info = wx.getAccountInfoSync();
    this.setData({
      version: info.miniProgram.version,
      appId: info.miniProgram.appId
    })
  },

  onShareAppMessage: function () {}

})