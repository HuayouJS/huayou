
class DataClient {
	constructor(scada) {
		this.viewer = scada.viewer;
	}
	receiveData(datas) {
		//let start = Date.now();
		//let datas = JSON.parse(data);
		//datas  = {"135044385":{"text":-1}};
		for (let key in datas) {
			//attrKey = text
			for (let attrKey in datas[key]) {
				//attrValue = -1
				let attrValue = datas[key][attrKey];
				this.render(key, attrKey, attrValue);
			}
		}
	}
	render(svgId, attr, value) {
		let graph = this.viewer.graph;
		let obj = graph.querySelector("[id='" + svgId + "']");
		if (attr == "text") {
			if (obj == null) {
				console.log("id=" + svgId);
				console.log(typeof svgId);
			}
			obj.firstChild.data = value;
		} else if (attr == "visibility") {
			let vis = value == "1" ? "visible" : "hidden";
			obj.setAttribute(attr, vis);
		} else if (attr == "stroke") {
			let vis = value == "1" ? "red" : "yellow";
			obj.setAttribute(attr, vis);
		} else if (attr == "fill") {
			let vis = value == "1" ? "red" : "yellow";
			obj.setAttribute(attr, vis);
		} else if (attr == "equip") {
			let equip = obj;
			//console.log(equip.id)
			let vis = value == "1" ? "inline" : "none";
			equip.parentElement.style.display = vis;
		}
	}
}
export {DataClient}

