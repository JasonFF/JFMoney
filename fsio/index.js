
const fsio = {
  setTd(data) {
    return Promise.all(Object.keys(data).map(key => {
      return fsio.setSingleData(key, data[key])
    }))
  },
  setSingleData(key, value) {
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
  getTd(key) {
    return new Promise((resovle, reject) => {
      wx.getStorage({
        key,
        success(res) {
          resovle(res.data)
        },
        fail(e) {
          reject(e)
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