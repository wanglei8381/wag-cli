#wag-cli
Usage: wag [options] [value ...]

Commands:

    init [projectName]  初始化项目
    dev                 开发
    build               发布上线
    start               开发自动启动服务
    test                测试
    help [cmd]          display help for [cmd]

Options:

    -h, --help     output usage information
    -V, --version  output the version number

Version:

    v3.0.0 实现test

    v2.3.0 build --dev

    v2.2.0 build添加html模版

    v2.1.0 修改字体,图片等生成目录不正确
           init初始化项目却少文件
           build --remove 删除dist目录