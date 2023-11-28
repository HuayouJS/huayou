import {DataClient} from "./dataClient.js"

class DataServer {
	constructor(scada) {
		this.viewer = scada.viewer;
		this.scada = scada;
		this.timer=null;
		this.dataClient = new DataClient(scada);
	}
	start(){
		let renderElementAttrs = this.getRenderElementAttrs();
		this.timer  =  setInterval(()=>{this.send(renderElementAttrs)}, 1000);
		this.scada.registerDataServer(this);
	}
	send(elementAttrs){
		//datas  = {"135044385":{"text":-1}};
		for (let key in elementAttrs) {
			//attrKey = text
			for (let attrKey in elementAttrs[key]) {
				elementAttrs[key][attrKey] = Math.round(Math.random());//0 or 1
			}
		}
		this.dataClient.receiveData(elementAttrs);
	}
	stop(){
		clearInterval(this.timer);
		this.scada.unregisterDataServer();
	}
	getRenderElementAttrs(){
		//let texts,rects,lines,paths,polylines,ellipses,equips;
		//{ "135044385":{"text":-1},"135044386":{"line":-1} }
		let datas={};
		//{"135044385":{"text":-1}};
		let data;
		let graph = this.viewer.graph;
		let layer=graph.layers.get("layer220");
		let childs = layer.children;
		let len = childs.length;
		for (let i=0;i<len ;i++ ){
			let el = childs[i];
			let isAttr = el.getAttribute("huayou:is");
			let tagName = el.tagName;
			if(null==isAttr){
				if(tagName=="text"){
					data=this.getTexts(el,i);
				}else if(tagName=="rect"){
					data=this.getRects(el,i);
				}else if(tagName=="line"){
					data=this.getLines(el,i);
				}else if(tagName=="path"){
					data=this.getPaths(el,i);
				}else if(tagName=="polyline"){
					data=this.getPolylines(el,i);
				}else if(tagName=="ellipses"){
					data=this.getEllipses(el,i);
				}
			}else{
				//data = getEquips(el);
				data = this.getEquips(el,i);
			}
			datas = Object.assign(datas,data);
		}
		//let datas = Object.assign(texts,rects,lines,paths,polylines,ellipses);
		//console.log(data);
		return datas;
	}
	getEquips(el,i){
		let data={};
		let element = el.firstElementChild;
		let objId = element.id;
		let value = {"equip":-1};
		if (objId=="")
		{
			objId="auto_equip"+i;
			element.setAttribute("id",objId);
		}
		data[objId]=value;
		//console.log(objId);
		return data;
	}
	getTexts(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_text"+i;
			el.setAttribute("id",objId);
		}
		let value = {"text":-1};
		data[objId]=value;
		//let  = {"135044385":{"text":-1}};
		return data;
	}
	getRects(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_rect"+i;
			el.setAttribute("id",objId);
		}
		let value = {"fill":-1};
		data[objId]=value;

		return data;
	}
	getLines(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_line"+i;
			el.setAttribute("id",objId);
		}

		let value = {"stroke":-1};
		data[objId]=value;

		return data;
	}
	getPaths(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_path"+i;
			el.setAttribute("id",objId);
		}
		let value = {"stroke":-1};
		data[objId]=value;
		return data;
	}
	getPolylines(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_polyline"+i;
			el.setAttribute("id",objId);
		}

		let value = {"stroke":-1};
		data[objId]=value;

		return data;
	}
	getEllipses(el,i){
		let data={};
		let objId = el.id;
		if (objId=="")
		{
			objId="auto_ellipse"+i;
			el.setAttribute("id",objId);
		}

		let value = {"stroke":-1};
		data[objId]=value;

		return data;
	}
}

export {DataServer}
