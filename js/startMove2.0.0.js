function StartMove(ele) {
    this.$ele = document.querySelector(ele);

}
// 通用函数，多属性修改，指定时间，匀速运动
StartMove.prototype.move = function (attrObj, time, callback) {
    // 如果没有传时间,传入了回调函数
    if(typeof time == 'function') {
        callback = time;
        time = 400;
    }
    time = time || 400;

    var _this = this;
    const speedObj = {}
    clearInterval(this.$ele.timer);
    // 给每一个属性设置一个速度
    for(let attr in attrObj) {
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
            let _attr = parseFloat(_this.getStyle(attr));
            attr === 'opacity' ? _attr *= 100 : _attr;
            _attr += speed;
            // 所有属性都达到目标值，才停止时间函数
            if ((speed > 0 && _attr >= target) || (speed < 0 && _attr <= target)) {
                _attr = target;

            } else {
                // 只要有一个为false，证明未达到
                flag = false;
            }
            attr == 'opacity' ? _attr /= 100 : _attr += 'px';
            _this.$ele.style[attr] = _attr;
        }
        if (flag) {
            // 运动完成的标志
            clearInterval(_this.$ele.timer);
            if (callback) {
                callback(_this.$ele);
            }
        }
        console.log(1)
    }, 10)
}
StartMove.prototype.getStyle = function (attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(this.$ele, false)[attr];
    }
    return this.$ele.currentStyle[attr];
}