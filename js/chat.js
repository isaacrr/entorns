var coords;
messageStruck.chat.addEventListener("keyup", function(event)
{
	event.preventDefault();

	if( event.keyCode != 13 || !messageStruck.input.value.length )
		return;

	if( !me || !other )
	{
		sendMsg( messageStruck.input.value, 1 );
	}

	var tiro = messageStruck.input.value;

	if( tiro == "escena" )
	{
		actualdesk = !actualdesk;
		return;
	};

	var coords = shoot.gameToWorld( tiro[ 0 ], tiro[ 1 ] );

	if( mytorn && tiro.length == 2 && shoot.isShoot( coords ) )
	{
		//onCommand( coords );
		nouOnCommand( tiro );
	}
	else if( mytorn && tiro.length == 3 && tiro[ 1 ] == 1 && tiro[ 2 ] == 0 && shoot.isShoot( shoot.gameToWorld( tiro[ 0 ],  10 ) ) )
	{
		//onCommand( shoot.gameToWorld( tiro[ 0 ],  10 ) );
		nouOnCommand( tiro[ 0 ], 10);
	}
	else
	{
		sendMsg( tiro, 1 );
	}
});

function directShoot( tiro )
{
	nouOnCommand( shoot.worldToGame( tiro[0], tiro[1] ) );
};

function nouOnCommand( tiro )
{
	mytorn = false;

	printMsg( shoot.printGame( tiro[0], tiro[1] ), 1);

	connection.server.sendMessage( JSON.stringify( {type: messageKind.shoot, x: tiro[0], y: tiro[1] } ) );
};

function onCommand( tiro )
{
	var enfonsar = shoot.oneShoot( tiro[0], tiro[1] );
	sendMsg( shoot.printShoot( tiro[0], tiro[1] ), 1 );
	checkMessage( tiro );

	if( enfonsar )
	{
		printMsg( "Barco enfonsat", 0 );
	}
};

function checkMessage ( tiro )
{
		var encert = !isNaN( player.detectShoot( tiro ) );

		printHitMiss( encert );

		connection.server.sendMessage( JSON.stringify( { type: messageKind.hitmis, bool: encert } ) );
};

function printHitMiss( encert, tiro )
{
	printMsg( "It's a " + ( encert ? "hit" : "miss" ), 0 );

	destroy.add( debug.createCubeRay( tiro[1], 1, tiro[0], encert ? new THREE.MeshLambertMaterial({color: 0x990000}) :  new THREE.MeshNormalMaterial() ) );
};

function sendMsg( msg )
{
	connection.server.sendMessage( JSON.stringify( { type: messageKind.message, message: msg } ) );

	printMsg( msg, 1 );
};

function printMsg( message, user )
{
	var newMessage = document.getElementById("MessageContainer").cloneNode(true);

	newMessage.querySelector("#Text").innerText = message;

	if( !user )
	{
		newMessage.querySelector("#ImageContainer").style.float = "left";
	}
	newMessage.querySelector("#Image").src = user ? player.avatar : adversarial.avatar;

	newMessage.style.display = "block";

	messageStruck.messages.appendChild( newMessage );

	messageStruck.input.value = "";

	messageStruck.messages.scrollTop = messageStruck.messages.scrollHeight;
};
