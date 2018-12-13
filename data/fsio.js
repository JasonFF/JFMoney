
const fsio = {
  setDataObj(data) {
    return Promise.all(Object.keys(data).map(key => {
      return fsio.setData(key, data[key])
    }))
  },
  setData(key, value) {
    return new Promise((resovle, reject) => {
      wx.setStorage({
        key,
        data: value,
        success(res) {
          resovle(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },
  getDataObj(obj) {
    return Promise.all(Object.keys(obj).map(key => {
      return fsio.getData(key, obj[key])
    }))
  },
  getData(key, defaultVal) {
    return new Promise((resovle, reject) => {
      wx.getStorage({
        key,
        success(res) {
          resovle(JSON.parse(res.data))
        },
        fail(e) {
          resovle(defaultVal)
        }
      })
    })
  },
  save() {

  },
  getSave() {

  }
}

module.exports = fsio