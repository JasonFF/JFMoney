// pages/newaccount/newaccount.js
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    typeName: '资产',
    money: 0
  },
  handleType(e) {
    this.setData({
      typeName: e.detail.value
    })
  },
  handleInput(e) {
    let result = {}
    result[`${e.target.dataset.param}`] = e.detail.detail.value
    this.setData(result)
  },
  submit() {
    account.newAccount({
      name: this.data.name,
      type: this.data.typeName,
      money: this.data.money
    }).then(() => {
      wx.redirectTo({
        url: '/pages/myaccount/myaccount',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})