const date = require('../../../../util/date.js')

const keys = ['red-letter', 'birth', 'exam']
const values = ['纪念日', '生日', '考试']
const descs = ['描述', '姓名', '描述']
const tips = ['例如：结婚、入职', '例如：张三', '简短描述']

Page({
  data: {
    array: values,
    index: 0,
    envId: '',
    display: {
      desc: '',
      tip: ''
    },
    record: {
      type: '',
      desc: '',
      date: ''
    }
  },

  onLoad: function (options) {
    let display = this.data.display
    display.desc = descs[this.data.index]
    display.tip = tips[this.data.index]

    let record = this.data.record
    record.date = date.formatDay(new Date())

    this.setData({
      envId: options.envId,
      display,
      record
    })
  },

  changeType: function (e) {
    let display = this.data.display
    display.desc = descs[e.detail.value]
    display.tip = tips[e.detail.value]

    this.setData({
      index: e.detail.value,
      display
    })
  },

  changeDesc: function (e) {
    let record = this.data.record
    record.desc = e.detail.value

    this.setData({
      record
    })
  },

  changeDate: function (e) {
    let record = this.data.record
    record.date = e.detail.value

    this.setData({
      record
    })
  },

  addAction: function (e) {
    if (!this.validForm()) {
      return;
    }
    this.addRecord()
  },

  validForm: function () {
    if (!this.data.record.desc) {
      this.toast(`${this.data.display.desc}不能为空`)
      return false
    }

    if (this.data.record.desc.length > 10) {
      this.toast(`${this.data.display.desc}过长`)
      return false
    }
    return true
  },

  toast: function (title) {
    wx.showToast({
      title: title,
      icon: 'error',
      duration: 2000
    })
  },

  addRecord: function () {
    let record = this.data.record
    record.type = keys[this.data.index]

    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'days-matter',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'addRecord',
        data: record
      }
    }).then((resp) => {
      wx.navigateBack({})
    }).catch((e) => {
      this.toast('添加失败')
    })
    wx.hideLoading()
  }

})