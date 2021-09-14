const common = require('../../../../util/common.js')
const {
  envList
} = require('../../../../envList.js')

Page({
  data: {
    selectedEnv: envList[0],
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

  addAction: function () {
    wx.navigateTo({
      url: `../form/form?envId=${this.data.selectedEnv.envId}`
    })
  },

  clearAction: function (e) {
    var that = this
    const type = `${e.currentTarget.dataset.type}`
    const desc = `${e.currentTarget.dataset.desc}`
    wx.showModal({
      title: '提示',
      content: '确定清除所有' + desc + '？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          that.clearRecords(type)
        }
      }
    })
  },

  removeAction: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['删除'],
      success(res) {
        that.removeRecord(`${e.currentTarget.dataset.id}`)
      }
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
      const groupBy = common.groupBy(resp.result.data)
      this.setData({
        records: groupBy
      })
    }).catch((e) => {
      this.showModal('加载失败，攻城狮快出来')
    })
    wx.hideLoading()
  },

  clearRecords: function (type) {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'days-matter',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'clearRecords',
        dtype: type
      }
    }).then((resp) => {
      this.findRecords()
    }).catch((e) => {
      this.showModal('加载失败，攻城狮快出来')
    })
  },

  removeRecord: function (id) {
    wx.cloud.callFunction({
      name: 'days-matter',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'removeRecord',
        id: id
      }
    }).then((resp) => {
      this.findRecords()
    }).catch((e) => {})
  },

  showModal: function (content) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success(res) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },

  onShareAppMessage: function () {}

})