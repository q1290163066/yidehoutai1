let login={
    login:'/login'
}
//轮播图
let banner={
    get_all:"/advert/get_all",//获取全部
    get_one:'/advert/get/',//获取单条
    update:'/advert/modify',//更新编辑
    add:'/advert/add',//添加
    delete:'/advert/delete/'
};
// 上传文件
let upload="/sys/file/upload"

// 楼盘基本信息
let housesInfo={
    add:'/estate/add',
    get_all:"/estate/list",
    details:'/estate/',
    compileOne:"/estate/modify/status/",
    all_status:"/estate/modify/status/batch",
    compile_all:"/estate/modify"
}
// 户型管理
let housing={
    add:'/estate/housing/add',
    compile:"/estate/housing/modify",
    del_one:"/estate/housing/"
}
// 项目信息
let project={
    add:'/estate/project/add'
}
// 相册
let photos={
    add:"/estate/photos/add",
    del_one:"/estate/photos/",
    compile:"/estate/photos/modify/"
}
// 相册图片
let building={
    add:"/estate/photos/img/add",
    get:"/estate/photos/img/list",
    del_one:"/estate/photos/img/"
}

export default {
    banner,
    upload,
    housesInfo,
    housing,
    project,
    login,
    photos,
    building
}