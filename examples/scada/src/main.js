
import Huayou from "../../../dist/huayou.esm.min.js";
import {Toolbar} from "./toolbar.js";
import {ViewEvents} from "./viewEvents.js";
import {EquipEvents} from "./equipEvents.js";
import {DataServer} from "./dataServer.js";

class SCADA {
    constructor() {
        this.viewer = null;
        this.toolbar = null;
        this.currentPage = null;
        this.overlaySvg = document.getElementById("overlaySvg");
        this._dataServer = null;
    }
    initPage(svgUrl){
        let loader = new Huayou.SVGLoader();
        loader.load(svgUrl,  (modeledSVG) => {
            if (this.viewer !== null) this.viewer.destroy();
            let graph = new Huayou.Graph(modeledSVG);
            this.viewer = new Huayou.Viewer("container",graph);
            this.initZoomFull();
            this.initToolbar();
            this.initViewerEvents();
            this.initEquipEvents();
            this.restore();
            this.currentPage=svgUrl;
        });
    }
    openPage(url,target){
        if(target == "_self"||target===undefined){
            this.initPage(url);
        }else{
            const strUrl = "index.html?page="+url;
            window.open(strUrl,url,"width=800,height=600");
        }
    }
    refresh(){
        this.openPage(this.currentPage,"_self");
    }
    initToolbar(){
        this.toolbar = new Toolbar(this);
    }
    initViewerEvents(){
        this.viewerEvents = new ViewEvents(this);
    }
    initEquipEvents(){
        this.equipEvents = new EquipEvents(this);
    }
    initZoomFull(){
        let bbox=this.viewer.getBBox();
        if(bbox.width > this.viewer.width || bbox.height > this.viewer.height){
            this.viewer.zoomFull();
        }
        this.showCurrentZoom();
    }
    restore(){
        if(this._dataServer){
            this._dataServer.stop();
            this._dataServer = new DataServer(this);
            this._dataServer.start();
        }
    }
    getDataServer(){
        return this._dataServer;
    }
    registerDataServer(dataServer){
        this._dataServer = dataServer;
    }
    unregisterDataServer(){
        this._dataServer = null;
    }

    showCurrentZoom(){
        let zoom=this.viewer.getCurrentZoom();
        let text=document.getElementById("scaleRate");
        text.value= Math.round(zoom*100)+"%";
    }
    getPage() {
        const name = "page";
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
}
export default SCADA;


