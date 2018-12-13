// components/nav-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navStatus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleNav() {
      this.setData({
        navStatus: !this.data.navStatus
      })
    }
  }
})
