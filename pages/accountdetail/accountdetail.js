// pages/accountdetail/accountdetail.js
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseId: '',
    accountDetail: {},
    updateModalStatus: false,
    modalAction: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    toUpdateMoney: 0
  },
  handleChangeMoney(e) {
    this.setData({
      toUpdateMoney: e.detail.detail.value
    })
  },
  toUpdateMoney() {
    this.setData({
      updateModalStatus: true
    })
  },
  handleUpdate(e) {
    if (e.detail.index == 1) {
      account.deleteAccount(this.data.accountDetail.id).then(() => {
        wx.navigateBack()
      })
    }
  },
  getAccountDetail() {
    account.getAccountDetail(this.data.chooseId).then(item => {
      this.setData({
        accountDetail: item
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chooseId: options.id
    })
    this.getAccountDetail()
  },

  
})