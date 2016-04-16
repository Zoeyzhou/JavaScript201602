//使用惰性思想(JS高阶编程技巧之一)来封装我的常用方法库：第一次在给utils赋值的时候我们就已经把兼容处理好了，把最后的结果放在flag变量中，以后再每一个方法中，只要是IE6~8不兼容的，我们不需要重新的检测，只需要使用flag的值即可

var utils = (function () {
    var flag = "getComputedStyle" in window;
    //flag这个变量不销毁，存储的是判断当前浏览器是否兼容getCOmputedStyle,兼容的话是标准浏览器，但是如果flag=false说明不兼容是IE678浏览器

    //1.类数组转化
    function listToArray(likeAry){
        var ary=[];
        if(flag){
            ary = [].slice.call(likeAry);
        }for(var i= 0,len=likeAry.length;i<len;i++){
            ary[ary.length]=likeAry[i];
        }
        return ary;
    }

    //2.格式化json对象
    function formatJson(jsonStr){
       return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    }

    //3.offset:获取页面中任意元素距离body的偏移
    function offset(curEle){
        var totalLeft=null,totalTop=null;
        var par = curEle.offsetParent;//父级参照物
        while(par){
            if(navigator.userAgent.indexOf("MSIE 8")==-1){//不是IE8需要加上父级元素的边框
                totalLeft+=par.clientLeft;
                totalTop+=par.clientTop;
            }
            totalLeft+=curEle.offsetLeft;
            totalTop+=curEle.offsetTop;
            par = par.offsetParent;
        }
        return {left:totalLeft,top:totalTop};
    }

    //4.win:操作浏览器的盒子模型
    function win(attr,value){
        if(typeof value==="undefined"){//没有传值的话，属于获取这个属性值
            return document.documentElement[attr]||document.body[attr];
        }
        //设置值，如scrollTop
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }

    //5.getCss:获取元素的样式值
    function getCss(curEle,attr){
        var val = null,reg=null;
        if(flag){
            val=window.getComputedStyle(curEle,null)[attr];
        }
        else{
            //IE678
            if(attr=="opacity"){
                val = curEle.currentStyle["filter"];
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val=reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/;
        return reg.test(val)?parseFloat(val):val;
    }

    //把外界需要使用的方法暴漏给utils
    return{
        listToArray:listToArray,
        formatJson:formatJson,
        win:win,
        offset:offset,
        getCss:getCss
    }
})();
//var utils = (function () {
//    return {
//        //将类数组转化为数组的方法
//        listToArray: function (likeAry) {
//            var ary=[];
//            try{
//                ary = [].slice.call(likeAry);
//            }
//            catch(e){
//                for(var i= 0;i<likeAry.length;i++){
//                    ary[ary.length]=likeAry[i];
//                }
//            }
//            return ary;
//        },
//        //将json格式的字符串转化为json对象
//        formatJson: function (jsonStr) {
//            return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
//        },
//        //关于操作浏览器盒子模型的方法
//        //如果只传了attr没有传递value，默认的意思是获取
//        //如果两个参数都传递了，意思是设置
//        //不严谨的来说，这就是有关于"类额重载"：同一个方法。通过传递参数的不同实现了不同的功能
//        Win: function (attr,value) {
//            if(typeof value=="undefined"){//没有传递value，属于获取
//                return document.documentElement[attr]||document.body[attr];
//            }
//            //"设置"
//            document.documentElement[attr]=value;
//            document.body[attr]=value;
//        },
//        getCss: function (curEle,attr) {
//            var val = null,reg=null;
//            if("getComputedStyle" in window){
//                val = window.getComputedStyle(curEle,null)[attr];
//            }
//            else{
//
//                if(attr=="opacity"){
//                    val = curEle.currentStyle["filter"];
//                    reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
//                    val =reg.test(val)?reg.exec(val)[1]/100:1;//opacity默认值是1
//                }
//                else{
//                    val = curEle.currentStyle[attr];
//                }
//
//            }
//            reg = /^(-?\d+(\.\d+))(px|pt|rem|em)$/i;//处理带单位的属性值
//            return reg.test(val)?parseFloat(val):val;
//        },
//        offset: function (curEle) {
//            var totalLeft = null,totalTop = null;
//            var par = curEle.offsetParent;
//            totalLeft+=curEle.offsetLeft;
//            totalTop+=curEle.offsetTop;
//            while(par){
//                if(navigator.userAgent.indexOf("MSIE 8")==-1){
//                    totalLeft+=par.clientLeft;
//                    totalTop+=par.clientTop;
//                }
//                totalLeft+=par.offsetLeft;
//                totalTop+=par.offsetTop;
//                par = par.offsetParent;
//            }
//            return {left:totalLeft,top:totalTop};
//        }
//    }
//})()
