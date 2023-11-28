import Huayou from "../../../dist/huayou.esm.min.js";

class Query {
    constructor(scada) {
        this.viewer = scada.viewer;
        this.scada = scada;
    }
    openWindow(){
        let equipWindow = new dhx.Window({
            title: "query",
            width: 250,
            height: 410,
            modal: false,
            resizable: true,
            movable: true,
            closable: true,
        });
        const dataset = this.treeDataset();
        const tree = new dhx.Tree("tree_container", {
            data: dataset
        });
        tree.events.on("itemClick",(id,e)=>{this.findAndLocate(id)});
        equipWindow.attach(tree);
        equipWindow.show();
        equipWindow.setPosition(15,50);
        //equipWindow.events.on("afterhide", function () {
        //eventHandler(event, arguments);
        //});
    }
    treeDataset(){
        const dataset = [{
            "value": "Station",
            "id": "station",
            "opened": true,
            "items": [
                {
                    "value": "1#transformer",
                    "id": "103001770"
                }, {
                    "value": "2#transformer",
                    "id": "103000279"
                }, {
                    "value": "130#breaker",
                    "id": "100003280"
                },{
                    "value": "135044385#text",
                    "id": "135044385"
                }
            ]
        }];
        return dataset;
    }
    findAndLocate(equipId){
        let graph=this.viewer.graph;
        if (equipId == "station") return;
        let element=graph.getElementById(equipId);
        if(element===null){
            alert("donot find element from id="+equipId);
            return;
        }
        let bbox =element.getBBox();
        let y=bbox.y+(bbox.height)/2,
            x=bbox.x+(bbox.width)/2;
        let point=new Huayou.Point(x,y);
        this.viewer.center(point);
    }
}
export {Query}