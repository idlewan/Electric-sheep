dictionary = [
    "acclaims", "barbecue", "cohesion",
    "damage", "excavation", "fanatic", "geophysics", "hall"
]

function moveEnemy(delta_x, delta_z) {
    this.x += delta_x;
    this.z += delta_z;
    this.enemy3D.position.x += delta_x;
    this.text3D.position.x += delta_x;
    this.enemy3D.position.z += delta_z;
    this.text3D.position.z += delta_z;
}

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
    this.moveEnemy = moveEnemy;
}

var enemyPositionsX = [];
var enemyPositionsZ = [];

function pickRandom(positions) {
    if (positions.length == 0)
        positions = [-170, -100, -30, 30];

    var positionIndex = Math.random() * positions.length;
    return positions.splice(positionIndex, 1);
    //return positions[Math.floor(positionIndex)];
}

var enemySpeed = 0.1;
// moving towards 0
function moveEnemies() {
    var dtime	= Date.now() - time;
    speed = enemySpeed*dtime/1000;
    for (var i=0; i < enemies.length; i++) {
        var delta = enemies[i].z / enemies[i].x;
        var delta_x = Math.sqrt( speed*speed / (1 + delta*delta) );
        var delta_z = delta_x * delta;

        var sign_x = enemies[i].x > 0 ? 1 : enemies[i].x == 0 ? 0 : -1;
        var sign_z = enemies[i].z > 0 ? 1 : enemies[i].z == 0 ? 0 : -1;

        enemies[i].moveEnemy(-sign_x*Math.abs(delta_x), -sign_z*Math.abs(delta_z));
    }
}
