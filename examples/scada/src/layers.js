
class Layers {
    constructor(scada) {
        this.viewer = scada.viewer;
        this.scada = scada;
        this.layerGrid = null;
    }
    openWindow(){
        const grid = new dhx.Grid("grid", {
            columns: [
                { width: 60, id: "no", header: [{ text: "No" }] },
                { width: 360, id: "name", header: [{ text: "layer" }] },
            ],
            headerRowHeight: 50,
            dragItem: "both", // "column", "row", "both"
            //data: dataset,
            selection: "row",
            sortable: false,
            multiselection: false
        });
        this.layerGrid=grid;

        let graph=this.viewer.graph;
        let layers = graph.layers;
        let row={no:0,name:""};
        for(const array of layers.entries() ){
            //array[0]===key,array[1]===value
            let row={no:0,name:""};
            //console.log("entries---layer.index=%d,name=%s",array[0],array[1].name,);
            row.no=array[0]+1;
            row.name=array[1].name;
            grid.data.add(row,array[0]);
        };
        const form = new dhx.Form("form_container", {
            css: "dhx_widget--bg_white dhx_widget--bordered",
            cols: [
                {
                    type: "button",
                    value: "UP",
                    name: "button",
                    id:"button_up",

                }, {
                    type: "button",
                    value: "Down",
                    name: "button",
                    id:"button_down",
                },
            ]
        });
        form.getItem("button_up").events.on("click", () => {
            const cell = this.layerGrid.selection.getCell();
            if (cell !== undefined) {
                //this.layerGrid.data.remove(cell.row.id);
                this.layerUp(cell.row.id);
            }else {
                alert("Please select the layer that needs to be moved");
            }
        });
        form.getItem("button_down").events.on("click", () => {
            const cell = this.layerGrid.selection.getCell();
            if (cell !== undefined) {
                //this.layerGrid.data.remove(cell.row.id);
                this.layerDown(cell.row.id);
            }else {
                alert("Please select the layer that needs to be moved");
            }
        });

        const layout = new dhx.Layout("layout", {
            rows: [
                {
                    id: "list",
                    height: "80%"
                },
                {
                    id: "dataview",
                    height: "10%"
                }
            ]
        });

        let equipWindow = new dhx.Window({
            title: "Layer Mnager",
            width: 500,
            height: 410,
            modal: false,
            resizable: true,
            movable: true,
            closable: true
        });

        equipWindow.attach(layout);
        layout.getCell("list").attach(grid);
        layout.getCell("dataview").attach(form);
        equipWindow.show();
        equipWindow.setPosition(15,50);
    }
    layerUp(rowid){
        let index=this.layerGrid.data.getIndex(rowid);
        if(index==0) return;
        let upRowIndex=index-1;
        let upRowId=this.layerGrid.data.getId(upRowIndex);
        this.layerGrid.data.move(index,'up');
        this.layerGrid.data.update(rowid,{no:index});
        this.layerGrid.data.update(upRowId,{no:(index+1)});

        let item=this.layerGrid.data.getItem(rowid);
        let name=item.name;
        let graph=this.viewer.graph;
        let layer=graph.layers.get(name);
        graph.layers.move(layer,index-1);

        this.layerGrid.selection.setCell(rowid);
    }
    layerDown(rowid){
        let index=this.layerGrid.data.getIndex(rowid);
        let rowCount = this.layerGrid.data.getLength();
        if(rowCount == (index+1)) return;
        let upRowIndex=index+1;
        let upRowId=this.layerGrid.data.getId(upRowIndex);
        this.layerGrid.data.move(index,'down');
        this.layerGrid.data.update(rowid,{no:(index+2)});
        this.layerGrid.data.update(upRowId,{no:(index+1)});
        //const cell = layerGrid.selection.getCell();
        //layerGrid.data.getItem(id);
        let item=this.layerGrid.data.getItem(rowid);

        let name=item.name;
        let graph=this.viewer.graph;
        let layer=graph.layers.get(name);
        graph.layers.move(layer,index+2);
    }
}
export {Layers}