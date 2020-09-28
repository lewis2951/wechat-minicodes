const util = require('../../utils/util');

const today = new Date();

Page({
  mixins: [require('../../libs/mixin/themeChanged')],
  data: {
    list: [
      {
        desc: "今天（测试）",
        date: util.formatTime(today)
      }, {
        desc: "12月PMP考试",
        date: "2020-12-05"
      }, {
        desc: "2020年底",
        date: "2020-12-31"
      }, {
        desc: "2021年除夕",
        date: "2021-02-11"
      }
    ]
  },
  onReady: function () {
    var list = this.data.list;
    list.forEach(item => {
      item.days = util.days(today, item.date);
    });

    this.setData({
      today: util.formatTime(today),
      list: list
    });
  },
  // kindToggle: function (e) {
  //   var id = e.currentTarget.id, list = this.data.list;
  //   for (var i = 0, len = list.length; i < len; ++i) {
  //     if (list[i].id == id) {
  //       list[i].open = !list[i].open
  //     } else {
  //       list[i].open = false
  //     }
  //   }
  //   this.setData({
  //     list: list
  //   });
  // },
  changeTheme: function () {
    console.log(this.data);
    getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
  }
});