function CreateSkybox(posx, negx, posy, negy, posz, negz) 
{

	var urlPrefix = "Assets/Skybox/";
	
	posx = posx || urlPrefix+'posx.png';
	negx = negx || urlPrefix+'negx.png';
	posy = posy || urlPrefix+'posy.png';
	negy = negy || urlPrefix+'negy.png';
	posz = posz || urlPrefix+'posz.png';
	negz = negz || urlPrefix+'negz.png';
	
	/*var urls = [ urlPrefix + "posx.png", urlPrefix + "negx.png",
	    urlPrefix + "posy.png", urlPrefix + "negy.png",
	    urlPrefix + "posz.png", urlPrefix + "negz.png" ];*/
	var urls = [ posx, negx, posy, negy, posz, negz];
	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
	var shader = THREE.ShaderUtils.lib["cube"];
	shader.uniforms["tCube"].texture = textureCube; // textureCube has been init before
	var material = new THREE.MeshShaderMaterial({
	    fragmentShader  : shader.fragmentShader,
	    vertexShader    : shader.vertexShader,
	    uniforms        : shader.uniforms
	});
	// build the skybox Mesh
	skyboxMesh  = new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );
	// add it to the scene
	//scene.addObject( skyboxMesh );
	return skyboxMesh;
}