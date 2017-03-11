/* ************************************** google-chrome --allow-file-access-from-files ************************************** */
var container, desk, scene, camera, renderer, geometry, textureLoader;
var dimensio = 10, c = 0, amplada = 5, rotations = 0
var player, adversarial

function init()
{
	desk = new THREE.Scene();

	scene = new THREE.Scene();

	textureLoader = new THREE.TextureLoader();

	player = new Player( "iZac", avatar.brook );

	player.loadBoats();

	printMsg( "Hello, " + player.name, 1 );

	adversarial = new Player( "Aurel", avatar.rufy );

	printMsg( "Hello, " + adversarial.name, 0 );

	container = document.getElementById( "ThreeJS" );

	var SCREEN_WIDTH = container.clientWidth;

	var SCREEN_HEIGHT = container.clientHeight;

	camera = factory.createCamera( 45, SCREEN_WIDTH / SCREEN_HEIGHT, 1000, 3000);

	camera.position.set( 0, SCREEN_HEIGHT * 2, 0 );

	//scene.add( camera );

	renderer = factory.createRenderer( SCREEN_WIDTH, SCREEN_HEIGHT );

	renderer.autoClear = false;

	container.appendChild( renderer.domElement );

	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	desk.add( factory.createLight( -1000, 200 * dimensio, -1000, 0xffebcc ) );

	desk.add( factory.createPlane( 20, "mar", 'imatges/Calm-ocean.jpg') );

	desk.add( factory.createPlane( 12.5, "border", 'imatges/tauler.png') );

	desk.add( factory.createPlane( dimensio, "tauler" ) );

	desk.add( factory.createAxis( ) );

	geometry = desk.getObjectByName( "mar" ).geometry;

	desk.getObjectByName( "mar" ).position.y -= deep * 2;

	desk.getObjectByName( "border" ).position.y -= deep;

	camera.lookAt( desk.getObjectByName( "tauler" ).position );

	scene.add( factory.createLight( 0, 200 * dimensio, 0, 0xffffff ) );

	scene.add( player.actual );
};

/* ********************************************************* RENDER ********************************************************* */
function render()
{
	animate.createSea( c++ );

	requestAnimationFrame( render );

	renderer.clear();
	renderer.render( desk, camera );

	renderer.clearDepth();
	renderer.render( scene, camera );
};

init();
render();
