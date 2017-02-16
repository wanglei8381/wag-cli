(function () {

    var wuage = window.wuage || (window.wuage = {});

    var toast = null;

    var noop = function(){};
    /**
     * 打开toast
     * @param message 提示信息
     * @param duration 持续时间,默认1500
     * @param zindex 层叠水平,默认1
     * @param position 位置:top,center,bottom,默认center
     * @param callback 关闭时的回调函数
     */
    wuage.openToast = function (message, duration, position, callback) {
        if (toast) return;
        var options, zindex = 1, icon = '';
        if (typeof message === 'object') {
            options = message;
            message = options.message;
            duration = options.duration;
            position = options.position;
            callback = options.callback;
            zindex = options.zindex || zindex;
            icon = options.icon || icon;
            if (icon) {
                icon = ' icon-' + icon;
            }
        }
        duration = duration || 1500;
        callback = callback || noop;
        toast = document.createElement('div');
        toast.classList.add('toast-container');
        position && toast.classList.add(position);
        toast.style.zIndex = zindex;
        toast.innerHTML = '<div class="toast-wrapper"><div class="toast-message' + icon + '">' + message + '</div></div>';
        toast.addEventListener('webkitTransitionEnd', function () {
            if (toast && !toast.classList.contains('active')) {
                toast.parentNode.removeChild(toast);
                toast = null;
                callback.call(toast);
            }
        });
        document.body.appendChild(toast);
        //这条语句不是多余,为添加动画作缓冲
        toast.offsetHeight;
        toast.classList.add('active');
        setTimeout(function () {
            toast && toast.classList.remove('active');
        }, duration);
    }

    wuage.closeToast = function () {
        if (toast) {
            toast.parentNode.removeChild(toast);
            toast = null;
        }
    }

})();