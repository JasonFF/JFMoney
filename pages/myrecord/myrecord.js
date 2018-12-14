// pages/index/index.js
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },
  addNewRecord() {
    wx.redirectTo({
      url: '/pages/newrecord/newrecord'
    })
  },
  getCheckingList() {
    account.getCheckingList().then(res => {
      this.setData({
        recordList: res.map((it, index, _arr) => {
          return {
            ...it,
            diff: index?(it.net-_arr[index-1].net).toFixed(2):0
          }
        }).reverse()
      })
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/recorddetail/recorddetail?id=${e.currentTarget.dataset.item.id}`,
    })
  },
  onShow: function () {
    this.getCheckingList()
  },
})