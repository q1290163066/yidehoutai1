import React, { Component } from 'react'
import { message} from 'antd';

export default class Gmap extends Component{
    componentDidMount() {

        const { AMap } = window;
        const map = new AMap.Map(document.getElementById('container'), {
          viewMode: '3D',
          isHotspot: true
        });
        // gmap.setCity('阳江');
           //输入提示
        var autoOptions = {
            input: "tipinput"
        };
        var auto = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            map: map
        });  //构造地点查询类
        AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
        function select(e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
        }
        let _this=this
        map.on('click', function(mapEvent) {
            let longitude=mapEvent.lnglat.lat
            let latitude=mapEvent.lnglat.lng
            // console.log(mapEvent)
            message.success("经度："+longitude+"，经度："+latitude);
             _this.props.fn1(mapEvent)
        })
        
      }
    
      render() {
        return (
            <>
              <input id="tipinput" placeholder="请输入关键字："/>
              <div id="container" style={{ width: '100%', height: 300 }} />
            </>
        );
      }
}
