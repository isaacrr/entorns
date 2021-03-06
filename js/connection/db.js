// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZ9hCSJw42Z3IppgaCKVBiYfgbXkSVKnQ",
  authDomain: "battleship-b1d32.firebaseapp.com",
  databaseURL: "https://battleship-b1d32.firebaseio.com",
  storageBucket: "battleship-b1d32.appspot.com",
  messagingSenderId: "941933552368"
};
firebase.initializeApp(config);

function login(user,password, callback)
{
  firebase.auth().signInWithEmailAndPassword(user + "@lamamadenbambi.cat", password).then(function(user)
  {

  player = new Player( user.email.split("@")[0], user.photoURL );

  sessionStorage.name = user.email.split("@")[0];

  sessionStorage.avatar =  user.photoURL;

  sessionStorage.room = document.getElementById("room1").value;

  callback( !document.getElementById("room1").value ? player.name : document.getElementById("room1").value );

}, function(error)
  {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log( errorMessage.length );
  });
}
function signup(user, password, imatge, callback)
{
  firebase.auth().createUserWithEmailAndPassword(user + "@lamamadenbambi.cat", password).then(function(user) {
  callback( imatge, user);
}, function(error)
  {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
