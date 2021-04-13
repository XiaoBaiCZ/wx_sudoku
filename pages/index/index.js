// pages/index/index.js
Page({

  data: {
    content_top: getApp().globalData.status_bar_height,
    itemWidth: 70 / 750 * getApp().globalData.screenWidth,
    found: 0,
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    src: initSudoku(),
    dest: initSudoku(),
  },

  onClickSudokuItem: function (e) {
    this.setData({
      found: e.target.dataset.found
    })
  },

  onClickNumberItem: function (e) {
    const value = e.target.dataset.value
    this.data.src[this.data.found] = value
    this.data.dest[this.data.found] = value
    this.setData({
      src: this.data.src,
      dest: this.data.dest
    })
  },

  onReset: function (e) {
    this.setData({
      src: initSudoku(),
      dest: initSudoku()
    })
  },

  onClear: function (e) {
    this.data.src[this.data.found] = '.'
    this.data.dest[this.data.found] = '.'
    this.setData({
      src: this.data.src,
      dest: this.data.dest
    })
  },

  onCommit: function (e) {
    wx.showToast({
      title: '敬请期待下个版本',
      duration: 3000
    })
  }
  
})

function initSudoku() {
  return [
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.', 
    '.', '.', '.', '.', '.', '.', '.', '.', '.'
  ]
}