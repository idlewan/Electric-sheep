dictionary = [
    "acclaims", "barbecue", "blueberry", "capitol", "cohesion",
    "damage", "distraction", "eager", "engraving", "excavation",
]

function Enemy(word, x, y, z) {
    this.word = word;
    this.x = x;
    this.y = y;
    this.z = z;
    this.text3D = createText( x, y, z, word );
    this.enemy3D = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), enemyMaterial );
    this.enemy3D.position.x = x;
    this.enemy3D.position.y = 50;
    this.enemy3D.position.z = z;
    scene.addObject(this.text3D);
    scene.addObject(this.enemy3D);
}

var enemyPositionsX = [];
var enemyPositionsZ = [];

function pickRandom(positions) {
    if (positions.length == 0)
        positions = [-150, -125, -100, -75, -50, -25, 0, 25, 50, 75];

    var positionIndex = Math.random() * positions.length;
    return positions.splice(positionIndex, 1);
    //return positions[Math.floor(positionIndex)];
}
