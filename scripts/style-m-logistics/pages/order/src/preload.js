/**
 * 标题 图片预加载
 * 描述
 * 创建日期 17/2/14 上午10:33
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

var preload = function (urls, callback) {
  var ttlImages = [];
  var newImages = [];
  var errImages = [];
  var done = function () {
    if (newImages.length + errImages.length === ttlImages.length) {
      callback({
        newImages: newImages,
        errImages: errImages
      });
    }
  }

  if (typeof urls === 'string') {
    urls = [urls];
  }

  urls.forEach((url)=> {
    const img = ttlImages[ttlImages.length] = new Image();

    img.onload = function () {
      newImages.push(this);
      done();
    };

    img.onerror = function () {
      errImages.push(this);
      done();
    }

    img.src = url;
  })
}

export default preload