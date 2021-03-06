function getAjax (method, apiUrl, options, callback) {
    var xhr = $.ajax({
        type: method,
        url: apiUrl,
        data: options,
        timeout: 5000,          // 设置超时时间
        dataType: "json",
        beforeSend: function (xhr) {
            $.showLoading();    // 数据加载成功之前，使用loading组件
        },
        success: function(json) {
            $.hideLoading();    // 成功后，隐藏loading组件
            if(callback && callback instanceof Function === "true") {
                callback(json);
            }
        },
        error: function (textStatus) {
            console.error(textStatus);
        },
        complete: function (XMLHttpRequest,status) {
            if(status == 'timeout') {
                xhr.abort();    // 超时后中断请求
                $.alert("网络超时，请刷新", function () {
                    location.reload();
                })
            }
        }
    })
}
