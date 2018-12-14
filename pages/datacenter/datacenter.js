// pages/datacenter/datacenter.js
const account = require('../../data/account.js')
const { $Message } = require('../../iview/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadStatus: false,
    downloadStatus: false,
    spinShow: false
  },
  getSec() {
    return new Promise((resolve, reject) => {
      wx.cloud.downloadFile({
        fileID: 'cloud://dev-8d9d7f.6465-dev-8d9d7f/sec.txt',
        success(res) {
          const fs = wx.getFileSystemManager()
          let secFile = fs.readFileSync(res.tempFilePath, 'utf8')
          resolve(secFile)
        }
      })
    })
  },
  getOpenId(sec) {
    return new Promise((resolve, reject) => {
      wx.login({
        success(logRes) {
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxee7293b34c8da828
&secret=${sec}&js_code=${logRes.code}&grant_type=authorization_code`,
            success(res) {
              resolve(res.data.openid)
            }
          })
        }
      })
    })
  },
  toSaveData() {
    this.setData({
      uploadStatus: true
    })
  },
  saveData(e) {
    if (e.detail.index == 0) {
      this.setData({
        uploadStatus: false
      })
      return
    }
    const self = this
    this.setData({
      spinShow: true,
      uploadStatus: false,
    })
    return this.getSec().then(sec => {
      return this.getOpenId(sec)
    }).then(openid => {
      const fs = wx.getFileSystemManager()
      return Promise.all([account.getAccountList(), account.getCheckingList()]).then(accRes => {
        let writeRes = fs.writeFileSync(wx.env.USER_DATA_PATH + `/${openid}.json`, JSON.stringify({
          accountList: accRes[0],
          checkingList: accRes[1]
        }))
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `./userData/${openid}.json`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: wx.env.USER_DATA_PATH + `/${openid}.json`,
          // 成功回调
          success: res => {
            self.setData({
              spinShow: false
            })
            $Message({
              content: '上传成功！',
              type: 'success'
            });
          },
          error(e) {
            self.setData({
              spinShow: false
            })
            $Message({
              content: e,
              type: 'error'
            });
          }
        })
      })
    })
  },
  getDownloadData() {
    return this.getSec().then(sec => {
      return this.getOpenId(sec)
    }).then(openid => {
      return new Promise((resolve, reject) => {
        wx.cloud.downloadFile({
          fileID: `cloud://dev-8d9d7f.6465-dev-8d9d7f/userData/${openid}.json`,
          success(res) {
            const fs = wx.getFileSystemManager()
            let fileData = fs.readFileSync(res.tempFilePath, 'utf8')
            resolve(fileData)
          }
        })
      })
    })
  },
  toDownloadData() {
    this.setData({
      downloadStatus: true
    })
  },
  downloadData(e) {
    if (e.detail.index == 0) {
      this.setData({
        downloadStatus: false
      })
      return
    }
    const self = this
    this.setData({
      spinShow: true,
      downloadStatus: false
    })
    this.getDownloadData().then(data=> {
      const fileData = JSON.parse(data)
      return Promise.all([account.updateAccountList(fileData.accountList), account.updateCheckingList(fileData.checkingList)])
    }).then(() => {
      self.setData({
        spinShow: false
      })
      $Message({
        content: '更新数据成功！',
        type: 'success'
      });
    }).catch(e => {
      self.setData({
        spinShow: false
      })
      $Message({
        content: e,
        type: 'error'
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      env: 'dev-8d9d7f',
      traceUser: true
    })
  },
})