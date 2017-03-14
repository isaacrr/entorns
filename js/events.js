var pos, c = 0, auxili, me = other = false;

function comencem()
{
	container.addEventListener("mousemove", moure, false);

	container.addEventListener("click", clickar, false);

	container.oncontextmenu = function ()
	{
		return false;
	}
}

/* ****************************************************** MOUSEMOVE ****************************************************** */
function moure(e)
{
	pos = positionate( raycasting( e.offsetX, e.offsetY ) );

	if ( player.actual == null )
	{
		directShoot( [ pos.z, pos.x ] );
	}

	var cell = shoot.worldToBoard( pos.x, pos.z )

	if( player.actual.rotation == 0 )
	{
		if( cell[0] >	parseInt( player.actual.size *.5 - !( player.actual.size % 2 ) ) )
		{
			player.actual.object.position.x = onTauler( pos.x ) - player.actual.lenght;
		}
	}
	else if( player.actual.rotation == 2 )
	{
		if( cell[0] < 8 )
		{
			player.actual.object.position.x = onTauler( pos.x ) + player.actual.lenght;
		}
	}
	else
	{
		player.actual.object.position.x = onTauler( pos.x );
	}


	player.actual.object.position.y = dimensio * 5;

	if( player.actual.rotation == 1 )
	{
		if( cell[1] > 1 )
		{
			player.actual.object.position.z = onTauler( pos.z ) - player.actual.lenght;
		}
	}
	else if( player.actual.rotation == 3 )
	{
		if( cell[1] < 8 )
		{
			player.actual.object.position.z = onTauler( pos.z ) + player.actual.lenght;
		}
	}
	else
	{
		player.actual.object.position.z = onTauler( pos.z );
	}
};

function clickar(e)
{
	if( !dintreTauler() )

		return;

	switch( e.button )
	{
		case 0:
			if( !player.alocateBoard( shoot.worldToBoard( pos.x, pos.z ) ) )
			{
				break;
			}
			else if( player.maximumBoats() )
			{
				player.actual = null;

				me = true;

				connection.server.sendMessage( JSON.stringify( { type: messageKind.start } ) );
			}
			else
			{
				player.loadBoats();

				player.boardPosition( shoot.worldToBoard( pos.x, pos.z ) );
			}

		break;

		case 1:

			player.actual.object.rotation.y += -Math.PI * .5;

			player.newRotation();

		break;
	};
};
/* ***************************************************** RAY TRAICING **************************************************** */
function raycasting( x, y )
{
	var raycaster = new THREE.Raycaster();
	var screenMouse = new THREE.Vector2( ( x / container.childNodes[0].width ) * 2 - 1,
	-( y / container.childNodes[0].height ) * 2 + 1 );

	raycaster.setFromCamera( screenMouse, camera );

	var intersects = raycaster.intersectObjects( desk.children );

	if ( intersects.length == 0 )

		return;

	return { x: intersects[ 0 ].point.x, z: intersects[ 0 ].point.z }
};

/* *********************************************** POSITIONATE IN THE BOARD *********************************************** */
function onTauler( coord )
{
	if( coord > 500 )
	{
		coord = 450;
	}
	else if( coord < -500 )
	{
		coord = -450;
	}

	return coord;
};

function positionate( pos )
{
	var x = parseInt( pos.x - pos.x % 100 );
	var z = parseInt( pos.z - pos.z % 100 );

	return { x: pos.x > 0 ? x + 50 : x - 50, z: pos.z > 0 ? z + 50 : z - 50 }
};

function dintreTauler( )
{
	return ( -500 < Math.abs( pos.x ) && Math.abs( pos.x ) < 500 && -500 < Math.abs( pos.z ) && Math.abs( pos.z ) < 500 );
};
