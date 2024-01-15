import {Constants} from "./constants.js";
import Huayou from "../../../dist/huayou.esm.min.js";

class ViewEvents {
	constructor(scada) {
		this.mousedownState = false;
		this.zoomBBox = {element:null,initPoint:{}};
		this.viewer = scada.viewer;
		this.toolbar = scada.toolbar;
		this.scada = scada;
		this.picMenus=this.createPicMenus();
		this.initEevent();
	}
	createPicMenus(){
		let menuPic = new dhx.ContextMenu(null, {css: "dhx_widget--bg_gray"});
		let menuPicData = [
			{ id:"screenFull",value: "screenFull", icon: "dxi dxi-file-outline",},
			{ id:"openPic",value: "openPic", icon: "dxi dxi-file-outline",},
			{
				type: "separator"
			},
			{ id:"saveAsPng",value: "saveAsPng", icon: "dxi dxi-file-outline",},

			{ id:"print",value: "print", icon: "dxi dxi-file-outline",}
		];
		menuPic.data.parse(menuPicData);
		menuPic.events.on("Click", (id,e) => {
			if (id=="saveAsPng") {
				this.viewer.saveAsPng();
			}else if(id=="screenFull"){
				this.toolbar.screenFull();
			}else{
				alert(id);
			}
		});
		return menuPic;
	}
	initEevent(){
		this.viewer.addEventListener("zoomend",(e)=>{this.onViewerZoomend(e)});
		this.viewer.addEventListener("mouseenter",(e)=>{this.onViewerMouseenter(e)});
		this.viewer.addEventListener("mouseleave",(e)=>{this.onViewerMouseleave(e)});
		this.viewer.addEventListener("mousedown",(e)=>{this.onViewerMousedown(e)});
		this.viewer.addEventListener("mouseup",(e)=>{this.onViewerMouseup(e)});
		this.viewer.addEventListener("mousemove",(e)=>{this.onViewerMousemove(e)});
		this.viewer.addEventListener("contextmenu",(e)=>{this.onViewerContextmenu(e)});
		this.viewer.addEventListener("resize",(e)=>{this.onViewerResize(e)});
	}
	onViewerZoomend(e){
		this.scada.showCurrentZoom();
	}
	onViewerMouseenter(e){
		if(this.toolbar.Toolbar_BBox_State){
			document.body.style.cursor = 'url(image/zoom_bbox.gif),auto';
		}
	}
	onViewerMouseleave(e){
		if(this.toolbar.Toolbar_BBox_State){
			document.body.style.cursor = '';
		}
	}
	onViewerMousedown(e){
		this.mousedownState=true;
		//console.log("mousedown point x=%s y=%s",e.point.x,e.point.y)
		if(this.toolbar.Toolbar_BBox_State&&this.mousedownState==true&&e.event.button==0) {
			this.zoomBBox.element = document.createElementNS(Constants.SvgNS, "rect");
			this.zoomBBox.element.style.x = e.point.x + "px";
			this.zoomBBox.element.style.y = e.point.y + "px";
			this.zoomBBox.element.style.stroke = "red";
			this.zoomBBox.element.style.strokeWidth = 3;
			this.zoomBBox.element.style.fillOpacity = 0;
			this.zoomBBox.element.style.strokeDasharray = "2.0,2.0";
			scada.overlaySvg.appendChild(this.zoomBBox.element);
			this.zoomBBox.initPoint = e.point;
		}
	}
	onViewerMouseup(e){
		if(this.toolbar.Toolbar_BBox_State&&this.mousedownState==true&&e.event.button==0){
			scada.overlaySvg.removeChild(this.zoomBBox.element);
			let boxWidth=e.point.x-this.zoomBBox.initPoint.x;
			let boxHeight=e.point.y-this.zoomBBox.initPoint.y;

			let point=new Huayou.Point(this.zoomBBox.initPoint.x,this.zoomBBox.initPoint.y);
			let size=new Huayou.Size(boxWidth,boxHeight);
			this.viewer.zoomBox(point,size);

			this.zoomBBox.initPoint={};
			this.zoomBBox.element=null;
		}
		this.mousedownState=false;
	}
	onViewerMousemove(e){
		if(this.toolbar.Toolbar_BBox_State&&this.mousedownState==true&&e.event.button==0){
			//console.log("mousemove point x=%s y=%s",e.point.x,e.point.y)
			let width=e.point.x - this.zoomBBox.initPoint.x;
			let height=e.point.y - this.zoomBBox.initPoint.y;
			this.zoomBBox.element.style.width=width + "px";
			this.zoomBBox.element.style.height=height + "px";
		}
	}
	onViewerContextmenu(e){
		if(this.toolbar.Toolbar_BBox_State){
			this.toolbar.cancelZoomBBox();
		}else{
			this.picMenus.showAt(e.event);
		}
	}
	onViewerResize(e){
		//console.log("on viewer resize e.oldWidth=%s,e.oldheight=%s",e.oldSize.width,e.oldSize.height)
		if (e.newSize.width > e.oldSize.width || e.newSize.height > e.oldSize.height) {
			let bbox=this.viewer.getBBox();
			let currentZoom = this.viewer.getCurrentZoom();
			let zoomWidth = bbox.width * currentZoom;
			let zoomHeight = bbox.height * currentZoom;
			if(bbox.width > this.viewer.width || bbox.height > this.viewer.height){
				if(this.viewer.width > zoomWidth && this.viewer.height > zoomHeight){
					this.viewer.zoomFull();
				}
			}
			this.scada.showCurrentZoom();
		}
	}
}
export {ViewEvents};
