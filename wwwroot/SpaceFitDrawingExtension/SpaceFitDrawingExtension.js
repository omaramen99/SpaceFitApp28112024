// Content for 'SpaceFitDrawingExtension.js'
import { Wall } from './Models/Wall.js'; 
import { ElementStyle } from "./Models/ElementStyle.js";
import { WallType } from "./Models/WallType.js";

function SpaceFitDrawingExtension(viewer, options) {
  
    Autodesk.Viewing.Extension.call(this, viewer, options);
  }
  
  SpaceFitDrawingExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
  SpaceFitDrawingExtension.prototype.constructor = SpaceFitDrawingExtension;

   SpaceFitDrawingExtension.prototype.CustomScene = "drawing-custom-scene";
  SpaceFitDrawingExtension.prototype.load = function() {

    ActivateEdit2D();

    var style1 = new ElementStyle('rgb(255,0,0)', 0.3, 'rgb(0,0,0)', 1,11);
    var style2 = new ElementStyle('rgb(0,255,0)', 0.3, 'rgb(0,0,0)', 1,11);

    var wallType1 = new WallType("Exterior Wall Type", 0.3, style1);
    var wallType2 = new WallType("Interior Wall Type", 0.1, style2);
 
    window.wallTypes = [wallType1, wallType2];
    window.selectedWallType = window.wallTypes[0]
    window.originalWallType = true
    window.firstDrawAlert = true
    window.document.walls = []

    // if (!NOP_VIEWER.overlays.hasScene(SpaceFitDrawingExtension.prototype.CustomScene)) {
    //   NOP_VIEWER.overlays.addScene(SpaceFitDrawingExtension.prototype.CustomScene);
    // }
    //NOP_VIEWER.setSelectionColor(new THREE.Color(1, 1, 0),Autodesk.Viewing.SelectionMode.REGULAR)
    
    //OnSelectionChanged()
    return true;
  };
  
  SpaceFitDrawingExtension.prototype.unload = function() {
    if (this.subToolbar) {
      this.viewer.toolbar.removeControl(this.subToolbar);
      this.subToolbar = null;
  }
    return true;
  };

  SpaceFitDrawingExtension.prototype.onToolbarCreated =  function(toolbar) {

    var button1 = new Autodesk.Viewing.UI.Button('draw-wall');
    button1.onClick = async function(e) {
      //Action

// Create instances of THREE.Vector2 for the start and end points
// const startPoint = new THREE.Vector2(0, 0);
// const endPoint = new THREE.Vector2(3, 4);

// // Create a new LineBasedElement object
// const wall = new Wall(startPoint, endPoint);

// // Access properties and methods of the LineBasedElement object
// console.log(wall);

// console.log("Start Point:", wall.StartPoint);
// console.log("End Point:", wall.EndPoint);
// console.log("Length:", wall.Length);

if (window.firstDrawAlert) {
  
  alert("Press Enter to finish drawing");
  window.firstDrawAlert = false;
}
CreateWall()






      //DrawSimpleLine();
      //DrawSimpleRectangle(true);
      //addCustomModel(NOP_VIEWER)
      // ActivateEdit2D()
      //scene.add( line );
      //renderer.render( scene, camera );


      



      // ResetMoveElements()


      // // // var glTFExtension = await NOP_VIEWER.loadExtension('Autodesk.glTF');
      // // //  NOP_VIEWER.loadModel('./AssemblingBench.glb');


  };
  //////////////////##################################################################################
  button1.addClass('show-env-bg-button');
  button1.innerText = "i"
  button1.setToolTip('Create Wall');




  var button2 = new Autodesk.Viewing.UI.Button('switch-type');
  button2.onClick = async function(e) {
    //Action

    window.selectedWallType = window.originalWallType? window.wallTypes[1]:window.wallTypes[0];
    window.originalWallType = !window.originalWallType;
alert(`Now using wall type: ${window.selectedWallType.Name}`)
};
//button2.addClass('hide-env-bg-button');
button2.setToolTip('Switch Wall Type');
button2.innerText = "Switch Type"

var button3 = new Autodesk.Viewing.UI.Button('styling-last');
button3.onClick = async function(e) {
  //Action
// Configure shape style

var p = layer.shapes[layer.shapes.length - 1]
var style = p.style;
console.log(style);

style.fillColor = 'rgb(255,255,255)';
style.fillAlpha = 0.3;
style.lineWidth = 1.0;
style.lineStyle = 11;

// show changes
layer.update();

};
button3.addClass('show-env-bg-button');
button3.setToolTip('styling last');

var button4 = new Autodesk.Viewing.UI.Button('edit');
button4.onClick = async function(e) {
  //Action
  startTool(tools.polygonEditTool);

};
button4.addClass('show-env-bg-button');
button4.setToolTip('edit');

var button5 = new Autodesk.Viewing.UI.Button('back');
button5.onClick = async function(e) {
  //Action
  ResetDrawingTools()

};
button5.addClass('show-env-bg-button');
button5.setToolTip('back');

  // var button2 = new Autodesk.Viewing.UI.Button('hide-env-bg-button');
  // button2.onClick = async function(e) {
  //   //Action
  //   //MoveElements()

  //   NOP_VIEWER.getProperties(NOP_VIEWER.getSelection(),async data => 
  //     {
  //       //let data = {}
  //       //data.dbId = 
  //       //[10013,8930, 8938, 8944, 8958, 9730, 9839, 9844, 9847, 9850, 9883, 9945, 10007, 10021, 10024, 10027, 10030, 12194, 12197, 12205, 12208, 12211, 12214, 12217, 12220, 12223, 12226]
  //       //[8930, 9698, 9698, 9698, 9698, 9698, 9698, 9836, 9836, 9836, 9836, 9898, 9904, 9912, 9915, 9918, 9921, 9924, 9927, 9933, 9933, 9933, 9933, 9810, 12091, 12094, 12097, 12100, 12103, 12106, 12109, 12112, 12115, 12115, 12115, 12115, 12115, 12115, 9810, 12191, 12191, 12191, 12253, 12253, 12253, 12253, 12253]
  //       //[8930, 8938, 8944, 8958, 9730, 9839, 9844, 9847, 9850, 9883, 9945, 10007, 10013, 10021, 10024, 10027, 10030, 12194, 12197, 12205, 12208, 12211, 12214, 12217, 12220, 12223, 12226]

  //       let initialMergedBox = getAllMergedWorldBoundingBoxById(NOP_VIEWER.impl.model, data.dbId)
  //       let initialMergedBoxCenter = GetBoxCenter(initialMergedBox)

  //       let dx = Math.abs(initialMergedBox.max.x - initialMergedBox.min.x )
  //       let dy = Math.abs(initialMergedBox.max.y - initialMergedBox.min.y )
  //       let dz = Math.abs(initialMergedBox.max.z - initialMergedBox.min.z )

  //       let shiftedPoint = move3DPoint(initialMergedBoxCenter, new THREE.Vector3(0,1,0), 10 + ((Math.max(dx,dy,dz)*1)))

  //       shiftedPoint = move3DPoint(shiftedPoint, new THREE.Vector3(0,0,-1), 1 + (dz/2))

        
  //       await ScatterElements(NOP_VIEWER , NOP_VIEWER.impl.model, data.dbId, shiftedPoint, SpaceFitDrawingExtension.prototype.reset)
        
        
  //       console.log("Done: ALL");
  //       SpaceFitDrawingExtension.prototype.reset = !SpaceFitDrawingExtension.prototype.reset
  //     })


  // };
  // button2.addClass('hide-env-bg-button');
  // button2.innerText = "i"
  // button2.setToolTip('Hide Environment');


  this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-toolbar');
  this.subToolbar.addControl(button1);
  this.subToolbar.addControl(button2);
  // this.subToolbar.addControl(button3);
  // this.subToolbar.addControl(button4);
  // this.subToolbar.addControl(button5);

  toolbar.addControl(this.subToolbar);



  };

 function ResetDrawingTools() {
  startTool();
 }

 function CreateWall() {
  console.log(`Using Wall Type: ${window.selectedWallType.Name}`);
  console.log(window.selectedWallType);
  startTool();
  edit2d.defaultContext.layer.addEventListener("shapeAdded", 
      StartDrawingWall
    )
  startTool(tools.polylineTool);







 }

 function StartDrawingWall(ev) {
  console.log("will draw wall");
  
  edit2d.defaultContext.layer.removeEventListener("shapeAdded", 
    StartDrawingWall
  )

  startTool(tools.polygonEditTool);

  
  
  var lastShape = layer.shapes[layer.shapes.length - 1]
  var arr = lastShape._loops[0]

  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    let s = arr[i-1];
    let e = arr[i];
    
    CreateModelWall(s, e)

  }



  
  
  

 }
 function CreateModelWall(start, end) {
  let s = start;
  let e = end;


  // Create instances of THREE.Vector2 for the start and end points
   const startPoint = new THREE.Vector2(s.x, s.y);
   const endPoint = new THREE.Vector2(e.x, e.y);
  
  // Create a new LineBasedElement object
  const wall = Wall.Create(startPoint, endPoint, window.selectedWallType);
  

  // Create simple triangle
  var poly = new Autodesk.Edit2D.Polygon(wall.Polygon);
  var style = poly.style;
  style.fillColor = wall.WallType.WallStyle.FillColor;
  style.fillAlpha = wall.WallType.WallStyle.FillAlpha;
  style.lineColor = wall.WallType.WallStyle.LineColor;
  style.lineWidth = wall.WallType.WallStyle.LineWidth;
  style.lineStyle = wall.WallType.WallStyle.LineStyle;

  // Show it
  layer.addShape(poly);
  window.document.walls.push(wall)
  console.log(wall);

 }


  function DrawLine(start, end, colorHex) {
    const material = colorHex ? new THREE.LineBasicMaterial( { color: colorHex } ):  new THREE.LineBasicMaterial( { color: 0x000000 } );

    const points = [];
    points.push( start );
    points.push( end );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.LineSegments( geometry, material );

    NOP_VIEWER.overlays.addMesh(line, SpaceFitDrawingExtension.prototype.CustomScene);
  }


  function DrawSimpleRectangle(outlinesOnly) {








    const geometry = new THREE.BoxGeometry( 100, 100, 100 ); 
    
    //scene.add( cube );
    if (outlinesOnly) {
      
      //const wireframe = new THREE.WireframeHelper( geometry ,0xff0000);
      
      //const line = new THREE.LineSegments( wireframe );
      // line.material.depthTest = false;
      // line.material.opacity = 0.25;
      // line.material.transparent = true;
      //console.log(line.material);
      
      
      
      
      //var geo = CreateModelWireframes_2(geometry, true,{R:"0.0",G:"0.0",B:"0.0",A:"0.5"})
      //const cube = new THREE.Mesh( geo, material ); 
      
      // var material = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.5, linewidth: 3, vertexColors: THREE.VertexColors } );
      var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      var object = new THREE.LineSegments( geometry, material );
      
      NOP_VIEWER.overlays.addMesh(object, 'working-bench-custom-scene');
    }else
{
  
  const material = new THREE.MeshBasicMaterial( {color: 0x000000} );
  const cube = new THREE.Mesh( geometry, material );
  NOP_VIEWER.overlays.addMesh(cube, 'working-bench-custom-scene');

}




  }
  const CreateModelWireframes_2 = (mainGeometry,isEdgeGeo,RGBA) => 
    {
    
      const wireFrameShaderMaterial = new THREE.ShaderMaterial( {
    
        uniforms: { 'thickness': { value: 0.01 } },
        vertexShader: `			
        attribute vec3 center;
        varying vec3 vCenter;
    
        void main() {
    
        vCenter = center;
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    
        }
        `,
        fragmentShader: `
        uniform float thickness;
    
        varying vec3 vCenter;
    
        void main() {
        
          vec3 afwidth = fwidth( vCenter.xyz );
        
          vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );
        
          float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
        
          gl_FragColor.rgb = gl_FrontFacing ? vec3( ${RGBA.R}, ${RGBA.G}, ${RGBA.B} ) : vec3( ${RGBA.R},${RGBA.G},${RGBA.B} );
          gl_FragColor.a = ${RGBA.A};
        
        }
        `,
        side: THREE.DoubleSide,
        alphaToCoverage: true // only works when WebGLRenderer's "antialias" is set to "true"
    
      } );
      //material2.extensions.derivatives = true;
      if (isEdgeGeo) {
        
        return new THREE.LineSegments( mainGeometry, wireFrameShaderMaterial );
      }else
      {
        return new THREE.LineSegments( new THREE.EdgesGeometry( mainGeometry), wireFrameShaderMaterial );
      }
      //return new THREE.Mesh( mainGeometry, wireFrameShaderMaterial );
    }

    const CreateModelWireframes = (mainGeometry) => 
      {
        let geometryEdges = new THREE.EdgesGeometry( mainGeometry,45 ); // or WireframeGeometry( mainGeometry )				//
        // let wireMaterial = new THREE.LineBasicMaterial( {
        // 	color: 0xffffff,
        // 	linewidth: 0.1,
        // 	transparent: true,
        // 	opacity: 0.4,
        // 	clippingPlanes : localPlanes
        // } );
        let wireMaterial = new THREE.LineBasicMaterial( {
          color: 0x000000,
          linewidth: 0,
          linecap : " butt",
          linejoin: "miter",
          
        } );
        return new THREE.LineSegments( geometryEdges, wireMaterial );	
        //return new THREE.Mesh();	
      }




      async function addCustomModel(viewer) {
        const sceneBuilder = await NOP_VIEWER.loadExtension('Autodesk.Viewing.SceneBuilder');
        const modelBuilder = await sceneBuilder.addNewModel({
          modelNameOverride: 'My Custom Model drawer',
          //conserveMemory: true,
          createWireframe:true
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
    NOP_VIEWER.unloadExtension('Autodesk.Viewing.SceneBuilder')
    //##console.log(boxMesh);
    
      }


      async function ActivateEdit2D() {
        // Load Edit2D extension
        const options = {
          // If true, PolygonTool creates Paths instead of just Polygons. This lets you change segments to arcs.
          enableArcs: true
        };

        const edit2d = await NOP_VIEWER.loadExtension('Autodesk.Edit2D');

        // Register all standard tools in default configuration
        edit2d.registerDefaultTools();


        // Code follows example above

        const ctx = edit2d.defaultContext;

        // {EditLayer} Edit layer containing your shapes
        ctx.layer

        // {EditLayer} An additional layer used by tools to display temporary shapes (e.g. dashed lines for snapping etc.)
        ctx.gizmoLayer

        // {UndoStack} Manages all modifications and tracks undo/redo history
        ctx.undoStack

        // {Selection} Controls selection and hovering highlight
        ctx.selection

        // {Edit2DSnapper} Edit2D snapper
        ctx.snapper


        //##########################

        // Facilitate access to extension and layer
        window.edit2d = NOP_VIEWER.getExtension('Autodesk.Edit2D');
        window.layer  = edit2d.defaultContext.layer;
        window.tools  = edit2d.defaultTools;

        // Convenience function for tool switching per console. E.g. startTool(tools.polygonTool)
        window.startTool = function(tool) {
        
            var controller = NOP_VIEWER.toolController;
        
            // Check if currently active tool is from Edit2D
            var activeTool = controller.getActiveTool();
            var isEdit2D = activeTool && activeTool.getName().startsWith("Edit2");
        
            // deactivate any previous edit2d tool
            if (isEdit2D) {
                controller.deactivateTool(activeTool.getName());
                activeTool = null;
            }
          
            // stop editing tools
            if (!tool) {
                return;
            }
          
            controller.activateTool(tool.getName());
        }
        OnShape2DSelectionChanged()
      }

      function OnShape2DSelectionChanged() {
        edit2d.defaultContext.selection.addEventListener("selectionChanged",(e)=>{console.log(e)})
      }

  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  //#############################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
  SpaceFitDrawingExtension.prototype.reset = false
  SpaceFitDrawingExtension.prototype.lastSelected = []
  function areArraysIdentical(arr1, arr2) {
    
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

 function OnSelectionChanged() {
  console.log("sel");
  
    NOP_VIEWER.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,  function () 
    {
      NOP_VIEWER.getProperties(NOP_VIEWER.getSelection(), data => 
      {
        if (data.dbId.length == 0 || areArraysIdentical(SpaceFitDrawingExtension.prototype.lastSelected, data.dbId)) { return }

        console.log(data.dbId)
        var fragsIds = _GetElementAllFragIds(NOP_VIEWER.model, data.dbId[0])
        console.log(fragsIds);
         
        for (let i = 0; i < fragsIds.length; i++) {
         // listFragmentPrimitives(fragsIds[i]);
console.log("###########################################################");

        }

        
        let parentsIds = []
        for (let i = 0; i < data.dbId.length; i++) {
          const element = data.dbId[i];
          parentsIds.push(getParentComponent(NOP_VIEWER, element))
          
        }
        
        
        console.log(parentsIds);
        SpaceFitDrawingExtension.prototype.lastSelected = parentsIds
        NOP_VIEWER.select()
        NOP_VIEWER.select(parentsIds)
        for (let i = 0; i < parentsIds.length; i++) {
          const p = parentsIds[i];
          console.log(GetElementTree(NOP_VIEWER, p));
        }

        let tree = NOP_VIEWER.impl.model.getInstanceTree();
        tree.enumNodeFragments(parentsIds[0], function (fragId) 
        {
          console.log(fragId);
          
          var box = getWorldBoundingBox(NOP_VIEWER.model, [fragId])
          console.log(box);
          
        })

      })

    });
}



function listFragmentPrimitives(fragId) {
  const frags = NOP_VIEWER.model.getFragmentList();
  const mesh = frags.getVizmesh(fragId);
  const vbr = new Autodesk.Viewing.Private.VertexBufferReader(mesh.geometry, NOP_VIEWER.impl.use2dInstancing);
  vbr.enumGeoms(null, {
    onLineSegment: function (x1, y1, x2, y2, vpId) {
      console.log('found line', x1, y1, x2, y2);

    //   var poly = new Autodesk.Edit2D.Polygon([
    //     {x: 53, y: 24},
    //     {x: 62, y: 24},
    //     {x: 57, y: 34}
    // ]);
    //Create polyline
var polyline = new Autodesk.Edit2D.Polyline([
  {x: x1, y: y1},
  {x: x2, y: y2},

]);
    // Show it
    layer.addShape(polyline);


    },
    onCircularArc: function (cx, cy, start, end, radius, vpId) {
      console.log('found circular arc', cx, cy, start, end, radius);
    },
    onEllipticalArc: function (cx, cy, start, end, major, minor, tilt, vpId) {
      console.log('found elliptical arc', cx, cy, start, end, major, minor, tilt);
    },
    onOneTriangle: function (x1, y1, x2, y2, x3, y3, vpId) {
      console.log('found triangle', x1, y1, x2, y2, x3, y3);
    },
    onTexQuad: function (cx, cy, width, height, rotation, vpId) {
      console.log('found quad', cx, cy, width, height, rotation);
    }
  });
}








    function move3DPoint(point, direction, distance) {
      // Create THREE.Vector3 objects for the point and direction
      const startPoint = new THREE.Vector3(point.x, point.y, point.z);
      const dirVector = new THREE.Vector3(direction.x, direction.y, direction.z);
  
      // Normalize the direction vector
      dirVector.normalize();
  
      // Calculate the new point by adding the direction vector scaled by the distance
      const newPoint = startPoint.clone().add(dirVector.clone().multiplyScalar(distance));
  
      return newPoint; // Return the new point as an object with x, y, and z properties
  }

    SpaceFitDrawingExtension.prototype.collectionScatterTransforms = []
    SpaceFitDrawingExtension.prototype.currentAnimation = {}
    async function RotateElementAndPreservePosition(viewer, model, dbId, quat, reset) {
      let box = getWorldBoundingBoxById(model, dbId)
      let center =  GetBoxCenter(box)

      if (SpaceFitDrawingExtension.prototype.currentAnimation[dbId]) {
        clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId])
      }
      
      return await new Promise(resolve => {






        SpaceFitDrawingExtension.prototype.currentAnimation[dbId] = setInterval(function () {
  
          var success = _RotateElement(viewer, model, dbId, quat, reset)
  
          let _box = getWorldBoundingBoxById(model, dbId)
          let _center =  GetBoxCenter(_box)
  
          let direction = new THREE.Vector3(center.x-_center.x, center.y-_center.y, center.z-_center.z)
          let distance = getDistance(center, _center)
          MoveElementInstantly(viewer, model, dbId, direction, distance)
          viewer.impl.invalidate(true, true);
          if (!success) {
            clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId]);
            
            resolve(true);
          }
          }, 10);
      })







    }

    function _RotateElement(viewer, model, dbId, desiredRotation, reset) {
      let step = Math.PI/180;
      let success = true;
      const tree = model.getInstanceTree();
      tree.enumNodeFragments(dbId, function (fragId) {
    
    
        const frag = viewer.impl.getFragmentProxy(model, fragId);
        
        frag.getAnimTransform();
        //console.log(frag.position);
       let  _desiredRotation = new THREE.Quaternion().setFromAxisAngle(
           getAxisAngleFromQuaternion(desiredRotation).axis
           ,getAxisAngleFromQuaternion(desiredRotation).angle);
    if (reset) {
       _desiredRotation = new THREE.Quaternion().setFromAxisAngle(
        getAxisAngleFromQuaternion(frag.quaternion).axis
        ,step/2);
        //console.log(frag.position);
      }

    
          if (getAngle(frag.quaternion, _desiredRotation) < step ) 
            {
              frag.quaternion = desiredRotation;
              success = false;
            }else
            {
              frag.quaternion =  getQuatAtAngle(frag.quaternion, _desiredRotation, step);
            }
    
          frag.updateAnimTransform();
      }, true);
    
      return success;
    
    
      
    }
async function ResetTransformElementInstantly(viewer, model, dbId) {
  if (SpaceFitDrawingExtension.prototype.currentAnimation[dbId]) {
    clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId])
  }
  return await new Promise(async resolve => {

    await ResetElementFragTransform(viewer, model, dbId)
    viewer.impl.invalidate(true, true);
resolve(true)
  })
  
}
    async function TransformElementInstantly(viewer, model, dbId, worldPosition, quaternion, updateRenderer) {

      if (SpaceFitDrawingExtension.prototype.currentAnimation[dbId]) {
        clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId])
      }
      await new Promise(resolve => {

        //SET INST
        const tree = model.getInstanceTree();
        tree.enumNodeFragments(dbId, function (fragId) {

            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
            frag.quaternion = quaternion;

            frag.updateAnimTransform();

            resolve(true)
        }, true);
      })

      let box = getWorldBoundingBoxById(model, dbId)
      let center =  GetBoxCenter(box)
      let transform = await GetElementRelativeTransform(viewer, model, dbId)
      let relativeCenter = transform.position


      
      //MoveElementInstantly(viewer, model, dbId, relativePosition)
      let direction = new THREE.Vector3((relativeCenter.x - center.x)/2,(relativeCenter.y - center.y)/2,(relativeCenter.z - center.z)/2)

      let desiredFragPosition = move3DPoint(worldPosition, direction, getDistance(center, relativeCenter))
      
      return await new Promise(resolve => {

        //SET INST
        const tree = model.getInstanceTree();
        tree.enumNodeFragments(dbId, function (fragId) {

            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
            frag.position = desiredFragPosition;

            frag.updateAnimTransform();

            if (updateRenderer) {
              viewer.impl.invalidate(true, true);
            }
              
            resolve(true)
        }, true);


      })
      
    }

    async function MoveElementInstantly(viewer, model, dbId, direction, distance) {
    

      return await new Promise(resolve => {

        const tree = model.getInstanceTree();
        tree.enumNodeFragments(dbId, function (fragId) {
            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
  
            let desiredPosition = move3DPoint(frag.position, direction, distance)
                
                frag.position = desiredPosition;
  
            frag.updateAnimTransform();
            resolve(true)
        }, true);
      })

    
      
    
    
      
    }
    async function ResetElementFragTransform(viewer, model, dbId) {
    



      const tree = model.getInstanceTree();
      return await new Promise(resolve => {

        tree.enumNodeFragments(dbId, function (fragId) {
            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
  
            
                
                frag.position = new THREE.Vector3(0,0,0);
                frag.quaternion = new THREE.Quaternion();
  
            frag.updateAnimTransform();
            resolve(true)
        }, true);
      })
    
      
    
    
      
    }
    async function SetElementFragTransform(viewer, model, dbId, transform) {
    



      const tree = model.getInstanceTree();
      return await new Promise(resolve => {

        tree.enumNodeFragments(dbId, function (fragId) {
            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
  
            
                
                frag.position = transform.position;
                frag.quaternion = transform.quaternion;
  
            frag.updateAnimTransform();
            resolve(true)
        }, true);
      })
    
      
    
    
      
    }
    async function GetElementRelativeTransform(viewer, model, dbId) {
    
      const tree = model.getInstanceTree();
      return await new Promise(resolve => {

        tree.enumNodeFragments(dbId, function (fragId) {
            const frag = viewer.impl.getFragmentProxy(model, fragId);
            
            frag.getAnimTransform();
            let transform = {position: frag.position , quaternion:frag.quaternion }
                
            resolve(transform)
            
        }, true);
      })
    
    }


    async function MoveElementById(viewer, model, dbId, worldPosition, reset) {


      let box = getWorldBoundingBoxById(model, dbId)
      let center =  GetBoxCenter(box)
      let transform = await GetElementRelativeTransform(viewer, model, dbId)
      let relativeCenter = transform.position


      
      //MoveElementInstantly(viewer, model, dbId, relativePosition)
      let direction = new THREE.Vector3((relativeCenter.x - center.x)/2,(relativeCenter.y - center.y)/2,(relativeCenter.z - center.z)/2)
      if (reset) {
        
        await ResetElementFragTransform(viewer, model, dbId)
        let _box = getWorldBoundingBoxById(model, dbId)
        let _center =  GetBoxCenter(_box)
        await SetElementFragTransform(viewer, model, dbId, transform)
        worldPosition = _center
        
      }
      let desiredFragPosition = move3DPoint(worldPosition, direction, getDistance(center, relativeCenter))
      if (SpaceFitDrawingExtension.prototype.currentAnimation[dbId]) {
        clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId])
      }
      
      return await new Promise(resolve => {






        SpaceFitDrawingExtension.prototype.currentAnimation[dbId] = setInterval(function () {
  
          var success = MoveElement(viewer, model, dbId, desiredFragPosition)
  
          viewer.impl.invalidate(true, true);
          if (!success) {
            clearInterval(SpaceFitDrawingExtension.prototype.currentAnimation[dbId]);
            
            resolve(true);
          }
          }, 10);
      })

    }



  SpaceFitDrawingExtension.prototype.startRotate = false






function MoveElement(viewer, model, dbId, desiredPosition) {
  let step = 0.1;
  let success = true;
  const tree = model.getInstanceTree();  
  tree.enumNodeFragments(dbId, function (fragId) {
    //console.log(dbId);
    //console.log(fragId);
    //fragId = 14  
      const frag = viewer.impl.getFragmentProxy(model, fragId);
      
      frag.getAnimTransform();
//console.log(frag.position);

      if (getDistance(frag.position, desiredPosition) < step ) 
        {
          //console.log(1);
          
          frag.position = desiredPosition;
          success = false;
        }else
        {
          //console.log(2);
          frag.position =  getPointAtDistance(frag.position, desiredPosition, step);
        }

      frag.updateAnimTransform();
  }, true);

  return success;


  
}

function getAxisAngleFromQuaternion(quaternion) {
  // Normalize the quaternion to ensure accurate results
  quaternion.normalize();

  // Calculate the angle
  const angle = 2 * Math.acos(quaternion.w);

  // Calculate the axis
  const axis = new THREE.Vector3(quaternion.x, quaternion.y, quaternion.z);
  axis.normalize();

  return { axis: axis, angle: angle };
}
function removeDuplicateObjects(array, key) {
  return array.filter((obj, index, self) =>
      index === self.findIndex((t) => (
          t[key] === obj[key]
      ))
  );
}
async function ScatterElements(viewer ,model, dbids, position, reset) {

  let initialBox = getAllMergedWorldBoundingBoxById(model, dbids)
  let initialBox_dx = Math.abs(initialBox.max.x - initialBox.min.x)
  let initialBox_dy = Math.abs(initialBox.max.y - initialBox.min.y)
  let initialBox_dz = Math.abs(initialBox.max.z - initialBox.min.z)

  let scatterFieldValue =Math.max(initialBox_dz, initialBox_dy, initialBox_dz)*1.5// initialBox_dx >= initialBox_dy ? initialBox_dx *2.5 : initialBox_dy *2.5

  let min_scatterFieldValue = scatterFieldValue / 3

  return await new Promise(async resolve => {

    if (SpaceFitDrawingExtension.prototype.collectionScatterTransforms.length == 0) {
      setCollectionScatterTransforms(viewer ,model, dbids, position);
    }
  console.log(SpaceFitDrawingExtension.prototype.collectionScatterTransforms);
  
  
    for (let i = 0; i < SpaceFitDrawingExtension.prototype.collectionScatterTransforms.length; i++) {
      const element = SpaceFitDrawingExtension.prototype.collectionScatterTransforms[i];
      if (reset) {
        await ResetTransformElementInstantly(viewer, model, element.id)
        
      } else {
       await TransformElementInstantly(viewer, model, element.id, element.position, element.quaternion, false)
        
      }
    }


    if (!reset) {

      ////
      ///prevent clashing
      //
      let placedElementsBoxes = []
      let placedTallElementsBoxes = []
      let placedNormalElementsBoxes = []
      for (let i = 0; i < SpaceFitDrawingExtension.prototype.collectionScatterTransforms.length; i++) {
        const dbId = SpaceFitDrawingExtension.prototype.collectionScatterTransforms[i].id;

        let box = getWorldBoundingBoxById(model, dbId)
        let dx = Math.abs(box.max.x - box.min.x)
        let dy = Math.abs(box.max.y - box.min.y)

        let dy_x = dy / dx // if < 0.5 :::: super tall :::: [pipe]
        placedElementsBoxes.push({id: dbId, bbox: box,x:dx, y:dy, tallElement: dy_x < 0.5, placed: false})//dy_x < 0.5
      }

      placedElementsBoxes = removeDuplicateObjects(placedElementsBoxes, "id") 

      placedTallElementsBoxes = placedElementsBoxes.filter((e)=> e.tallElement).sort((a, b) => b.x - a.x)

      placedNormalElementsBoxes = placedElementsBoxes.filter((e)=> e.tallElement == false).sort((a, b) => b.y - a.y)


      let max_X = 0;
      let d = 0
      for (let i = 0; i < placedTallElementsBoxes.length; i++) {
        const boxData = placedTallElementsBoxes[i];
        //await TransformElementInstantly(viewer, model, boxData.id, element.position, element.quaternion, false)
        d += (boxData.y * 0.5)
        await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(0,-1,0), d)
        d += (boxData.y * 0.5 * 1.15)
        if (i == 0) {
          let b = getWorldBoundingBoxById(model, boxData.id)
          max_X = b.max.x > b.min.x ? b.max.x : b.min.x
        }else
        {
          let b = getWorldBoundingBoxById(model, boxData.id)
          let b_max_X = b.max.x > b.min.x ? b.max.x : b.min.x
          await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(1,0,0), Math.abs(max_X-b_max_X))
        }
      }


      let tallIds = placedTallElementsBoxes.map((e)=> e.id)
      let tallElementsBox = getAllMergedWorldBoundingBoxById(model, tallIds)
      // console.log("____________________________________________________");
      
      let tallElementsBox_dx = Math.abs(tallElementsBox.max.x - tallElementsBox.min.x)
      let tallElementsBox_dy = Math.abs(tallElementsBox.max.y - tallElementsBox.min.y)
      // console.log(tallIds);
      
      // console.log(tallElementsBox);
      // console.log(getAllMergedWorldBoundingBoxById(model, dbids));
      

      
      //scatterFieldValue
      let max_x = tallElementsBox.max.x >= tallElementsBox.min.x ? tallElementsBox.max.x : tallElementsBox.min.x
      let max_y = tallElementsBox.max.y >= tallElementsBox.min.y ? tallElementsBox.max.y : tallElementsBox.min.y

      //reset to the table origin
      for (let i = 0; i < placedNormalElementsBoxes.length; i++) 
      {
        const boxData = placedNormalElementsBoxes[i];
        await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(0,-1,0), boxData.y / 2)
        await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(1,0,0), Math.abs((tallElementsBox_dx / 2) - (boxData.x / 2)))
      }

      let rows = []
      let row = []
      for (let i = 0; i < placedNormalElementsBoxes.length; i++){if (i == 0 && placedTallElementsBoxes.length != 0) {row.push(tallElementsBox)}

        const boxData = placedNormalElementsBoxes[i];
        let currentRowWidth = getRowWidth(row)
        let allPlacedElements = [...rows, ...row].flat()
        if (currentRowWidth + boxData.x < scatterFieldValue) 
        {
          //PLACE
          await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(-1,0,0), (currentRowWidth + (boxData.x  * 0.1)))
          //row.push(getWorldBoundingBoxById(model, boxData.id))
        }else
        {//new row
          ///////////////////////
          rows.push(row)
          //row = [getWorldBoundingBoxById(model, boxData.id)]
        }

        if (rows.length > 0) {

          let lastRowMax_Y_Box = rows[rows.length-1].reduce((prev, curr)=>
            {
              let prevMin_Y = prev.max.y <= prev.min.y ? prev.max.y:prev.min.y
              let currMin_Y = curr.max.y <= curr.min.y ? curr.max.y:curr.min.y
            
              return prevMin_Y > currMin_Y ? prev : curr
            
            })
          let lastRowMax_Y = lastRowMax_Y_Box.max.y <= lastRowMax_Y_Box.min.y ? lastRowMax_Y_Box.max.y:lastRowMax_Y_Box.min.y
          
          let curr_box = getWorldBoundingBoxById(model, boxData.id)
          let dy_start = (GetBoxCenter(curr_box).y - lastRowMax_Y) + (boxData.y/2)
          
          await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(0,-1,0), (dy_start)+ (boxData.y * 0.05))


          let intersecting_most_min_y =  GetIntersectedObjectsMin_Y(model, lastRowMax_Y, boxData.id, rows[rows.length-1])
          if(intersecting_most_min_y != lastRowMax_Y)
            {
              await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(0,-1,0), (lastRowMax_Y - intersecting_most_min_y) + (boxData.y * 0))
            }
        }
        if (currentRowWidth + boxData.x < scatterFieldValue) 
          {
            //PLACE
            //await MoveElementInstantly(viewer, model, boxData.id, new THREE.Vector3(-1,0,0), (currentRowWidth + (boxData.x  * 0.1)))
            row.push(getWorldBoundingBoxById(model, boxData.id))
          }else
          {//new row
            ///////////////////////
            //rows.push(row)
            row = [getWorldBoundingBoxById(model, boxData.id)]
          }

      }

      ////
      ///load table
      //
      let mergedBox = getAllMergedWorldBoundingBoxById(model, dbids)
      
      await loadWorkingBenchModel(mergedBox)
      viewer.impl.invalidate(true, true);
    }


  
   resolve(true)
  })

}
function getRowWidth(rawBoxArray) {
  let max_x = 0
  let min_x = 0

  for (let i = 0; i < rawBoxArray.length; i++) {
    const box = rawBoxArray[i];
    if (i == 0) {
      max_x = box.max.x
      min_x = box.min.x
    }else
    {
      let _max_x = box.max.x
      let _min_x = box.min.x

      if (_max_x > max_x) { max_x = _max_x }
      if (_min_x < min_x) { min_x = _min_x }
    }
    
  }
  return max_x - min_x
}
function GetIntersectedObjectsMin_Y(model, startY, dbId, boxes) {
  let min_y = startY

  let e_box = getWorldBoundingBoxById(model, dbId)
  for (let i = 0; i < boxes.length; i++) {

    let box = boxes[i]
    
    if (e_box.intersectsBox(box)) {
      let box_min_y = box.max.y < box.min.y?box.max.y : box.min.y
      if (box_min_y < min_y) { min_y = box_min_y}
    }
  }
  return min_y

}


SpaceFitDrawingExtension.prototype.benchModelLoaded = false

async function loadWorkingBenchModel(mergedBox) {

  if (SpaceFitDrawingExtension.prototype.benchModelLoaded) {
    return
  }
  SpaceFitDrawingExtension.prototype.benchModelLoaded = true
  let mergedBoxCenter = GetBoxCenter(mergedBox)
  let dx = Math.abs(mergedBox.max.x - mergedBox.min.x)
  let dy = Math.abs(mergedBox.max.y - mergedBox.min.y)

  if (!NOP_VIEWER.overlays.hasScene('working-bench-custom-scene')) {
    NOP_VIEWER.overlays.addScene('working-bench-custom-scene');
  }
  return await new Promise(async resolve => {

    THREE.ColladaLoader().load('AssemblingBench_.dae',(m)=>{
  
      //  console.log(m.scene.children[0]);
      var bbox_1 = new THREE.Box3().setFromObject(m.scene.children[0]);
      var dx_1 = Math.abs(bbox_1.max.x - bbox_1.min.x)
      var dy_1 = Math.abs(bbox_1.max.y - bbox_1.min.y)
  
      
      if(dy > dx * 1.1) 
      {
        let scaleRation_X = (dx / dy_1) + 1
        let scaleRation_Y = (dy / dx_1) + 1
        m.scene.children[0].scale.set(scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y,scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y,scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y)
        m.scene.children[0].rotation.set(0,0,1.5707963268)
        
      }else
      {
        let scaleRation_X = (dx / dx_1) + 1
        let scaleRation_Y = (dy / dy_1) + 1
        m.scene.children[0].scale.set(scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y,scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y,scaleRation_X >= scaleRation_Y? scaleRation_X:scaleRation_Y)// = new THREE.Vector3(10,10,10)
      }
  
      var bbox = new THREE.Box3().setFromObject(m.scene.children[0]);
  
      let dz = mergedBox.min.z - bbox.max.z 
  
      m.scene.children[0].position.set(mergedBoxCenter.x, mergedBoxCenter.y, m.scene.children[0].position.z + dz)
      NOP_VIEWER.overlays.addMesh(m.scene.children[0], 'working-bench-custom-scene');

      resolve(true)
  },(progress)=>{
  
  },(err)=>{
  
  })
  })

}

function setCollectionScatterTransforms(viewer, model, dbids, desiredWorldPosition){
  SpaceFitDrawingExtension.prototype.collectionScatterTransforms = []

  for (let i = 0; i < dbids.length; i++) {
    const dbId = dbids[i];
    let box = getWorldBoundingBoxById(model, dbId) 
    let center =  GetBoxCenter(box)

    //let desiredWorldPosition = move3DPoint(center, worldShiftingDirection, worldShiftingDistance)
    let desiredQuaternion;
    const dx = Math.abs(box.max.x - box.min.x)
    const dy = Math.abs(box.max.y - box.min.y)
    const dz = Math.abs(box.max.z - box.min.z)

    let desired_Z  = desiredWorldPosition.z + (dz/2);
    let dx_y = dx / dy

    let dx_z = dx / dz
    let dy_z = dy / dz

    if (dx_z <= 0.5 && dy_z <= 0.5)// |
    {
      //rotate around y
      desiredQuaternion = new THREE.Quaternion().setFromAxisAngle(
         new THREE.Vector3(0,1,0)
        ,Math.PI/2);
        desired_Z = desired_Z - (dz/2) +  (dx/2)
    }else 
    if (dx_z <= 0.5 || dy_z <= 0.5) // |_|
      {
      //rotate around x or y
      desiredQuaternion = new THREE.Quaternion().setFromAxisAngle(
        dx_z > dy_z ? new THREE.Vector3(1,0,0) : new THREE.Vector3(0,1,0)
        ,Math.PI/2);
        desired_Z = (desired_Z - (dz/2) )+ (dx_z <= dy_z ? (dx/2) : (dy/2))
    }
    else // [] __
    {
      //rotate around z
      desiredQuaternion = new THREE.Quaternion().setFromAxisAngle(
         new THREE.Vector3(0,0,1)
        , dx_y <= 0.5 ? Math.PI/2 : 0);
    }
    SpaceFitDrawingExtension.prototype.collectionScatterTransforms.push({id: dbId, position: new THREE.Vector3(desiredWorldPosition.x,desiredWorldPosition.y,desired_Z) , quaternion: desiredQuaternion})

  } 

}
function getAllMergedWorldBoundingBoxById(model, dbIds) {

  let _fragIds = []
  for (let i = 0; i < dbIds.length; i++) {
    const dbId = dbIds[i];
    let fragIds = _GetElementAllFragIds(model, dbId)
    _fragIds = [..._fragIds, ...fragIds]
  }
  _fragIds = [...new Set(_fragIds)]
  return getWorldBoundingBox(model, _fragIds)
}
function getWorldBoundingBoxById(model, dbId) {

  let fragIds = _GetElementAllFragIds(model, dbId)
  return getWorldBoundingBox(model, fragIds)
}

function getWorldBoundingBox(model, fragIds) {

  if (fragIds.length == 0) {
    return new THREE.Box3(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,0))
  }
  //fragments list array
  var fragList = model.getFragmentList();
  const fragbBox = new THREE.Box3()
  const nodebBox = new THREE.Box3()

  fragIds.forEach(function(fragId) { 
     fragList.getWorldBounds(fragId, fragbBox) 
     nodebBox.union(fragbBox)
  })

return nodebBox
}
function GetBoxCenter(box) {

  let max = box.max
  let min = box.min

  return new THREE.Vector3(((max.x + min.x)/2),((max.y + min.y)/2),((max.z + min.z)/2))
  
}

function getDistance(v1, v2)
{
  return v1.distanceTo(v2);

}
function getAngle(q1, q2)
{
  let a1 = getAxisAngleFromQuaternion(q1).angle;
  let a2 = getAxisAngleFromQuaternion(q2).angle;
  return Math.abs(a1-a2);

}
function getPointAtDistance(vector1, vector2, distance) {
  // Calculate the direction vector from vector1 to vector2
  let direction = new THREE.Vector3().copy(vector2).sub(vector1).normalize();

  // Scale the direction vector by the distance
  direction.multiplyScalar(distance);

  // Add the scaled direction vector to vector1 to get the point at the given distance
  return new THREE.Vector3().copy(vector1).add(direction);
}
function getQuatAtAngle(q1, q2, angle) {
  let a1 = getAxisAngleFromQuaternion(q1).angle;
  let a2 = getAxisAngleFromQuaternion(q2).angle;
  let ax = getAxisAngleFromQuaternion(q2).axis;
  //console.log(ax);
  
  let directionSign = a2 - a1 >= 0 ? 1 : -1;

  // Add the scaled direction vector to vector1 to get the point at the given distance
  return new THREE.Quaternion().setFromAxisAngle(
    ax, 
    (a1 + (directionSign * angle)));
}

function getParentComponent(viewer, dbid) {

  let parentId

  getAllLeafComponents(viewer, (jsonData)=>{
    parentId =  GetMainParent(dbid, jsonData)
  })

  return parentId;
}

function _GetAllFragIds(model, dbIds) {
  // Initialize an object to store fragment IDs for each dbId
let _fragmentIds = [];
const tree = model.getInstanceTree();
// Iterate over each dbId
dbIds.forEach(dbId => {
  let fragmentIds = [];

  // Call enumNodeFragments for the current dbId
  tree.enumNodeFragments(dbId, function (fragId) {
    fragmentIds.push(fragId);
  });

  // Store the collected fragment IDs for the current dbId
  _fragmentIds = [..._fragmentIds, ...fragmentIds];
});
return _fragmentIds
}

function _GetElementAllFragIds(model, dbId) {

  let p = getParentComponent(NOP_VIEWER, dbId)
  let elementTree = GetElementTree(NOP_VIEWER, p)

return _GetAllFragIds(model, elementTree)

 }

function GetElementTree(viewer, dbId) {
  let childs = [dbId]
  getAllLeafComponents(viewer, (jsonData)=>{

    childs = [dbId , ...GetElementAllChilds(viewer, dbId, jsonData)]
  })
  return childs
}

function GetElementAllChilds(viewer, dbId, Data) {
let childs = GetElementChilds(viewer, dbId, Data)
for (let i = 0; i < childs.length; i++) {
  const chId = childs[i];
  
  childs = [...childs, ...(GetElementAllChilds(viewer, chId, Data))]
}
  return childs
}
function GetElementChilds(viewer, dbId, Data) {

  return Data.filter((d)=> d.parent == dbId).map(e => e.id)
}
function GetParentsCount(parentId, Data) {
  let count = 0
  let dbid = parentId
  while (true) {
    let parentID = GetParentId(dbid, Data)

    if (parentID != -1) {
      count++
      dbid = parentID
    }else{break}
  }
  return count

}
function GetMainParent(parentId, Data) {
  let count = GetParentsCount(parentId, Data)
  if (count > 5) {
    let dbid = parentId
for (let i = 0; i < count - 5; i++) {
  dbid = GetParentId(dbid, Data)
}
return dbid

  }else
  {
    return parentId
  }

}
function GetParentId(dbid, Data) {
  
  const found = Data.find((element) => element.id == dbid);
  if (found) {
    return found.parent
  }else{return -1}


}
function getAllLeafComponents(viewer, callback) {
  var cbCount = 0;
  var tree;
  var jsData = []

  function getLeafComponentsRec(current, parent) {
      cbCount++;
      if (tree.getChildCount(current) != 0) {
          tree.enumNodeChildren(current, function (children) {
              getLeafComponentsRec(children, current);
          }, false);
      }
      var nodeName = viewer.model.getInstanceTree().getNodeName(current)
      jsData.push({ id: current, parent: parent, text: nodeName })

      if (--cbCount == 0) callback(jsData);
  }
  viewer.getObjectTree(function (objectTree) {
      tree = objectTree;
      var rootId = tree.getRootId()
      var nodeName = viewer.model.getInstanceTree().getNodeName(rootId)
     // jsData.push({ id: rootId, parent: '#', text: nodeName })
      var allLeafComponents = getLeafComponentsRec(rootId, '#');

  });
}

  Autodesk.Viewing.theExtensionManager.registerExtension('SpaceFitDrawingExtension', SpaceFitDrawingExtension);
  