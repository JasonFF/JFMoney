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
    record: {},
    net: ''
  },
  submit() {
    let record = {}
    this.data.accountList.forEach(it => {
      record[`$${it.id}`] = this.data.record[`$${it.id}`] || 0
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
      record: {
        ...this.data.record,
        [`$${id}`]: val
      }
    })
    this.getNet()
  },
  getNet() {
    let net = 0
    this.data.accountList.forEach(it => {
      if (it.type == '资产') {
        net = net + (this.data.record[`$${it.id}`]?(this.data.record[`$${it.id}`] / 1):0)
      } else {
        net = net - (this.data.record[`$${it.id}`]?(this.data.record[`$${it.id}`] / 1):0)
      }
    })
    this.setData({
      net: net.toFixed(2)
    })
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