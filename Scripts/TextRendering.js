// create and return a 3D text object from the string at the given position
function createText(x, y, z, textString)
{
    var textMaterialFront = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );
    var textMaterialSide = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } );

    var text3d = new THREE.TextGeometry( textString, {
            size: 70,
            height: 20,
            curveSegments: 4,
            font: "droid sans",
            weight: "bold",
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 1.5,
            bevelSegments: 3,

            material: textMaterialFront,
            extrudeMaterial: textMaterialSide
    });

    text3d.computeBoundingBox();
    text3d.computeVertexNormals();

    var centerOffset = -0.5 * (text3d.boundingBox.x[ 1 ] - text3d.boundingBox.x[ 0 ]);

    var faceMaterial = new THREE.MeshFaceMaterial();
    var text = new THREE.Mesh(text3d, faceMaterial);

    text.doubleSided = false;
    text.overdraw = true;

    text.position.x = centerOffset + x;
    text.position.y = y;
    text.position.z = z;

    // TODO: facing camera ?
    text.rotation.x = 0;
    text.rotation.y = Math.PI*2;

    var textObject = new THREE.Object3D();
    textObject.addChild( text );

    return textObject;
 }
