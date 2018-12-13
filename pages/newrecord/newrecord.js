// pages/newrecord/newrecord.js
const moment = require('../../tools/moment.js')
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: moment().format('YYYY-MM-DD'),
    accountList: [],
    propertyList: [],
    loanList: [],

  },
  submit() {
    let record = {}
    this.data.accountList.forEach(it => {
      record[`$${it.id}`] = this.data[`$${it.id}`] || 0
    })
    account.newChecking({
      time: this.data.date,
      record
    }).then(() => {
      wx.redirectTo({
        url: '/pages/myrecord/myrecord',
      })
    })
  },
  handleInput(e) {
    let id = e.target.dataset.param
    let val = e.detail.value
    this.setData({
      [`$${id}`]: val/1
    })
    console.log(e)
  },
  getAccountList() {
    account.getAccountList().then(list => {
      let propertyList = []
      let loanList = []
      list.forEach(it => {
        if (it.type == '资产') {
          propertyList.push(it)
        } else {
          loanList.push(it)
        }
      })
      console.log(propertyList, loanList)
      this.setData({
        accountList: list,
        propertyList,
        loanList
      })
    })
  },
  onShow: function () {
    this.getAccountList()
  },

})