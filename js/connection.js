//INIT
var room_name = "battleship";
//Aquest variable no la fem servir

var server = new SillyClient();

function connect(){
	document.getElementById("connecting").style.visibility='visible';
	server.connect("84.89.136.194:9000", room_name);
};

//this method is called when the user gets connected to the server
server.on_ready = function( id )
{

};

//this methods receives messages from other users (author_id its an unique identifier)
server.on_message = function( author_id, msg )
{

};

//this methods is called when a new user is connected
server.on_user_connected = function(msg)
{

};


server.on_close = function()
{

}