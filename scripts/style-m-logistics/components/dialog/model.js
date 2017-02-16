(function () {

    let wuage = window.wuage || (window.wuage = {});

    let model = null;

    let noop = function () {
    }
    let defaultOptions = {
        title: '提示',
        content: '提示的内容',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000',
        showConfirm: true,
        confirmText: '确定',
        confirmColor: '#316CCB',
        confirm: noop,
        cancel: noop
    }

    /**
     * 打开一个静态框
     * @param options
     * @param options.title 提示的标题
     * @param options.content 提示的内容
     * @param options.showCancel 是否显示取消按钮，默认为 true
     * @param options.cancelText 取消按钮的文字，默认为"取消"
     * @param options.cancelColor 取消按钮的文字颜色，默认为"#000000"
     * @param options.showConfirm 是否显示确认按钮，默认为 true
     * @param options.confirmText 确定按钮的文字，默认为"确定"
     * @param options.confirmColor 确定按钮的文字颜色，默认为"#3CC51F"
     * @param options.confirm 确定回调函数
     * @param options.cancle 取消回调函数
     */
    wuage.openModel = function (options) {
        if (model)return;
        options = options || {};
        for (let key in defaultOptions) {
            options[key] = options[key] == null ? defaultOptions[key] : options[key];
        }
        model = document.createElement('div');
        model.classList.add('model-container');
        let html = '<div class="model-wrapper"><div class="model-box">' +
            '<div class="model-header">' + options.title + '</div>' +
            '<div class="model-content">' + options.content + '</div>' +
            '<div class="model-footer">';
        if (options.showCancel) {
            let both = '';
            let width = '100%';
            if (options.showConfirm) {
                both = 'both';
                width = '50%';
            }
            html += '<div class="model-cancel ' + both + '" style="color: ' + options.cancelColor + ';width:' + width + '">' + options.cancelText + '</div>';
        }
        if (options.showConfirm) {
            let width = '100%';
            if (options.showCancel) {
                width = '50%';
            }
            html += '<div class="model-confirm" style="color: ' + options.confirmColor + ';width:' + width + '">' + options.confirmText + '</div>';
        }
        html += '</div></div></div>';
        model.innerHTML = html;
        // model.addEventListener('webkitTransitionEnd', function () {
        //     if (!model.classList.contains('active')) {
        //         model.parentNode.removeChild(model);
        //         model = null;
        //     }
        // });
        model.addEventListener('click', function (e) {
            var classList = e.target.classList;
            var action = function (fn) {
                // model.classList.remove('active');
                options[fn].call(options, e);
                model.parentNode.removeChild(model);
                model = null;
            }
            if (classList.contains('model-cancel')) {
                action('cancel');
            } else if (classList.contains('model-confirm')) {
                action('confirm');
            }

        });
        document.body.appendChild(model);
        model.offsetHeight;
        model.classList.add('active');
    }

})();