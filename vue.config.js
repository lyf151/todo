module.exports = {
    devServer: {
        open: true, //编译后默认打开浏览器
        host: 'localhost', //域名
        port: 3000, // 端口
        https: false, //是否https
        //显示警告和错误
        overlay: {
            warnings: false,
            errors: true
        },
    }
}