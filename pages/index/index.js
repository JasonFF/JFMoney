// pages/index/index.js
const fsio = require('../../fsio/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'hello'
  },

  handleClick() {
    // const self = this
    // const fs = wx.getFileSystemManager()
    // console.log(wx.env.USER_DATA_PATH)
    // fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.jpg`, 'hello, world', 'utf8')
    // let fileDir = fs.readdirSync(`${wx.env.USER_DATA_PATH}`)
    // let fileData = fs.readFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'utf8')
    // wx.saveImageToPhotosAlbum({
    //   filePath: `${wx.env.USER_DATA_PATH}/hello.jpg`,
    //   complete(res) {
    //     console.log(res)
    //   }
    // })
    fsio.setTd({
      hello: 'world',
      nihao: true
    }).then(res => {
      console.log(res)
      fsio.getTd('hello').then(gettd => {
        console.log(gettd)
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