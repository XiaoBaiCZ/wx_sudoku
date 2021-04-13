// pages/index/index.js
Page({

  data: {
    content_top: getApp().globalData.status_bar_height,
    itemWidth: 70 / 750 * getApp().globalData.screenWidth,
    found: 0,
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    src: initSudoku(),
    dest: initSudoku(),
    temp: null
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
      dest: initSudoku(),
      temp: null
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
    wx.showLoading({
      title: '解答中',
      mask: true
    })

    if (this.data.temp) {
      this.setData({
        src: JSON.parse(JSON.stringify(this.data.temp)),
        dest: JSON.parse(JSON.stringify(this.data.temp)),
        temp: null
      })
    }

    const src = this.data.src
    const dest = this.data.dest
    this.data.temp = JSON.parse(JSON.stringify(src))

    const start = new Date()

    try {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (new Date() - start > 3000) {
            throw '超时'
          }
          const k = index(i, j)
          if (src[k] != '.') {
            continue
          }
          if (dest[k] === '.') {
            dest[k] = 0
          }
          dest[k]++
          if (dest[k] > 9 || dest[k] < 1) {
            const res = this.revert(i, j)
            i = res.i
            j = res.j - 1
            continue
          }
          if (!this.checkRow(i, j) || !this.checkCol(i, j) || !this.checkRange(i, j)) {
            j--
          }
        }
      }
    } catch (e) {
      wx.hideLoading()
      wx.showToast({
        title: e,
        duration: 3000,
        icon: 'none',
        mask: true
      })
      this.setData({
        dest: JSON.parse(JSON.stringify(src))
      })
      return
    }
    wx.hideLoading()
    wx.showToast({
      title: `耗时${new Date() - start}毫秒`,
      duration: 3000,
      mask: true
    })
    this.setData({
      src: JSON.parse(JSON.stringify(dest))
    })
  },

  revert: function (i, j) {
    const src = this.data.src
    let k = index(i, j)
    this.reset(k)
    while (k >= 0 && src[--k] != '.');
    if (k < 0) {
      throw 请检查数组
    }
    let _j = k % 9
    let _i = (k - _j) / 9
    return {
      i: _i,
      j: _j
    }
  },

  reset: function (k) {
    const src = this.data.src
    const dest = this.data.dest
    for (let i = k; i < 81; i++) {
      if (src[i] === '.') {
        dest[i] = '.'
      }
    }
  },

  checkRow: function (i, j) {
    const dest = this.data.dest
    let k = index(i, j)
    const s = i * 9
    for (let x = 0; x < 9; x++) {
      if (x === j) {
        continue
      }
      if (dest[s + x] === dest[k]) {
        return false
      }
    }
    return true
  },

  checkCol: function (i, j) {
    const dest = this.data.dest
    let k = index(i, j)
    for (let x = 0; x < 9; x++) {
      if (x === i) {
        continue
      }
      if (dest[x * 9 + j] === dest[k]) {
        return false
      }
    }
    return true
  },

  checkRange: function (i, j) {
    const dest = this.data.dest
    let k = index(i, j)
    const r1 = i < 3 ? 0 : i < 6 ? 3 : 6
    const r2 = r1 + 1
    const r3 = r2 + 1
    const c = j < 3 ? 0 : j < 6 ? 3 : 6
    for (let x = 0; x < 3; x++) {
      if (r1 === i && c + x === j) {
        continue
      }
      if (dest[r1 * 9 + c + x] === dest[k]) {
        return false
      }
    }
    for (let x = 0; x < 3; x++) {
      if (r2 === i && c + x === j) {
        continue
      }
      if (dest[r2 * 9 + c + x] === dest[k]) {
        return false
      }
    }
    for (let x = 0; x < 3; x++) {
      if (r3 === i && c + x === j) {
        continue
      }
      if (dest[r3 * 9 + c + x] === dest[k]) {
        return false
      }
    }
    return true
  }
  
})

const index = (i, j) => (i * 9 + j)

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