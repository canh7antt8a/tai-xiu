const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().database)
// const firebase = require('firebase/app');
// require ('firebase/firestore');

// firebase.initializeApp({
// 	apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
// 		authDomain: 'taixiu-d9c98.firebaseapp.com',
// 	   projectId: 'taixiu-d9c98'
// 	});
// exports.helloAuth =  functions.auth.user().onCreate((event) => {
//     const uid = event.uid;
//   	console.log("user id: " + uid);
// 	const email = event.email;
//   	const displayName = event.displayName;
//     return db.collection("users").doc(uid).set({
//     email: email,
//     displayName: displayName
//     }); 
// });
// const db = firebase.firestore();
// exports.addBetTable = functions.firestore.document
// var timeStart = new Date().getTime();
// exports.myFunctionName = functions.firestore
//     .document('betList/'+timeStart).onWrite((change, context) => {

//     });
// exports.createUser = functions.firestore
// 	.document('betList/{abc}')
// 	.onCreate((snap, context) => {
// 		console.log('abc');
// 		var timeStart = new Date().getTime();
// 		var timeEndBet = timeStart + 45000;
// 		var timeCanCua = timeStart + 50000;
// 		var timePrepareNewGame = timeStart + 53000;


// 		admin.firestore.doc("betLists/" + timeStart).set({
// 			timeStart: timeStart,
// 			timeEnd: timeEndBet,
// 			timeCanCua: timeCanCua,
// 			timePrepareNewGame: timePrepareNewGame,
// 			totalAmountTai: 0,
// 			totalAmountXiu: 0,
// 			totalPlayerTai: 0,
// 			totalPlayerXiu: 0
// 		})


// 		admin.firestore.doc("betLists/" + timeStart + "/listTai/ádsa").set({
// 			amountTai: 0
// 		})


// 		admin.firestore.doc("betLists/" + timeStart + "/listXiu/ádsa").set({
// 			amountXiu: 0
// 		})
// 	});





















// 	/**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// const cors = require('cors')({origin: true});
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.helloWorld = (req, res) => {
//   let message = req.query.message || req.body.message || 'Hello World!';
//   res.status(200).send(message);
// };

// exports.sendMoneyXiu = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyXiu = parseInt(req.body.moneyXiu);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountXiu;
//   console.log("BODY IS:"+JSON.stringify(req.body));
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyXiu: moneyXiu, timeGameStart: timeGameStart});
//   })
//   var docRef = db.collection("users").doc(uid);
//   var doc = db.collection("betLists").doc(timeGameStart);

//   docRef.get().then(function(doc) {
//       if (doc.exists) {
//         console.log("Document data:", doc.data());
//         money = parseInt(doc.data().money);
//         getTotalAmountXiu()
//         console.log('ok1');
//       } else {
//           console.log("No such document!");
//       }
//   })
//   function getTotalAmountXiu() {
//       doc.get().then(function(doc) {
//           if (doc.exists) {
//             console.log("Document data:", doc.data());
//             totalAmountXiu = doc.data().totalAmountXiu;
//             console.log('ok2');
//             checkMoney();
//           } else {
//               console.log("No such document!");
//           }
//       })
//   }
//   function checkMoney() {
//   	if (money >= moneyXiu) {
//       	var reTotalAmountXiu = parseInt(totalAmountXiu + moneyXiu);
//       	var reMoney = parseInt(money - moneyXiu);
//       console.log('totalAmountXiu'+totalAmountXiu);
//       console.log('moneyXiu'+moneyXiu);
//       console.log('reTotalAmountXiu'+reTotalAmountXiu);
//       console.log('reMoney'+reMoney);
//       console.log('money'+money);

//       	db.doc("betLists/" + timeGameStart + "/listXiu/" + uid).set({
//              moneyXiu: moneyXiu
//         })

//         db.collection("users").doc(uid).update({
//             "money": reMoney
//         })

//       	db.collection("betLists").doc(timeGameStart).update({
//             "totalAmountXiu": reTotalAmountXiu
//         })
//     }
//   }
// };
















// /**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// const cors = require('cors')({origin: true});
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.helloWorld = (req, res) => {
//   let message = req.query.message || req.body.message || 'Hello World!';
//   res.status(200).send(message);
// };

// exports.sendMoneyXiu = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyXiu = parseInt(req.body.moneyXiu);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountXiu;
//   console.log("BODY IS:"+JSON.stringify(req.body));
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyXiu: moneyXiu, timeGameStart: timeGameStart});
//   })
//   var docRef = db.collection("users").doc(uid);
//   var doc = db.collection("betLists").doc(timeGameStart);

//   docRef.get().then(function(doc) {
//       if (doc.exists) {
//         money = parseInt(doc.data().money);
//         getTotalAmountXiu();
//       }
//   })
//   function getTotalAmountXiu() {
//       doc.get().then(function(doc) {
//           if (doc.exists) {
//             totalAmountXiu = doc.data().totalAmountXiu;
//             checkMoney();
//           }
//       })
//   }
//   function checkMoney() {
//   	if (money >= moneyXiu) {
//       	var reTotalAmountXiu = parseInt(totalAmountXiu + moneyXiu);
//       	var reMoney = parseInt(money - moneyXiu);
//         console.log('totalAmountXiu'+totalAmountXiu);
//         console.log('moneyXiu'+moneyXiu);
//         console.log('reTotalAmountXiu'+reTotalAmountXiu);
//         console.log('reMoney'+reMoney);
//         console.log('money'+money);
//       	db.doc("betLists/" + timeGameStart + "/listXiu/" + uid).set({
//              moneyXiu: moneyXiu
//         })
//         db.collection("users").doc(uid).update({
//             "money": reMoney
//         })
//       	db.collection("betLists").doc(timeGameStart).update({
//             "totalAmountXiu": reTotalAmountXiu
//         })
//     }
//   }
// };









// // 11/53
// 	/**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// const cors = require('cors')({origin: true});
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.helloWorld = (req, res) => {
//   let message = req.query.message || req.body.message || 'Hello World!';
//   res.status(200).send(message);
// };

// exports.sendMoneyXiu = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyXiu = parseInt(req.body.moneyXiu);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountXiu;
//   console.log("BODY IS:"+JSON.stringify(req.body));
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyXiu: moneyXiu, timeGameStart: timeGameStart});
//   })
//   var docRef = db.collection("users").doc(uid);
//   var doc = db.collection("betLists").doc(timeGameStart);

//   docRef.get().then(function(doc) {
//       if (doc.exists) {
//         console.log("Document data:", doc.data());
//         money = parseInt(doc.data().money);
//         getTotalAmountXiu()
//         console.log('ok1');
//       } else {
//           console.log("No such document!");
//       }
//   })
//   function getTotalAmountXiu() {
//     doc.get().then(function(doc) {
//       if (doc.exists) {
//         console.log("Document data:", doc.data());
//         totalAmountXiu = doc.data().totalAmountXiu;
//         console.log('ok2');
//         checkMoney();
//       } else {
//         console.log("No such document!");
//       }
//     })
//   }
//   function checkMoney() {
//   	if (money >= moneyXiu) {
//       	var reTotalAmountXiu = parseInt(totalAmountXiu + moneyXiu);
//       	var reMoney = parseInt(money - moneyXiu);

//       	db.doc("betLists/" + timeGameStart + "/listXiu/" + uid).set({
//              moneyXiu: moneyXiu
//         })

//         db.collection("users").doc(uid).update({
//             "money": reMoney
//         })

//       	db.collection("betLists").doc(timeGameStart).update({
//             "totalAmountXiu": reTotalAmountXiu
//         })
//     }
//   }
// };












// {
//   "name": "sample-firebase-auth",
//   "version": "2.0.0",
//   "description": "Testnet ETH Wallet",
//   "main": "index.js",
//   "repository": "Nope",
//   "author": "phuocding",
//   "license": "MIT",
//   "private": true,
//   "dependencies": {
//     "chalk": "^2.4.2",
//     "eth-lightwallet": "^3.0.1",
//     "ethereumjs-tx": "^1.3.7",
//     "ethereumjs-util": "^6.0.0",
//     "express": "^4.16.4",
//     "web3": "^1.0.0-beta.37",
//     "firebase-admin": "~6.4.0",
//   	"firebase-functions": "^2.1.0",
//     "firebase": "5.7.0"
// 	},
//   "devDependencies": {
//     "eslint": "^4.13.1",
//     "eslint-plugin-promise": "^3.6.0"
//   },
//   "engines": {
//     "node": "6"
//   }
// }











// /**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// var currentTime = new Date().getTime();
// const cors = require('cors')({origin: true});
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.sendMoneyTai = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyTai = parseInt(req.body.moneyTai);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountTai, getMoneyTai;
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyTai: moneyTai, timeGameStart: timeGameStart});
//   })

//   db.collection("users").doc(uid).get().then(function(doc) {
//       if (doc.exists) {
//         money = parseInt(doc.data().money);
//         getTotalAmountTai();
//       }
//   })
//   function getTotalAmountTai() {
//     console.log('1');
//     db.collection("betLists").doc(timeGameStart).get().then(function(doc) {
//       if (doc.exists) {
//         totalAmountTai = parseInt(doc.data().totalAmountTai);
//         checkMoney();
//       }
//     })
//   }
//   function checkMoney() {
//     console.log('3');
//     db.doc("betLists/" + timeGameStart + "/listTai/" + uid).get().then(function(doc) {
//       if (doc.exists) {
//         getMoneyTai = parseInt(doc.data().moneyTai);
//         console.log(getMoneyTai + 'tung12');
//       }
//       else {
//         getMoneyTai = 0;
//         console.log(getMoneyTai + 'tung12123');
//       }
//       updataMoney();
//     });
//     function updataMoney() {
//       if (money >= moneyTai && currentTime < (timeGameStart + 35000)) {
//           var reTotalAmountTai = totalAmountTai + moneyTai;
//           var reMoney = parseInt(money - moneyTai);
//           console.log(getMoneyTai+"=>"+moneyTai);
//           var reGetMoneyTai = parseInt(getMoneyTai + moneyTai);
//           updataTotalAmountTai();
//           function updataTotalAmountTai() {
//             db.collection("betLists").doc(timeGameStart).update({
//                "totalAmountTai": reTotalAmountTai,
//             })
//             console.log(reTotalAmountTai+'tungdz1');
//             updataMoney();
//           }

//           function updataMoney() {
//             db.collection("users").doc(uid).update({
//                "money": reMoney,
//             })
//             console.log(reMoney+'tungdz2');
//             updataMoneyTai();
//           }

//           function updataMoneyTai() {
//             db.doc("betLists/" + timeGameStart + "/listTai/" + uid).set({
//                moneyTai: reGetMoneyTai,
//             })
//             console.log(reGetMoneyTai+'tungdz3');
//           }
//       }
//     }
//   }
// };




















// /**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// const cors = require('cors')({origin: true});
// var currentTime = new Date().getTime();
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.sendMoneyTa = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyTai = parseInt(req.body.moneyTai);
//   var timeGameStart = req.body.timeGameStart;
//   var money, getMoneyTai;

//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyTai: moneyTai, timeGameStart: timeGameStart});
//   })

//   db.collection("users").doc(uid).get().then(function(doc) {
//       if (doc.exists) {
//         money = parseInt(doc.data().money)
//         console.log(money+'ok');;
//         getDataMoneyTai()
//       }
//   })
//   function getDataMoneyTai() {
//     db.doc("betLists/" + timeGameStart + "/listTai/" + uid).get().then(function(doc) {
//       if (doc.exists) {
//         getMoneyTai = parseInt(doc.data().moneyTai);
//         console.log(getMoneyTai + 'tung12');
//       }
//       else {
//         getMoneyTai = 0;
//         console.log(getMoneyTai + 'tung12123');
//       }
//       checkMoney();
//     });
//   }

//   function checkMoney() {
//     console.log('tung1');
//     console.log(money+'ok1');
//     console.log(moneyTai+'ok2');
//     if (money >= moneyTai) {
//       console.log('tung');
//       var reGetMoneyTai = parseInt(getMoneyTai + moneyTai);
//       db.doc("betLists/" + timeGameStart + "/listTai/" + uid).set({
//         moneyTai: reGetMoneyTai,
//       })
//     }
//   }
// };
























// // function 4
// /**
//  * Responds to any HTTP request.
//  *
// //  * @param {!express:Request} req HTTP request context.
// //  * @param {!express:Response} res HTTP response context.
//  */
// // var currentTime = new Date().getTime();
// const cors = require('cors')({origin: true});
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );
// exports.sendMoneyTai = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyTai = parseInt(req.body.moneyTai);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountTai, getMoneyTai;
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyTai: moneyTai, timeGameStart: timeGameStart});
//   })

//   db.collection("users").doc(uid).get().then(function(doc) {
//       if (doc.exists) {
//         money = parseInt(doc.data().money);
//         getTotalAmountTai();
//       }
//   })
//   function getTotalAmountTai() {
//     console.log('1');
//     db.collection("betLists").doc(timeGameStart).get().then(function(doc) {
//       if (doc.exists) {
//         totalAmountTai = parseInt(doc.data().totalAmountTai);
//         checkMoney();
//       }
//     })
//   }
//   function checkMoney() {
//     console.log('3');
//     db.doc("betLists/" + timeGameStart + "/listTai/" + uid).get().then(function(doc) {
//       if (doc.exists) {
//         getMoneyTai = parseInt(doc.data().moneyTai);
//         console.log(getMoneyTai + 'tung12');
//       }
//       else {
//         getMoneyTai = 0;
//         console.log(getMoneyTai + 'tung12123');
//       }
//       updataMoney();
//     });
//     function updataMoney() {
//       if (money >= moneyTai && currentTime < (timeGameStart + 35000)) {
//           var reTotalAmountTai = totalAmountTai + moneyTai;
//           var reMoney = parseInt(money - moneyTai);
//           console.log(getMoneyTai+"=>"+moneyTai);
//           var reGetMoneyTai = parseInt(getMoneyTai + moneyTai);
//           updataTotalAmountTai();
//           function updataTotalAmountTai() {
//             db.collection("betLists").doc(timeGameStart).update({
//                "totalAmountTai": reTotalAmountTai,
//             })
//             console.log(reTotalAmountTai+'tungdz1');
//             updataMoney();
//           }

//           function updataMoney() {
//             db.collection("users").doc(uid).update({
//                "money": reMoney,
//             })
//             console.log(reMoney+'tungdz2');
//             updataMoneyTai();
//           }

//           function updataMoneyTai() {
//             db.doc("betLists/" + timeGameStart + "/listTai/" + uid).set({
//                moneyTai: reGetMoneyTai,
//             })
//             console.log(reGetMoneyTai+'tungdz3');
//           }
//       }
//     }
//   }
// };










// exports.sendMoneyTai = (req, res) => {
//   var response = res;
//   var uid = req.body.id;
//   var moneyTai = parseInt(req.body.moneyTai);
//   var timeGameStart = req.body.timeGameStart;
//   var money,totalAmountTai, getMoneyTai;
//   cors(req, res, () => {
//     res.status(200).send({uid: uid, moneyTai: moneyTai, timeGameStart: timeGameStart});
//   })

//   db.collection("users").doc(uid).get().then(function(doc) {
//       if (doc.exists) {
//         money = parseInt(doc.data().money);
//         db.collection("betLists").doc(timeGameStart).get().then(function(doc) {
//           if (doc.exists) {
//             totalAmountTai = parseInt(doc.data().totalAmountTai);
//             db.doc("betLists/" + timeGameStart + "/listTai/" + uid).get().then(function(doc) {
//               if (doc.exists) {
//                 getMoneyTai = parseInt(doc.data().moneyTai);
//                 console.log(getMoneyTai + 'tung12');
//               }
//               else {
//                 getMoneyTai = 0;
//                 console.log(getMoneyTai + 'tung12123');
//               }
//               if (money >= moneyTai && currentTime < (timeGameStart + 35000)) {
//                   var reTotalAmountTai = totalAmountTai + moneyTai;
//                   var reMoney = parseInt(money - moneyTai);
//                   console.log(getMoneyTai+"=>"+moneyTai);
//                   var reGetMoneyTai = parseInt(getMoneyTai + moneyTai);
//                   db.collection("betLists").doc(timeGameStart).update({
//                       "totalAmountTai": reTotalAmountTai,
//                   })

//                   db.collection("users").doc(uid).update({
//                       "money": reMoney,
//                   })

//                   db.doc("betLists/" + timeGameStart + "/listTai/" + uid).set({
//                       moneyTai: reGetMoneyTai,
//                   })
//               }
//             })
//           }
//         })
//       }
//   })
// }




// function 3
// let timeStart = new Date().getTime(), blockNumber, dice1, dice2, dice3, result;
// const Web3 = require('web3');
// const web3 = new Web3('https://mainnet.infura.io/v3/cef31cde6d544f1580050862d0efb062');

// const functions = require('firebase-functions');
// const firebase = require('firebase/app');

// require ('firebase/firestore');
// firebase.initializeApp({
// apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//    projectId: 'taixiu-d9c98'
// });

// const db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     }
// );

// exports.helloWorld = (req, res) => {
//   		setTimeout(function(){
//             web3.eth.getBlock("latest", true, (err, blockDetail) => {
//               if (!err) {
//                 blockNumber = blockDetail.number;
//                 console.log(blockNumber);
//                 hash = blockDetail.hash;
//                 hash = web3.utils.toBN(hash).toString();
//                 dice1 = hash.slice(-3) % 6 + 1;
//                 dice2 = hash.slice(-6, -3) % 6 + 1;
//                 dice3 = hash.slice(-9, -6) % 6 + 1;
//                 result = dice1 + dice2 + dice3;
//                 console.log(dice1);
//                 console.log(dice2);
//                 console.log(dice3);
//                 console.log(result);
//                 setResultGame();
//               } else {
//                 console.log("hash của tao đâu?");
//               }
//             });
//           console.log('da chay');
//         },35000);
//   		function setResultGame() {
//         	db.doc("listResult/lastGame").set({
//               id: blockNumber,
//               hat1: dice1,
//               hat2: dice2,
//               hat3: dice3,
//               ketqua: result
//             });
//         }
// 		console.log('abc123tungvan23');
// 		var timeStart = new Date().getTime();
// 		var timeEndBet = timeStart + 45000;
// 		var timeCanCua = timeStart + 50000;
// 		var timePrepareNewGame = timeStart + 53000;
//   		var timeStart1 = new Date().getTime();

//   		function t(){
//           db.doc("batsukien/123456789").set({
//               timeStart: timeStart,
//           });
//           console.log(timeStart);
//           db.doc("betLists/" + timeStart + "/listTai/tai").set({
//             moneyTai: 0
//           });
//           db.doc("betLists/" + timeStart + "/listXiu/xiu").set({
//             moneyXiu: 0
//           });
//           db.doc("betLists/" + timeStart).set({
//               timeStart: timeStart,
//               timeEnd: timeEndBet,
//               timeCanCua: timeCanCua,
//               timePrepareNewGame: timePrepareNewGame,
//               totalAmountTai: 0,
//               totalAmountXiu: 0,
//               totalPlayerTai: 0,
//               totalPlayerXiu: 0
//           });
//         }
//   		t();

//   let message = req.query.message || req.body.message || 'Hello World!';
//   res.status(200).send(message);
// };








// function 1
// /**
//  * Responds to any HTTP request.
// //  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */
// const cors = require('cors')();
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require('firebase/firestore');
// firebase.initializeApp({
//     apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//     authDomain: 'taixiu-d9c98.firebaseapp.com',
//     projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
// db.settings({
//     timestampsInSnapshots: true
// }
// );
// exports.sendMoneyXiu = 






// (req, res) => {
//     var currentTime = new Date().getTime();
//     //respond to CORS preflight requests
//     if (req.method == 'OPTIONS') {
//         res.status(204).send('');
//     }
//     var response = res;
//     var uid = req.body.id;
//     var moneyXiu = parseInt(req.body.moneyXiu);
//     var timeGameStart = req.body.timeGameStart;
//     var money, totalAmountXiu, getMoneyXiu;
//     cors(req, res, () => {
//         //get money in users
//         db.collection("users").doc(uid).get().then(function (doc) {
//             if (doc.exists) {
//                 money = parseInt(doc.data().money);
//             }
//         })
//         //get totalAmountXiu in betlists
//         db.collection("betLists").doc(timeGameStart).get().then(function (doc) {
//             if (doc.exists) {
//                 totalAmountXiu = parseInt(doc.data().totalAmountXiu);
//                 //get moneyXiu in listXiu
//             }
//         })
//         db.doc("betLists/" + timeGameStart + "/listXiu/" + uid).get().then(function (doc) {
//             if (doc.exists) {
//                 getMoneyXiu = parseInt(doc.data().moneyXiu);
//             }
//             else {
//                 getMoneyXiu = 0;
//                 db.collection("betLists").doc(timeGameStart).get().then(function (doc) {
//                     if (doc.exists) {
//                         totalPlayerXiu = parseInt(doc.data().totalPlayerXiu) + 1;
//                         db.collection("betLists").doc(timeGameStart).update({
//                             "totalPlayerXiu": totalPlayerXiu,
//                         })
//                     }
//                 })
//             }
//         })
//         if (money >= moneyXiu && currentTime < (timeGameStart + 35000)) {
//             var reTotalAmountXiu = totalAmountXiu + moneyXiu;
//             var reMoney = parseInt(money - moneyXiu);
//             var reGetMoneyXiu = parseInt(getMoneyXiu + moneyXiu);
//             updateMoney();
//             //update money for users
//             function updateMoney() {
//                 db.collection("users").doc(uid).update({
//                     "money": reMoney,
//                 });
//                 updateTotalAmountXiu();
//             }
//             //update totalAmountXiu
//             function updateTotalAmountXiu() {
//                 db.collection("betLists").doc(timeGameStart).update({
//                     "totalAmountXiu": reTotalAmountXiu,
//                 });
//                 setMoneyXiu();
//             }
//             //update moneyXiu
//             function setMoneyXiu() {
//                 db.doc("betLists/" + timeGameStart + "/listXiu/" + uid).set({
//                     moneyXiu: reGetMoneyXiu,
//                 });
//                 var time = new Date().getTime();
//                 console.log((time - currentTime) / 1000)
//             }
//         }
//         res.status(200).send({ uid: uid, moneyXiu: moneyXiu, timeGameStart: timeGameStart });
//     })
// }