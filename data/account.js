const fsio = require('./fsio.js')
const moment = require('../tools/moment.js')

const ACCOUNT = {
  accountList: [
    {
      id: 0,
      name: '',
      createTime: '',
      type: '资产',
      balance: 0, // 账本余额
    }
  ],
  checkingList: [
    {
      id: 0,
      time: '',
      record: {},
      net: 0,
      diff: 0
    }
  ]

}

const account = {
  getNewAccountId(accountList) {
    if (accountList && accountList.length) {
      return accountList[accountList.length-1].id/1 + 1
    } else {
      return 0
    }
  },
  getNewCheckingId(checkingList) {
    if (checkingList && checkingList.length) {
      return checkingList[checkingList.length - 1].id / 1 + 1
    } else {
      return 0
    }
  },
  getAccountDetail(id) {
    return account.getAccountList().then(list => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          return list[i]
        }
      }
    })
  },
  getCheckingDetail(id) {
    return account.getCheckingList().then(list => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          return list[i]
        }
      }
    })
  },
  getAccountList() {
    return fsio.getData('accountList', [])
  },
  getCheckingList() {
    return fsio.getData('checkingList', [])
  },
  updateAccountList(list) {
    return fsio.setData('accountList', JSON.stringify(list))
  },
  updateCheckingList(list) {
    return fsio.setData('checkingList', JSON.stringify(list))
  },
  newAccount(item) {
    return account.getAccountList().then(accountList => {
      let beforeAccountList = accountList
      beforeAccountList.push({
        ...item,
        id: account.getNewAccountId(accountList),
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      return account.updateAccountList(beforeAccountList)
    })
  },
  newChecking(item) {
    return account.getCheckingList().then(list => {
      return account.getAccountList().then(accountList => {

        let accountTypeObj = {}
        let resultList = []
        accountList.forEach(accItem => {
          accountTypeObj[`$${accItem.id}`] = accItem.type == '资产' ? 1 : -1
          resultList.push({
            ...accItem,
            money: item.record[`$${accItem.id}`]
          })
        })
        let record = item.record
        let net = 0

        Object.keys(record).forEach(itRe => {
          net = net + accountTypeObj[itRe] * record[itRe]
        })

        list.push({
          ...item,
          id: account.getNewCheckingId(list),
          net: net.toFixed(2)
        })
        
        return account.updateCheckingList(list).then(() => {
          return account.updateAccountList(resultList)
        })
      })
      
    })
  },
  updateCheckingNet() {
    return account.getAccountList().then(accountList => {
      return account.getCheckingList().then(checkingList => {
        let accountTypeOjb = {}
        accountList.forEach(ita => {
          accountTypeOjb[`$${ita.id}`] = ita.type == '资产'? 1 : -1
        })
        let resultCheckingList = []
        checkingList.forEach((itc, index, _arr) => {
          let net = 0
          let record = itc.record
          Object.keys(record).forEach(itRe => {
            net = net + accountTypeOjb[itRe] * record[itRe]
          })
          resultCheckingList.push({
            ...itc,
            net
          })
        })
        return account.updateCheckingList(resultCheckingList)
      })
    })
  },
  updateAccountMoney(id, val) {
    return account.getAccountList().then(list => {
      let accountList = list
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          accountList[i].money = val/1
          account.updateAccountList(accountList)
          return 
        }
      }
    })
  },
  deleteAccount(id) {
    return account.getAccountList().then(list => {
      let result = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          continue
        } else {
          result.push(list[i])
        }
      }
      account.updateAccountList(result)
    })
  },
  deleteChecking(id) {
    return account.getCheckingList().then(list => {
      let result = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          continue
        } else {
          result.push(list[i])
        }
      }
      account.updateCheckingList(result)
    })
  },
  updateCheckingDetail(id, item) {
    return account.getCheckingList().then(checkingList => {
      let result = []
      for (let i = 0; i < checkingList.length; i++) {
        if (checkingList[i].id == id) {
          result.push({
            ...checkingList[i],
            ...item,
            id,
          })
        } else {
          result.push(checkingList[i])
        }
      }
      return account.updateCheckingList(result)
    })
  }
}

module.exports = account