
const Getstarted = {
    label: 'Get Started',
    folder: 'getstarted',
    children: [
        {
            id: 1, label: 'Hello World', file: 'helloworld.html'
        }, {
            label: 'ES Module', file: 'esmodule.html'
        }, {
            label: 'SVG model load', file: 'svgmodelload.html'
        }, {
            label: 'SVG model sync load ', file: 'svgmodelSyncload.html'
        },{
            label: 'NPM install ', file: 'npminstall.html'
        },
    ]
}
const Viewer = {
    label: 'Viewer',
    folder: 'viewer',
    children: [
        {
            label: 'Border & Background', file: 'borderAndBg.html'
        }, {
            label: 'Width & Height', file: 'widthHeight.html'
        },  {
            label: 'Viewer BBox', file: 'viewerBBox.html'
        }, {
            label: 'on/off enabling attributes', file: 'onoff.html'
        }, {
            label: 'Event Listener add/remove ', file: 'eventListenerAddRemove.html'
        },{
            label: 'Event Listener Parameters', file: 'eventListenerParameter.html'
        },
    ]
}

const Graph = {
    label: 'Graph',
    folder: 'graph',
    children: [
        {
            label: 'Create blank Graph', file: 'createBlankGraph.html'
        },{
            label: 'Layers & Layer of Graph', file: 'layersAndLayer.html'
        },{
            label: 'Defs of Graph', file: 'defs.html'
        }, {
            label: 'Style of Graph', file: 'style.html'
        },{
            label: 'Metatdata of Graph', file: 'metadata.html'
        }, {
            label: 'Create by ModeledSVG ', file: 'createByModeledSVG.html'
        },{
            label: 'Obtain ModeledSVG Copy', file: 'obtainSVGCopy.html'
        }, {
            label: 'Simplest Model example', file: 'simplestModel.html'
        }, {
            label: 'Network Model example', file: 'networkModel.html'
        },
    ]
}

const Layer = {
    label: 'Layer',
    folder: 'layer',
    children: [
        {
            label: 'Layer Manager', file: 'layerManager.html'
        }, {
            label: 'Layer show/hide', file: 'showHide.html'
        },{
            label: 'Located in which layer', file: 'locatedIn.html'
        }, {
            label: 'Layers & Iterator', file: 'layersIterator.html'
        },
    ]
}

const PanZoom = {
    label: 'Pan And Zoom',
    folder: 'panzoom',
    children: [
        {
            label: 'Pan', file: 'pan.html'
        },{
            label: 'Pan limit', file: 'panLimit.html'
        },
        {
            label: 'Zoom', file: 'zoom.html'
        }, {
            label: 'fit & center & full &...', file: 'fit.html'
        },
    ]
}

const NodeOperation = {
    label: 'Node Operation',
    folder: 'nodeoperation',
    children: [
        {
            label: 'Node within Layer', file: 'withinLayer.html'
        }, {
            label: 'Node within Defs', file: 'withinDefs.html'
        }, {
            label: 'Node within Style', file: 'withinStyle.html'
        }, {
            label: 'Node within Metadata', file: 'withinMetadata.html'
        },
    ]
}

const Find = {
    label: 'Find',
    folder: 'find',
    children: [
        {
            label: 'Find in Graph', file: 'inGraph.html'
        }, {
            label: 'Find in Layers', file: 'inLayers.html'
        }, {
            label: 'Find in Layer', file: 'inLayer.html'
        }, {
            label: 'Find in Defs', file: 'inDefs.html'
        }, {
            label: 'Find in Metadata', file: 'inMetadata.html'
        },
    ]
}

const Interaction = {
    label: 'Event And Interaction',
    folder: 'interaction',
    children: [
        {
            label: 'Viewer Events', file: 'viewerEvents.html'
        },{
            label: 'Element Events', file: 'elementEvents.html'
        },
    ]
}

const CoordSystems = {
    label: 'Coordinate Systems',
    folder: 'coordinate',
    children: [
        {
            label: 'Viewport Coordinate System', file: 'viewportCS.html'
        }, {
            label: 'User Coordinate System', file: 'userCS.html'

        }, {
            label: 'Transformations', file: 'transform.html'
        },
    ]
}

const Advanced = {
    label: 'Advanced',
    folder: 'advanced',
    children: [
        {
            label: 'Viewer resize', file: 'viewerResize.html'
        }, {
            label: 'Viewer destory & replace', file: 'viewerDestory.html'
        }, {
            label: 'Import from Inkscape', file: 'inkscape.html'
        }, {
            label: 'Load animation', file: 'loading.html'
        },
    ]
}

const Contents = {
    data: [Getstarted, Viewer, Graph, Layer, PanZoom, NodeOperation, Find, Interaction, CoordSystems, Advanced],
}

