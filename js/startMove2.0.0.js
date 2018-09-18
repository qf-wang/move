function Move(ele) {
    this.$ele = document.querySelector(ele);

}
// 通用函数，多属性修改，指定时间，匀速运动
Move.prototype.changeMore = function (attrObj, time, callback) {
    time = time || 400;
    var _this = this;
    const speedObj = {}
    clearInterval(this.$ele.timer);
    // 给每一个属性设置一个速度
    for (let attr in attrObj) {
        // （目标值 - 初始值） / 时间 
        let _attr = parseFloat(this.getStyle(attr));
        attr === 'opacity' ? _attr *= 100 : _attr;
        speedObj[attr] = (attrObj[attr] - _attr) / (time / 10)
    }

    this.$ele.timer = setInterval(function () {
        var flag = true;
        // 分别修改每一个属性
        for (let attr in attrObj) {
            // 获取目标值
            target = attrObj[attr];
            // 获取速度
            var speed = speedObj[attr];
            // 获取初始值
            var _flag = _this.changeAttr(target, attr,speed);
            if(!_flag) {
                flag = false;
            }
        }
        _this.stop(callback, flag);
    }, 10)
}

Move.prototype.stop = function(callback, flag) {
    var _this = this;
    flag = flag && true;
    if (flag) {
        clearInterval(_this.$ele.timer);
        if (typeof callback == 'function') {
            callback();
        }

    }
}
//  单属性修改
Move.prototype.changeSingle = function (target, attr, time, callback) {
    var _this = this;
    clearInterval(this.$ele.timer);

    var init = parseFloat(this.getStyle(attr));
    if (attr == 'opacity') {
        init *= 100;
    }
    var speed = (target - init) / (time / 10);
    var flag;
    this.$ele.timer = setInterval(function () {
        flag = _this.changeAttr(target, attr, speed);
        _this.stop(callback, flag);
    }, 10)

}
// 返回false,证明该属性还没有到达目标值
// 返回true,证明该属性已经到达目标值
Move.prototype.changeAttr = function (target, attr, speed) {
    var flag = false
    // 获取初始值
    var init = parseFloat(this.getStyle(attr));
    attr == 'opacity' ? init *= 100 : init;
    init += speed;
    if ((speed >= 0 && init >= target) || (init <= target && speed <= 0)) {
        init = target;
        flag = true;
        // 到达目标值
    }

    attr == 'opacity' ? init /= 100 : init += 'px';
    this.$ele.style[attr] = init
    return flag;

}
// distance传入正直向右运动,传入负值像左运动
Move.prototype.changeX = function (distance, time, callback) {
    // 获取初始值进行修改
    var init = parseFloat(this.getStyle('left'));
    var target = init + distance;
    this.changeSingle(target, 'left', time, callback);

}
Move.prototype.changeY = function (distance, time, callback) {
    var init = parseFloat(this.getStyle('top'));
    var target = init + distance;
    this.changeSingle(target, 'top', time, callback);
}
Move.prototype.getStyle = function (attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(this.$ele, false)[attr];
    }
    return this.$ele.currentStyle[attr];
}