



function CreateTiledSurface(sizex, sizey, mapimage, texturemap) {
    
    if (sizex <= 0 || sizey <= 0 || sizex == null || sizey == null)
        throw 'CreateSurface: Parameters sizex and sizey need to be positive integers.';
    texturemap = texturemap || 'TiledSurface/TextureMap.bmp';
    var uniforms;   
    uniforms = {
        map: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture(mapimage) },
        //texturemap: { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture("TiledSurface/TextureMap.bmp") }
        texturemap: { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture(texturemap) }
    };
    

    var fragmentShader = 'varying vec2 vUv;\n'
   			+'uniform sampler2D map;\n'
            +'uniform sampler2D texturemap;\n'
            + 'vec2 index;\n'
            +'vec2 col;\n'
            +'vec2 size;\n'
            +'void main( void ) {\n'
            +'index = floor(vUv);\n'
            +'vec2 index_frac = fract(vUv);\n'
            +'vec2 mapsize = vec2('+sizex+','+sizey+');\n'
            +'float tiletype = texture2D(map, index/mapsize + vec2(1.0/mapsize.x/2.0, 1.0/mapsize.y/2.0)).x*255.0;\n'
			+'vec2 texturemapsize = vec2(16,16); // tiles per row/col\n'
            +'vec2 tilesize = vec2(32,32); // pixels per tile\n'
            +'vec2 texturesize = texturemapsize*tilesize;\n'
            +'vec2 tileindex = vec2(mod(tiletype, texturemapsize.x), floor(tiletype/texturemapsize.x));\n'
			+'vec2 tmpsize = texturemapsize*tilesize; // 512*512 \n'
            +'vec2 tmp = index_frac/texturemapsize+tileindex*tilesize/texturesize;\n'
			+'tmp.x = tmp.x + (tileindex.x*2.0+1.0)*1.0/512.0;\n'
			+'tmp.y = tmp.y + (tileindex.y*2.0+1.0)*1.0/512.0;\n'
	    +'vec4 col = texture2D(texturemap, tmp);\n' 
	    // col.a = 0.5;\n'
	    +'gl_FragColor = col;\n'
            //+'gl_FragColor= texture2D(texturemap, tmp);\n'
            +'}';

    var vertexShader = 'varying vec2 vUv;       \
			void main()                         \
			{                                   \
				vUv = uv;                       \
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );  \
				gl_Position = projectionMatrix * mvPosition;                \
			}';

    uniforms.map.texture.magFilter = THREE.NearestFilter; uniforms.map.texture.minFilter = THREE.NearestFilter;
    //uniforms.texturemap.texture.magFilter = THREE.NearestFilter; uniforms.texturemap.texture.minFilter = THREE.NearestFilter

    //uniforms.map.texture.magFilter = THREE.LinearFilter; uniforms.map.texture.minFilter = THREE.LinearFilter;
    uniforms.texturemap.texture.magFilter = THREE.LinearFilter; uniforms.texturemap.texture.minFilter = THREE.LinearFilter
    uniforms.texturemap.texture.mapping = THREE.ClampToEdgeWrapping;

    material = new THREE.MeshShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: false,
        blending: THREE.NormalBlending,
        depthTest: true
    });


    var plane = new THREE.PlaneGeometry(sizex, sizey, sizex, sizey); //length, height, length divisions = length, height divisions = height
    for (i = 0; i < plane.faceVertexUvs[0].length; i++) {
        uvs = plane.faceVertexUvs[0][i];
        for (j = 0; j < uvs.length; j++) {
            uvs[j].u *= sizex;
            uvs[j].v *= sizey;
            //uvs[j].u *= 8;
            //uvs[j].v *= 8;
        }
    }

    meshCanvas = new THREE.Mesh(plane, [material]);
    meshCanvas.rotation.x = -90 * Math.PI / 180;
    meshCanvas.scale.x = meshCanvas.scale.y = meshCanvas.scale.z = 120;
    return meshCanvas;
}