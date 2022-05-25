var myDate = new Date();

myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
var myDate = new Date();
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString(); //获取当前日期
var mytime = myDate.toLocaleTimeString(); //获取当前时间
myDate.toLocaleString(); //获取日期与时间
// ————————————————
// 版权声明：本文为CSDN博主「wgr1001」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/wgrzhuaq/article/details/7762116

// https://www.cnblogs.com/Loveonely/p/9441004.html  时间转换


