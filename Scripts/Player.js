

function CreatePlayerModel(callback, scale) {
	var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'Assets/Player/proxyPlayer.png' ) } );
	var loader = new THREE.JSONLoader();
	var mesh;
	var group = new THREE.Object3D();
	var scale = scale || 30;
	loader.load( { model: 'Assets/Player/playerProxy_testExport.js', callback: function ( geometry ) {
		geometry.computeTangents();

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = mesh.position.y = mesh.position.z = 0;
		mesh.rotation.x = mesh.rotation.y = mesh.rotation.z = 0;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();
		group.addChild(mesh);

		callback(group);
	} } );


}
