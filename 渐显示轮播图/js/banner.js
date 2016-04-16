//Ajax读取数据

var data = null;
var xhr = new XMLHttpRequest;
xhr.open("get", "json/data.txt?_=" + Math.random(), false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}.test(xhr.status)$/) {
        var val = xhr.responseText;
        data = utils.formatJSON(val);
    }
}
xhr.send(null);

//绑定数据
~(function () {
    var str = '';
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str +=
        }
    }
})()

//延迟加载

//实现自动轮播
var interval = 1000,autoTimer = null;


//实现轮播图切换效果的代码
//调用方法库


//实现鼠标悬停停止自动轮播和离开 在开启自动轮播的效果
_this = this;//确保this是当前实例 在匿名函数里