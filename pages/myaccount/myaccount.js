// pages/index/index.js
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountList: []
  },
  addNewAccount() {
    wx.redirectTo({
      url: '/pages/newaccount/newaccount'
    })
  },
  getAccountList() {
    account.getAccountList().then(res => {
      this.setData({
        accountList: res
      })
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/accountdetail/accountdetail?id=${e.currentTarget.dataset.item.id}`,
    })
  },
  onShow: function () {
    this.getAccountList()
  },
})