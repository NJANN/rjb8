// pages/detail/detail.js
const request=require("../../utils/requests");
var star = require("../../utils/star");
Page({
  data:{
      id:""
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  /* 图书收藏事件 */
  favBook: function () {
    this.setData({
      is_faved: true
    });
    var fav = {}
    fav["title"] = this.data.title;
    fav["author"] = this.data.author;
    fav["publisher"] = this.data.publisher;
    var favs = wx.getStorageSync('favs') || []
    favs.unshift(fav)
    wx.setStorageSync('favs', favs)
    wx.showToast({
      title: '预定成功',
      icon: 'success',
      duration: 1500
    });
  },

  /* 图书取消收藏事件 */
  unfavBook: function () {
    var favs = wx.getStorageSync('favs') || [];
    for (var i = favs.length - 1; i >= 0; i--) {
      if (favs[i].marc_no === this.data.marc_no && favs[i].school === this.data.school) {
        favs.splice(i, 1);
      }
    };
    wx.setStorageSync('favs', favs);
    this.setData({
      is_faved: false
    });
    wx.showToast({
      title: '取消预定',
      icon: 'success',
      duration: 1500
    });
  },

  /* 图书是否被收藏事件 */
  searchFav: function (marc_no, favs) {
    for (var i = 0; i < favs.length; i++) {
      if (favs[i].marc_no === marc_no) {
        return true;
      }
    };
    return false;
  },
   bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  /* 改变当前tab事件 */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  onLoad:function(options){
      // 页面初始化 options为页面跳转所带来的参数
      var that=this;
      that.setData({ id:options.id});
      wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
      })
      request.getBookById(that.data.id,function(res){

          var types =res.data;
          var rating = types.rating;
          rating.block = star.get_star(rating.average);

          res.data = types;
          console.log(res.data);

          that.setData({bookInfo:res.data});
      });
  },
  onReady:function(){
    // 页面渲染完成
   wx.hideToast();
  },
  onShow:function(){
    // 页面显示
    console.log("显示");
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})