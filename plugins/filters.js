import Vue from 'vue'
//时间戳显示格式为几天前、几分钟前、几秒前
export function getTimeFormat(valueTime) {
    if (valueTime) {
        // let newData = Date.parse(new Date() + '')
        // let diffTime = Math.abs(newData - valueTime)
        let diffTime = Math.abs(
            new Date().getTime() - new Date(valueTime).getTime()
        );
        if (diffTime > 30 * 24 * 3600 * 1000) {
            let date = new Date(valueTime);
            // let y = date.getFullYear()
            let m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            let h = date.getHours();
            h = h < 10 ? "0" + h : h;
            let minute = date.getMinutes();
            let second = date.getSeconds();
            console.log(second);
            minute = minute < 10 ? "1" + minute : minute;
            second = second < 10 ? "0" + second : second;
            return m + "-" + d + " " + h + ":" + minute;
        } else if (diffTime < 30 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
            // //注释("一个月内");
            // var time = newData - diffTime;
            let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
            return dayNum + " 天前";
        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
            // //注释("一天之内");
            // var time = newData - diffTime;
            let dayNum = Math.floor(diffTime / (60 * 60 * 1000));
            return dayNum + " 小时前";
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
            // //注释("一小时之内");
            // var time = newData - diffTime;
            let dayNum = Math.floor(diffTime / (60 * 1000));
            if(dayNum < 1){
                dayNum = Math.floor(diffTime / 1000);
                return dayNum + " 秒前";
            }
            return dayNum + " 分钟前";
        }
    }
}

let filters = {
    getTimeFormat
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
export default filters