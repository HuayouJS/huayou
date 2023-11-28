
class EquipEvents{
    constructor(scada) {
        this.viewer = scada.viewer;
        this.bkMenus=this.createBKMenus();
        this.eqiupComMenus = this.createEqiupComMenus();
        this.initEevent();
    }
    initEevent(){
        let graph=this.viewer.graph;
        let equips = graph.querySelectorAll("[classify='Equipment']")
        for (let i = 0; i < equips.length; i++) {
            let equip = equips[i].parentElement;
            equip.addEventListener("contextmenu",(e)=>{this.onEquipmentContextmenu(e)});
        }
    }
    onEquipmentContextmenu(e){
        //alert(e.target);
        let equip=e.currentTarget.firstElementChild;
        let equipType=equip.getAttribute("equiptype");
        if (equipType=="CBreaker" || equipType=="Disconnector" || equipType=="DollyBreaker"|| equipType=="GroundDisconnector")
        {
            this.bkMenus.showAt(e);
            this.bkMenus.equip=equip;
        }else{
            this.eqiupComMenus.showAt(e);
            this.eqiupComMenus.equip=equip;
        }
        e.stopPropagation();
        e.preventDefault();
    }
    createBKMenus(){
        let menuBK = new dhx.ContextMenu(null, {css: "dhx_widget--bg_gray"});
        let menuBKData = [
            { id:"equip_info",value: "equip_info", icon: "dxi dxi-file-outline",},
            { id:"menu_1",value: "menu_1", icon: "dxi dxi-file-outline",},
            { id:"menu_2",value: "menu_2", icon: "dxi dxi-file-outline",},
            { id:"menu_3",value: "menu_3", icon: "dxi dxi-file-outline",},
            { id:"menu_4",value: "menu_4", icon: "dxi dxi-file-outline",},
            {type: "separator"},
            { id:"menu_5",value: "menu_5", icon: "dxi dxi-file-outline",},
            { id:"menu_6",value: "menu_6", icon: "dxi dxi-file-outline",},
        ];

        menuBK.data.parse(menuBKData);
        menuBK.events.on("Click", function(id,e){
            if(id=="equip_info"){
                //alert(id);
                alert("equip.id="+menuBK.equip.id);
            }
            if(id=="menu_1"){
                alert("equip.id="+menuBK.equip.id);
            }
        });
        return menuBK;
    }
    createEqiupComMenus(){
        let menuEqiupCom = new dhx.ContextMenu(null, {css: "dhx_widget--bg_gray"});
        let menuEqiupComData = [
            { id:"equip_info",value: "equip_info", icon: "dxi dxi-file-outline",},
            { id:"menu_1",value: "menu_1", icon: "dxi dxi-file-outline",},
            {type: "separator"},
            { id:"menu_2",value: "menu_2", icon: "dxi dxi-file-outline",},
            { id:"menu_3",value: "menu_3", icon: "dxi dxi-file-outline",},
        ];

        menuEqiupCom.data.parse(menuEqiupComData);
        menuEqiupCom.events.on("Click", function(id,e){
            //alert(id);
            if(id=="equip_info"){
                //alert(id);
                alert("equip.id="+menuEqiupCom.equip.id);
            }
            if(id=="menu_1"){
                //alert("equip.id="+menuBK.equip.id);
            }
        });

        return menuEqiupCom;
    }

}

export {EquipEvents}

