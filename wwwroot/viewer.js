/// import * as Autodesk from "@types/forge-viewer";
//import './myAwesomeExtension.js';
//import './VisualClusters/VisualClusters.js';
import './SpaceFitDrawingExtension/SpaceFitDrawingExtension.js'

//import * as THREE from './three.module.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import {GLTFLoader} from './GLTFLoader.js';







async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, function () {
            const config = {
                extensions: ['Autodesk.DocumentBrowser']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            viewer.setTheme('light-theme');
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        async function onDocumentLoadSuccess(doc) {
            console.log(doc);
            
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));



            await Autodesk.Viewing.EventUtils.waitUntilGeometryLoaded(viewer);








              NOP_VIEWER.loadExtension('SpaceFitDrawingExtension');




        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        viewer.setLightPreset(0);
        console.log(urn);
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
function LoadCustomModel()
{
    // console.log(THREE);
    // console.log(GLTFLoader);
    
    var geom = new THREE.SphereGeometry(10, 8, 8);
    console.log(geom);
    
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    console.log(material);
    
    var sphereMesh = new THREE.Mesh(geom, material);
    sphereMesh.position.set(1, 2, 3);
    sphereMesh.dbid = 1234567;
    //var mesh = NOP_VIEWER.impl.getRenderProxy(NOP_VIEWER.model, 198);
    //NOP_VIEWER.impl.overlayScenes
    //var ttt = Autodesk.Viewing.Document.getAecModelData(Autodesk.Viewing.BubbleNode.AEC_MODEL_DATA)
    if (!NOP_VIEWER.overlays.hasScene('custom-scene')) {
        NOP_VIEWER.overlays.addScene('custom-scene');
    }
    sphereMesh.material.depthTest = false;
    sphereMesh.renderOrder = 999;













var recu = (m)=>
    {
try {
    if (m.geometry) {
        var geom = m.geometry;
        geom.faces = []
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        
        var __Mesh = new THREE.Mesh(geom, material);
        __Mesh.position.set(1, 2, 3);
        __Mesh.dbid = getRandomInt(9999999);
        NOP_VIEWER.overlays.addMesh(__Mesh, 'custom-scene');  
    }
} catch (error) {
    
}
for (let i = 0; i < m.children.length; i++) {
    
    recu(m.children[i])
}
        
    }
    THREE.ColladaLoader().load('AssemblingBench.dae',(m)=>{
        //alert('loaded')
        console.log(m);
        //m.scene.children[0]
        NOP_VIEWER.overlays.addMesh(m.scene.children[0], 'custom-scene');
    },(p)=>{console.log(p);
    },()=>{alert('error')})


    // THREE.glTFLoader.prototype.load( './AssemblingBench.gltf', async function ( gltf ) {

    //         //const model = gltf.scene.children[0];
    //         //recu(model)
    //         //NOP_VIEWER.overlays.addMesh(model, 'custom-scene');
    //         console.log(gltf);
    //         //asd = gltf.scene.children[0];

    
    //     } );
    // const loader = new GLTFLoader().setPath( '' );
    // loader.load( './AssemblingBench.glb', async function ( gltf ) {

    //     const model = gltf.scene.children[0];
    //     recu(model)
    //     //NOP_VIEWER.overlays.addMesh(model, 'custom-scene');
    //     console.log(gltf);
    //     asd = gltf.scene.children[0];
    //     // wait until the model can be added to the scene without blocking due to shader compilation

    //     // await renderer.compileAsync( model, camera, scene );

    //     // scene.add( model );

    //     // render();

    // } );



















    //////////
    //NOP_VIEWER.overlays.addMesh(sphereMesh, 'custom-scene');
    //OR
    //NOP_VIEWER/*.impl*/.scene.add(sphereMesh);
    /////////////
    console.log(sphereMesh);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function SelectionChanged() {
    NOP_VIEWER.getProperties(NOP_VIEWER.getSelection(), data => console.log(data))
}

async function addCustomModel(viewer) {
    const sceneBuilder = await NOP_VIEWER.loadExtension('Autodesk.Viewing.SceneBuilder');
    const modelBuilder = await sceneBuilder.addNewModel({
      modelNameOverride: 'My Custom Model',
      conserveMemory: false
    });


    const boxGeometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(10, 10, 10));
const boxMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color(1, 0, 0) });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// boxMesh.matrix = new THREE.Matrix4().compose(
//   new THREE.Vector3(-10, -10, 0),
//   new THREE.Quaternion(0, 0, 0, 1),
//   new THREE.Vector3(1, 1, 1)
// );
boxMesh.dbId = 12345; // Use this dbId in Viewer APIs as usual
modelBuilder.addMesh(boxMesh);

console.log(boxMesh);

  }
//'Conduit without Fittings [947035]'
  function findNodeIdbyName(name) {
    var tree = NOP_VIEWER.model.getInstanceTree()
    let nodeList = Object.values(tree.nodeAccess.dbIdToIndex);
    for (let i = 0, len = nodeList.length; i < len; ++i) {
        if (tree.getNodeName(nodeList[i]) === name) {
            return nodeList[i];
        }
    }
    return null;
}

var  MoveElements = async () =>
    {
        let dbids = []
        await NOP_VIEWER.getProperties(NOP_VIEWER.getSelection(), async(data) => {
            Move(data.dbId)
        })
        
    }
    async function Move(dbids) {
        //console.log()
        console.log(dbids)
        let fragIds = []
        for (let i = 0; i < dbids.length; i++) {
            let dbid = dbids[i];
            await NOP_VIEWER.model.getInstanceTree().enumNodeFragments(dbid, (fragId)=> {
                fragIds = [...fragIds, fragId]
            
            });
        }
    console.log(fragIds)
          for (let i = 0; i < fragIds.length; i++) {
            let fragId = fragIds[i];
            
    
            var fragProxy = NOP_VIEWER.impl.getFragmentProxy(
        NOP_VIEWER.model,
        fragId);
    
    fragProxy.getAnimTransform();
    
    
    
    var position = new THREE.Vector3(
        100,100,100);
    
      fragProxy.position = position;
    
    
    fragProxy.updateAnimTransform();
    
}  
NOP_VIEWER.impl.sceneUpdated(true);
    
    
        
    }
//477
//593
// var fragProxy = viewer.impl.getFragmentProxy(
//     viewer.model,
//     fragId);
// fragProxy.getAnimTransform();

// var offset = {

//     x: _hitPoint.x - fragProxy.position.x,
//     y: _hitPoint.y - fragProxy.position.y,
//     z: _hitPoint.z - fragProxy.position.z
// };

// fragProxy.offset = offset;

// var position = new THREE.Vector3(
//     _transformMesh.position.x - fragProxy.offset.x,
//     _transformMesh.position.y - fragProxy.offset.y,
//     _transformMesh.position.z - fragProxy.offset.z);

//   fragProxy.position = position;


// fragProxy.updateAnimTransform();

// viewer.impl.sceneUpdated(true);