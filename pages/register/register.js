Page({
  data: {
    items: [
      { name: '是', value: '是' },
      { name: '否', value: '否', checked: 'true' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})