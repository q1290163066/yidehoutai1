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
    get_all:"/estate/list"
}

export default {
    banner,
    upload,
    housesInfo
}