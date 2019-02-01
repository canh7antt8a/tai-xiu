var userNameGG, gmail, uid, coin, so1, so2, so3, totalXX, listPlayer = [],
	listGame = [], timeGameStartTaiXiu, finalGame = [],stopGetTaiXiu, stopGetBauCua, loaiThe, idResultTaiXiu, hinh1, hinh2, hinh3, hat1, hat2, hat3, resultTaiXiu, timeStartTaiXiu, timeStartBauCua, clearInGame, timeGameStartBauCua;
var options2 = { style: 'currency', currency: 'VND' };
var numberFormat2 = new Intl.NumberFormat('vi-US', options2);

var config = {
	apiKey: "AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg",
	authDomain: "taixiu-d9c98.firebaseapp.com",
	databaseURL: "https://taixiu-d9c98.firebaseio.com",
	projectId: "taixiu-d9c98",
	storageBucket: "taixiu-d9c98.appspot.com",
	messagingSenderId: "998583578592"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
	timestampsInSnapshots: true
});
// Get a reference to the database service
var real = firebase.database();

const a = document.getElementById('chat');
const b = firebase.database().ref().child('chat')
b.on('child_added', snap => {
	var t = snap.val();
	if (userNameGG === t.name) {
		$('.contentChat').append('<div style="text-align: end" class="mb-2 meChat">' + t.content + '</div>');
	} else {
		$('.contentChat').append('<div class="mb-3 youChat"><strong>' + t.name + ': </strong>' + t.content + '</div>');
	}
});

var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signOutButtonElement = document.getElementById('sign-out');
//test get data in firebase
$('#loginGoogle').click(function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
})

// Signs-out of Friendly Chat.
$('#sign-out').click(function signOut() {
	console.log(12);
	// Sign out of Firebase.
	firebase.auth().signOut();
})

// Initiate Firebase Auth.
function initFirebaseAuth() {
	// Listen to auth state changes.
	firebase.auth().onAuthStateChanged(authStateObserver);
}
function initFirebaseAuth() {
	// Listen to auth state changes.
	firebase.auth().onAuthStateChanged(authStateObserver);
}
function getProfilePicUrl() {
	return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
	return firebase.auth().currentUser.displayName;
}
function getGmail() {
	return firebase.auth().currentUser.email;
}
function getUid() {
	return firebase.auth().currentUser.uid;
}
// Returns true if a user is signed-in.
function isUserSignedIn() {
	return !!firebase.auth().currentUser;
}

// initialize Firebase
initFirebaseAuth();

function authStateObserver(users) {
	if (users) {
		// Get the signed-in user's profile pic and name.
		var profilePicUrl = getProfilePicUrl();
		var userName = getUserName();
		gmail = getGmail();
		uid = getUid();
		userNameGG = userName;

		// Set the user's profile pic and name.
		userPicElement.style.backgroundImage = 'url(' + profilePicUrl + ')';
		userNameElement.textContent = userName;

		// Show user's profile and sign-out button.
		userNameElement.removeAttribute('hidden');
		userPicElement.removeAttribute('hidden');
		signOutButtonElement.removeAttribute('hidden');
	} else {
		console.log(users);
		// User is signed out!
		// Hide user's profile and sign-out button.
		userNameElement.setAttribute('hidden', 'true');
		userPicElement.setAttribute('hidden', 'true');
		signOutButtonElement.setAttribute('hidden', 'true');

		// Show sign-in button.
	}
	if (users != null) {
		loginFinish();
		$('.nhacNen').show();
		nhac();
		clearInGame = setInterval(inGame, 500);
	}
	if (users == null) {
		clearInterval(clearInGame);
		$('#loginListGame, .nhacNen').hide();
		$('.bodyer, .header_menu, .common').show();
		closeNhac();
	}
}