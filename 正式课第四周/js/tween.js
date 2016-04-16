~(function () {
    var animate = {
        linear: function (t, b, c, d) {
            return t / d * c + b;
        }
    };

    //move()实现多方向的运动动画
    //curEle:当前要操作运动的元素，target当前动画的目标位置 是一个对象(top:xx,left:xx),存储的是每一个方向的目标位置   duration:设定当前动画的总时间
    function move(curEle, target, duration) {
        //根据target获取每一个方向的起始值begin和总距离change
        var begin = {}, change = {};
        for (var key in target) {//key存的是top,left
            if (target.hasOwnProperty(key)) {//原型的继承
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        //实现多方向的运动动画
        var time = null;
        curEle.timer = window.setInterval(function () {
            time+=10;
            //到达目标结束动画，让当前元素的样式值等于目标样式值
            if(time>=duration){
                utils.css(curEle,target);
                window.clearInterval(curEle.timer);
                return;
            }
            //没到达目标值：分别的获取每一个方向的当前位置，给当前元素设置样式即可
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curPos = animate.linear(time,begin[key],change[key],duration);
                    utils.css(curEle,key,curPos);
                }
            }
        },10)
    }
})()
