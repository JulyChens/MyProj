/**
  ********************************************************************************
  *                      		我的封装库
  ********************************************************************************
  * @File    : MyLib.js
  * @By      : 陈志立
  * @Version : V1.0.2.2.20161004
  * @Date    : 2016 / 10 / 04
  ********************************************************************************
  * function getStyle(obj,attr)		//获取样式 兼容IE678及高版本浏览器
  * function animate(obj,json,fn) 	//多个属性运动框架 
  ********************************************************************************
**/
/**
  ********************************************************************************
  * @Name   : getStyle(obj,attr)
  * @Brief  : 获取样式 兼容IE678及高版本浏览器
  * @Input  : obj:对象	attr:属性
  * @Return : 样式属性值
  ********************************************************************************
**/
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
/**
  ********************************************************************************
  * @Name   : animate(obj,json,fn)
  * @Brief  : 多属性运动框架
  * @Input  : obj:对象	json:json	fn:回调函数
  * @Return : none
  ********************************************************************************
**/
function animate(obj,json,time,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  //判断是否停止定时器
        for(var attr in json){   //遍历json
            var current = 0;
            if(attr == "opacity"){
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            }
            else{
                current = parseInt(getStyle(obj,attr)); //数值
            }
            var step = (json[attr]-current)/10; 
            step = step>0?Math.ceil(step):Math.floor(step);
            if(attr == "opacity"){  
                if("opacity" in obj.style){  //判断浏览器是否支持opacity
                    obj.style.opacity = (current + step)/100;
                }
                else{
                    obj.style.filter = "alpha(opacity = "+(current+step)*10+")";
                }
            }
            else if(attr == "zIndex"){
                obj.style.zIndex = json[attr];
            }
            else{
                obj.style[attr] = current+step+"px";
            }
            if(current != json[attr]){  //防止多属性值不同步完成目标值，提前停止定时器
                flag = false;
            }
        }
        if(flag){  // 用于判断定时器的条件
            clearInterval(obj.timer);
            if(fn){   //当定时器停止了，动画就结束了  如果有回调，就应该执行回调
                fn();
            }
        }
    },time)
}