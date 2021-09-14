const common = require("../../util/common.js")
const {
  envList
} = require('../../envList.js')

Page({
  data: {
    selectedEnv: envList[0],
    showModel: 0,
    records: ''
  },

  onLoad: function (options) {
    this.setData({
      types: common.types
    })
  },

  onShow: function () {
    this.findRecords()
  },

  changeModel: function () {
    let showModel = (this.data.showModel + 1) % 2
    let arr = []
    this.data.records.forEach(item => {
      arr = arr.concat(item)
    })
    const show = common.showModel(arr, showModel)

    this.setData({
      showModel: showModel,
      records: show
    })
  },

  findRecords: function () {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'days-matter',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'findRecords'
      }
    }).then((resp) => {
      const show = common.showModel(resp.result.data, this.data.showModel)
      // console.log(groupBy)
      this.setData({
        records: show
      })
    }).catch((e) => {
      this.showModal('加载失败，攻城狮快出来')
    })
    wx.hideLoading()
  },

  showModal: function (content) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success(res) {
        wx.switchTab({
          url: '/page/mine/index'
        })
      }
    })
  },

  turnView: function (e) {
    console.log(`${e.currentTarget.dataset.index}`)
  },

  onShareAppMessage: function () {}

})