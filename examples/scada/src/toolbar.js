import Huayou from "../../../dist/huayou.esm.min.js";
import {Utils} from "./utils.js"
import {Layers} from "./layers.js"
import {DataServer} from "./dataServer.js";
import {Query} from "./query.js";

class Toolbar {
    constructor(scada) {
        this.viewer = scada.viewer;
        this.scada = scada;
        this.Toolbar_BBox_State=false;
        this.fireCreated=false;
    }
    index() {
        this.scada.openPage("models/station-index.svg","_self")
    }
    refresh(){
        this.scada.refresh();
    }
    zoomFull() {
        this.viewer.zoomFull();
        this.scada.showCurrentZoom();
    }
    reset() {
        this.viewer.reset();
        this.scada.showCurrentZoom();
    }
    center() {
        this.viewer.center();
        this.scada.showCurrentZoom();
    }
    zoomIn() {
        this.viewer.zoomIn();
        this.scada.showCurrentZoom();
    }
    zoomOut() {
        this.viewer.zoomOut();
        this.scada.showCurrentZoom();
    }
    zoom(e) {
        if(e.keyCode == "13"){
            let scale=document.getElementById("scaleRate").value;
            scale=scale.trim();
            scale=parseInt(scale);
            if(isNaN(scale)){
                alert("Please enter a valid number!")
                return ;
            }
            scale=scale/100;
            this.viewer.zoom(scale);
        }
    }
    zoomBBox() {
        if(this.Toolbar_BBox_State){
            let zoomBBox=document.getElementById("zoomBBox");
            zoomBBox.style.backgroundColor="";
            this.Toolbar_BBox_State=false;
            this.viewer.draggable=true;
        }else{
            let zoomBBox=document.getElementById("zoomBBox");
            zoomBBox.style.backgroundColor="red";
            this.Toolbar_BBox_State=true;
            this.viewer.draggable=false;
        }
    }
    cancelZoomBBox(){
        if(this.Toolbar_BBox_State){
            let zoomBBox=document.getElementById("zoomBBox");
            zoomBBox.style.backgroundColor="";
            this.Toolbar_BBox_State=false;
            this.viewer.draggable=true;
            document.body.style.cursor = '';
        }
    }
    query(){
        const query = new Query(this);
        query.openWindow();
    }
    addLayer(){
        let layerName="fire";
        let graph=this.viewer.graph;
        let fireLayer=document.getElementById("addLayer");

        if(!this.fireCreated){
            let layer=new Huayou.Layer(layerName);
            let attrs={x:150,y:370,width:50,height:50,stroke:'red','fill-opacity':1,fill:"red"};
            let rect1=Utils.createSVGElement('rect',attrs);
            layer.appendChild(rect1);
            attrs={x:460,y:580,width:50,height:50,stroke:'red','fill-opacity':1,fill:"red"};
            rect1=Utils.createSVGElement('rect',attrs);
            layer.appendChild(rect1);
            attrs={x:1100,y:600,width:50,height:50,stroke:'red','fill-opacity':1,fill:"red"};
            rect1=Utils.createSVGElement('rect',attrs);
            layer.appendChild(rect1);
            graph.layers.add(layer);
            fireLayer.style.backgroundColor="red";
            this.fireCreated=true;
        }else {
            graph.layers.remove(graph.layers.get(layerName));
            this.fireCreated=false;
            fireLayer.style.backgroundColor="";
        }
    }
    layers(){
        let layers = new Layers(this.scada);
        layers.openWindow();
    }
    supervisory() {
        let graph=this.viewer.graph;
        let supervisory=document.getElementById("supervisory");
        let dataServer = this.scada.getDataServer();
        if(!dataServer){
            const ds = new DataServer(this.scada);
            ds.start();
            supervisory.style.backgroundColor="red";
        }else {
            dataServer.stop();
            supervisory.style.backgroundColor="";
        }
    }
    screenFull(){
        let toolbar = document.getElementById("toolbar");
        let viewDiv = document.getElementById("view");
        if(!window.isScreenFull){
            window.isScreenFull=true;
            toolbar.style.height="0px";
            viewDiv.style.height="100%"
        }else{
            window.isScreenFull=false;
            toolbar.style.height="25px";
            viewDiv.style.height="calc(100% - 25px)"
        }
    }
}
export {Toolbar};

