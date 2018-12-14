// pages/recorddetail/recorddetail.js
const moment = require('../../tools/moment.js')
const account = require('../../data/account.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseId: '',
    date: '',
    accountList: [],
    propertyList: [],
    loanList: [],
    deleteModalStatus: false,
    modalAction: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],

  },
  deleteItem() {
    this.setData({
      deleteModalStatus: true
    })
  },
  handleDelete(e) {
    if (e.detail.index == 1) {
      account.deleteChecking(this.data.chooseId).then(() => {
        wx.navigateBack()
      })
    } else {
      this.setData({
        deleteModalStatus: false
      })
    }
    
  },
  submit() {
    let record = {}
    this.data.accountList.forEach(it => {
      record[`$${it.id}`] = this.data.record[`$${it.id}`] || 0
    })
    account.updateCheckingDetail(this.data.chooseId, {
      record,
      net: this.data.net
    }).then(() => {
      wx.navigateBack()
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
        net = net + this.data.record[`$${it.id}`]/1
      } else {
        net = net - this.data.record[`$${it.id}`] / 1
      }
    })
    this.setData({
      net: net.toFixed(2)
    })
  },
  getCheckingDetail() {
    account.getCheckingDetail(this.data.chooseId).then(item => {
      this.setData({
        date: item.time,
        net: item.net,
        record: item.record,
      })
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
      this.setData({
        accountList: list,
        propertyList,
        loanList
      })
    })
  },
  onLoad: function (options) {
    this.setData({
      chooseId: options.id
    })
    this.getAccountList()
    this.getCheckingDetail()
  },

})