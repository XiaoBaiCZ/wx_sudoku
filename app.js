// app.js
App({
  onLaunch() {
    const sys = wx.getSystemInfoSync()
    this.globalData.status_bar_height = sys.safeArea.top
    this.globalData.screenWidth = sys.screenWidth
  },
  globalData: {
    status_bar_height: 0,
    screenWidth: 0
  }
})
