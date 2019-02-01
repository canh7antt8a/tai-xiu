// /**
//  * Responds to any HTTP request.
//  *
//  * @param {!express:Request} req HTTP request context.
//  * @param {!express:Response} res HTTP response context.
//  */

// const Web3 = require('web3');
// const web3 = new Web3('https://mainnet.infura.io/v3/cef31cde6d544f1580050862d0efb062');

// const functions = require('firebase-functions');
// const firebase = require('firebase/app');

// require('firebase/firestore');
// firebase.initializeApp({
//   apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//   authDomain: 'taixiu-d9c98.firebaseapp.com',
//   projectId: 'taixiu-d9c98'
// });

// const db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true
// }
// );

// exports.setGame = (req, res) => {
//   var timeStart = new Date().getTime(), blockNumber, dice1, dice2, dice3, result;
//   setTimeout(function () {
//     //get transaction on web3
//     web3.eth.getBlock("latest", true, (err, blockDetail) => {
//       if (!err) {
//         blockNumber = blockDetail.number;
//         hash = blockDetail.hash;
//         hash = web3.utils.toBN(hash).toString();
//         dice1 = hash.slice(-3) % 6 + 1;
//         dice2 = hash.slice(-6, -3) % 6 + 1;
//         dice3 = hash.slice(-9, -6) % 6 + 1;
//         result = dice1 + dice2 + dice3;
//         canCua();
//         addDataResult();
//         db.doc("betLists/" + timeStart).update({
//           'id': blockNumber,
//           'hat1': dice1,
//           'hat2': dice2,
//           'hat3': dice3,
//           'ketqua': result
//         })
//       }
//     });
//   }, 100000);
//   //add data in list result in firebase
//   function addDataResult() {
//     db.doc("listResult/lastGame").set({
//       timeStar: timeStart,
//       id: blockNumber,
//       hat1: dice1,
//       hat2: dice2,
//       hat3: dice3,
//       ketqua: result
//     });
//     getResult(result);
//   }
//   // update money users in firebase
//   function getResult(result) {
//     if (result > 10) {
//       db.collection("betLists/" + timeStart + '/listTai').get().then(function (doc) {
//         for (var i = 0; i < doc.docs.length; i++) {
//           var getMoney = parseInt(doc.docs[i].data().moneyTai);
//           var id = doc.docs[i].id;
//           var reMoney = getMoney * 2;
//           addMoneyUsers(id);
//           function addMoneyUsers(id) {
//             db.doc("users/" + id).get().then(function (doc) {
//               var money = parseInt(doc.data().money);
//               var totalMoney = reMoney + money;
//               db.collection("users").doc(id).update({
//                 "money": totalMoney,
//               })
//             });
//           }
//         }
//       });
//     }
//     else if (result <= 10) {
//       db.collection("betLists/" + timeStart + '/listXiu').get().then(function (doc) {
//         console.log(doc.docs.length);
//         for (var i = 0; i < doc.docs.length; i++) {
//           var getMoney = parseInt(doc.docs[i].data().moneyXiu);
//           var id = doc.docs[i].id;
//           var reMoney = getMoney * 2;
//           addMoneyUsers(id);
//           function addMoneyUsers(id) {
//             db.doc("users/" + id).get().then(function (doc) {
//               var money = parseInt(doc.data().money);
//               var totalMoney = reMoney + money;
//               db.collection("users").doc(id).update({
//                 "money": totalMoney,
//               })
//             });
//           }
//         }
//       });
//     }
//   }
//   //cân cửa
//   async function canCua() {

//     var totalAmountTai, totalAmountXiu, soDu;
//     var docBetLists = await db.doc("betLists/" + timeStart).get();
//     totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//     totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//     soDu = totalAmountTai - totalAmountXiu;

//     if (soDu > 0) {
//       var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//       var log = docListTai.docs.length;
//       var tienConLai, moneyTai, moneyUsesr;

//       for (var i = 0; i < log; i++) {
//         var totalAmountTai, totalAmountXiu, soDu;
//         var timeStart = '1547477703757';
//         var docBetLists = await db.doc("betLists/" + timeStart).get();
//         totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//         totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//         soDu = totalAmountTai - totalAmountXiu;
//         var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//         var log = docListTai.docs.length;
//         var tienConLai, moneyTai, moneyUsesr;

//         var getMoney = parseInt(docListTai.docs[log - i - 1].data().moneyTai);
//         var id = docListTai.docs[log - i - 1].id;
//         tienConLai = soDu - getMoney;
//         var doo = await db.doc("users/" + id).get();
//         var money = parseInt(doo.data().money);
//         console.log(money);

//         if (tienConLai < 0) {
//           moneyTai = tienConLai * (-1);
//           moneyUsesr = money + soDu;

//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//             "moneyTai": moneyTai,
//           });
//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountTai": totalAmountXiu,
//           });
//           break;
//         }
//         if (tienConLai == 0) {
//           moneyUsesr = money + soDu;
//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//             "moneyTai": 0,
//           });
//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountTai": totalAmountXiu,
//           });
//           break;
//         }
//         if (tienConLai > 0) {
//           moneyUsesr = money + soDu;
//           db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//             "moneyTai": 0,
//           });

//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountTai": (totalAmountTai - getMoney),
//           });
//           console.log(totalAmountTai - getMoney);

//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           console.log(moneyUsesr);

//         }
//       }
//     }
//     if (soDu < 0) {
//       var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//       var log = docListTai.docs.length;
//       var tienConLai, moneyTai, moneyUsesr;

//       for (var i = 0; i < log; i++) {
//         var totalAmountTai, totalAmountXiu, soDu;
//         var timeStart = '1547477703757';
//         var docBetLists = await db.doc("betLists/" + timeStart).get();
//         totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//         totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//         soDu = totalAmountXiu - totalAmountTai;
//         var docListXiu = await db.collection("betLists/" + timeStart + '/listXiu').get();
//         var log = docListXiu.docs.length;
//         var tienConLai, moneyXiu, moneyUsesr;

//         var getMoney = parseInt(docListXiu.docs[log - i - 1].data().moneyXiu);
//         var id = docListXiu.docs[log - i - 1].id;
//         tienConLai = soDu - getMoney;
//         var doo = await db.doc("users/" + id).get();
//         var money = parseInt(doo.data().money);
//         console.log(money);

//         if (tienConLai < 0) {
//           moneyXiu = tienConLai * (-1);
//           moneyUsesr = money + soDu;

//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//             "moneyXiu": moneyXiu,
//           });
//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountXiu": totalAmountTai,
//           });
//           break;
//         }
//         if (tienConLai == 0) {
//           moneyUsesr = money + soDu;
//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//             "moneyXiu": 0,
//           });
//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountXiu": totalAmountTai,
//           });
//           break;
//         }
//         if (tienConLai > 0) {
//           moneyUsesr = money + soDu;
//           db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//             "moneyXiu": 0,
//           });

//           db.collection("betLists").doc(timeStart).update({
//             "totalAmountXiu": (totalAmountXiu - getMoney),
//           });
//           console.log(totalAmountXiu - getMoney);

//           db.collection("users").doc(id).update({
//             "money": moneyUsesr,
//           });
//           console.log(moneyUsesr);

//         }
//       }
//     }
//   }
//   // update new game in firabase
//   function reGame() {
//     db.doc("batsukien/123456789").set({
//       timeStart: timeStart,
//     });
//     console.log(timeStart);
//     db.doc("betLists/" + timeStart).set({
//       timeStart: timeStart,
//       totalAmountTai: 0,
//       totalAmountXiu: 0,
//       totalPlayerTai: 0,
//       totalPlayerXiu: 0
//     });
//   }
//   reGame();

//   let message = req.query.message || req.body.message || 'Hello World!';
//   res.status(200).send(message);
// };











// //cân cửa
// async function canCua() {

//   var totalAmountTai, totalAmountXiu, soDu;
//   var docBetLists = await db.doc("betLists/" + timeStart).get();
//   totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//   totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//   soDu = totalAmountTai - totalAmountXiu;

//   if (soDu > 0 ) {
//     var docListTai = await db.collection("betLists/" + timeStart +'/listTai' ).get();
//     var log = docListTai.docs.length;
//     var tienConLai, moneyTai, moneyUsesr;

//     for (var i = 0; i < log; i++) {
//       var totalAmountTai, totalAmountXiu, soDu;
//       var docBetLists = await db.doc("betLists/" + timeStart).get();
//       totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//       totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//       soDu = totalAmountTai - totalAmountXiu;
//       var docListTai = await db.collection("betLists/" + timeStart +'/listTai' ).get();
//       var log = docListTai.docs.length;
//       var tienConLai, moneyTai, moneyUsesr;

//       var getMoney = parseInt(docListTai.docs[log-i-1].data().moneyTai);
//       var id = docListTai.docs[log-i-1].id;
//       tienConLai = soDu - getMoney;
//       var doo = await db.doc("users/" + id).get();
//       var money = parseInt(doo.data().money);
//       console.log(money);

//       if (tienConLai < 0){
//         moneyTai = tienConLai * (-1);
//         moneyUsesr = money + soDu;

//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         db.doc("betLists/" + timeStart +'/listTai/' + id).update({
//           "moneyTai": moneyTai,
//         });
//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountTai": totalAmountXiu,
//         });
//         break;
//       }
//       if (tienConLai == 0){
//         moneyUsesr = money + soDu;
//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         db.doc("betLists/" + timeStart +'/listTai/' + id).update({
//           "moneyTai": 0,
//         });
//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountTai": totalAmountXiu,
//         });
//         break;
//       }
//       if (tienConLai > 0) {
//         moneyUsesr = money + soDu;
//         db.doc("betLists/" + timeStart +'/listTai/' + id).update({
//           "moneyTai": 0,
//         });

//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountTai": (totalAmountTai - getMoney),
//         });
//         console.log(totalAmountTai - getMoney);

//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         console.log(moneyUsesr);

//       }
//     }
//   }
//   if (soDu < 0) {
//     var docListTai = await db.collection("betLists/" + timeStart +'/listTai' ).get();
//     var log = docListTai.docs.length;
//     var tienConLai, moneyTai, moneyUsesr;

//     for (var i = 0; i < log; i++) {
//       var totalAmountTai, totalAmountXiu, soDu;
//       var docBetLists = await db.doc("betLists/" + timeStart).get();
//       totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//       totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//       soDu = totalAmountXiu - totalAmountTai;
//       var docListXiu = await db.collection("betLists/" + timeStart +'/listXiu' ).get();
//       var log = docListXiu.docs.length;
//       var tienConLai, moneyXiu, moneyUsesr;

//       var getMoney = parseInt(docListXiu.docs[log-i-1].data().moneyXiu);
//       var id = docListXiu.docs[log-i-1].id;
//       tienConLai = soDu - getMoney;
//       var doo = await db.doc("users/" + id).get();
//       var money = parseInt(doo.data().money);
//       console.log(money);

//       if (tienConLai < 0){
//         moneyXiu = tienConLai * (-1);
//         moneyUsesr = money + soDu;

//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         db.doc("betLists/" + timeStart +'/listXiu/' + id).update({
//           "moneyXiu": moneyXiu,
//         });
//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountXiu": totalAmountTai,
//         });
//         break;
//       }
//       if (tienConLai == 0){
//         moneyUsesr = money + soDu;
//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         db.doc("betLists/" + timeStart +'/listXiu/' + id).update({
//           "moneyXiu": 0,
//         });
//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountXiu": totalAmountTai,
//         });
//         break;
//       }
//       if (tienConLai > 0) {
//         moneyUsesr = money + soDu;
//         db.doc("betLists/" + timeStart +'/listXiu/' + id).update({
//           "moneyXiu": 0,
//         });

//         db.collection("betLists").doc(timeStart).update({
//           "totalAmountXiu": (totalAmountXiu - getMoney),
//         });
//         console.log(totalAmountXiu - getMoney);

//         db.collection("users").doc(id).update({
//           "money": moneyUsesr,
//         });
//         console.log(moneyUsesr);

//       }
//     }
//   }
// }





// var timeStart = 1548069843643;


// async function reTotalAmountTai() {
//   var  docListTai = await db.collection("betLists/" + timeStart +'/listTai' ).get();
//     var totalAmountTai = 0;
//     for (var i = 0; i < docListTai.docs.length; i++) {
//       var getMoney = parseInt(docListTai.docs[i].data().moneyTai);
//       totalAmountTai += getMoney;
//     }
//     db.doc("betLists/" + timeStart).update({
//       'totalAmountTai' : totalAmountTai
//     })
// }
// // re total money xiu
// async function reTotalAmountXiu() {
//   var  docListXiu = await db.collection("betLists/" + timeStart +'/listXiu' ).get();
//     var totalAmountXiu = 0;
//     for (var i = 0; i < docListXiu.docs.length; i++) {
//       var getMoney = parseInt(docListXiu.docs[i].data().moneyXiu);
//       totalAmountXiu += getMoney;
//     }
//     db.doc("betLists/" + timeStart).update({
//       'totalAmountXiu' : totalAmountXiu
//     })
// }
// setInterval(function () {
//   var dung = setInterval(function () {
//     console.log('tungok');
//     clearInterval(dung);
//   },2000)
// },10000)

// function dung() {
//   var dung = setInterval(function () {
//     var timeStar = new Date().getTime();
//     reTotalAmountTai();
//     reTotalAmountXiu();
//     if (timeStar < (timeStart + 70000)) {
//         clearInterval(dung);
//     }
//   },4000)
// }
// var le;
// Promise.all(tung1()).then(values => { 
//   tung2()
// });
// function tung1() {
//   setTimeout(() =>{
//     le = 'tung';
//   },5000)
// }
// // function tung2() {
// //   console.log(le);
// // }
// async function returnTrue() {

//   // create a new promise inside of the async function
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(true), 3000)
//   });

//   // wait for the promise to resolve
//   let result = await promise;

//   // console log the result (true)
//   if (result === true) {
//     console.log('result');
//   }
// }

// // call the function
// returnTrue();
// re total money tai
// async function reTotalAmountTai() {
//   var  docListTaiCan = await db.collection("betLists/" + timeStart +'/listTai' ).get();
//   var totalAmountTaiCan = 0;
//   for (var i = 0; i < docListTaiCan.docs.length; i++) {
//     var getMoneyCan = parseInt(docListTaiCan.docs[i].data().moneyTai);
//     totalAmountTaiCan += getMoneyCan;
//   }
//   db.doc("betLists/" + timeStart).update({
//     'totalAmountTai' : totalAmountTaiCan
//   })
// }
// // re total money xiu
// async function reTotalAmountXiu() {
//   var  docListXiuCua = await db.collection("betLists/" + timeStart +'/listXiu' ).get();
//   var totalAmountXiuCua = 0;
//   for (var i = 0; i < docListXiuCua.docs.length; i++) {
//     var getMoneyCua = parseInt(docListXiuCua.docs[i].data().moneyXiu);
//     totalAmountXiuCua += getMoneyCua;
//   }
//   db.doc("betLists/" + timeStart).update({
//     'totalAmountXiu' : totalAmountXiuCua
//   })
// }












// // hàm 4
// const functions = require('firebase-functions');

// const firebase = require('firebase/app');

// require('firebase/firestore');
// firebase.initializeApp({
//   apiKey: 'AIzaSyDjeQf682dkYJ72UngE9iXeovD-D2047gg',
//   authDomain: 'taixiu-d9c98.firebaseapp.com',
//   projectId: 'taixiu-d9c98'
// });

// var db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true
// }
// );
// exports.sendMoneyTai = (req, res) => {
//   res.set('Access-Control-Allow-Origin', "*")
//   res.set('Access-Control-Allow-Methods', 'GET, POST');
//   var currentTime = new Date().getTime();
//   //respond to CORS preflight requests
//   if (req.method == 'OPTIONS') {
//     res.status(204).send('');
//   }

//   var response = res;
//   var uid = req.body.id;
//   var moneyTai = parseInt(req.body.moneyTai);
//   var timeGameStart = req.body.timeGameStart;
//   var money, totalAmountTai, getMoneyTai, alert;
//   async function fnMoneyTai() {
//     //get money in users
//     const userData = await db.collection("users").doc(uid).get();
//     if (userData.exists) {
//       money = parseInt(userData.data().money);
//       console.log(currentTime);
//       var timeEndBet = parseInt(timeGameStart) + 70000;
//       console.log(timeEndBet);
//       if (money >= moneyTai && currentTime < timeEndBet) {
//         var reMoney = parseInt(money - moneyTai);
//         //update money for users
//         function updateMoney() {
//           db.collection("users").doc(uid).update({
//             "money": reMoney,
//           });
//           // updateTotalAmountTai();
//         }
//         await updateMoney(); 
// undefined
//         //get totalAmountTai in betlists
//         const betLists = await db.collection("betLists").doc(timeGameStart).get();
//         if (betLists.exists) {
//           totalAmountTai = parseInt(betLists.data().totalAmountTai);
//         }

//         //get moneyTai in listTai
//         const listTai = await db.doc("betLists/" + timeGameStart + "/listTai/" + uid).get();
//         if (listTai.exists) {
//           getMoneyTai = parseInt(listTai.data().moneyTai);
//         }
//         else {
//           getMoneyTai = 0;
//           const betLs = await db.collection("betLists").doc(timeGameStart).get();

//           if (betLs.exists) {
//             totalPlayerTai = parseInt(betLs.data().totalPlayerTai) + 1;
//             await db.collection("betLists").doc(timeGameStart).update({
//               "totalPlayerTai": totalPlayerTai,
//             })
//           }
//         }
//         var reTotalAmountTai = totalAmountTai + moneyTai;
//         var reGetMoneyTai = parseInt(getMoneyTai + moneyTai);
//         // updateMoney();

//         //update totalAmountTai
//         function updateTotalAmountTai() {
//           db.collection("betLists").doc(timeGameStart).update({
//             "totalAmountTai": reTotalAmountTai,
//           });
//           // setMoneyTai();
//         }
//         await updateTotalAmountTai();

//         //update moneyTai
//         function setMoneyTai() {
//           db.doc("betLists/" + timeGameStart + "/listTai/" + uid).set({
//             moneyTai: reGetMoneyTai,
//           });
//           var time = new Date().getTime();
//         }
//         await setMoneyTai();
//       }
//       else{
//         alert = "số tiền không hợp lệ";
//       }
//     }
//     res.status(200).send({qe: alert});
//   }
//   fnMoneyTai();
// }

// var timeStart = 1548674040410;
// moneyUsesr = 2010 + 20;
// var id = 'VlqQEjfS80NjnYISE3ZGSnChIBD2';
// db.doc("users/" + id).update({
//     "money": moneyUsesr,
// });
// db.doc("betLists/" + timeStart +'/listXiu/' + id).update({
//     "moneyXiu": 0,
// });
// db.doc("betLists/" + timeStart).update({
//     "totalAmountXiu": 6661,
// });
// async function canCua() {
//     // re total money tai
//     var docListTaiCan = await db.collection("betLists/" + timeStart + '/listTai').get();
//     var totalAmountTaiCan = 0;
//     for (var i = 0; i < docListTaiCan.docs.length; i++) {
//         var getMoneyCan = parseInt(docListTaiCan.docs[i].data().moneyTai);
//         totalAmountTaiCan += getMoneyCan;
//     }
//     await db.doc("betLists/" + timeStart).update({
//         'totalAmountTai': totalAmountTaiCan
//     })
//     // re total money xiu
//     var docListXiuCua = await db.collection("betLists/" + timeStart + '/listXiu').get();
//     var totalAmountXiuCua = 0;
//     for (var i = 0; i < docListXiuCua.docs.length; i++) {
//         var getMoneyCua = parseInt(docListXiuCua.docs[i].data().moneyXiu);
//         totalAmountXiuCua += getMoneyCua;
//     }
//     await db.doc("betLists/" + timeStart).update({
//         'totalAmountXiu': totalAmountXiuCua
//     })

//     var totalAmountTai, totalAmountXiu, soDu;
//     var docBetLists = await db.doc("betLists/" + timeStart).get();
//     totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//     totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//     soDu = totalAmountTai - totalAmountXiu;

//     if (soDu > 0) {
//         var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//         var log = docListTai.docs.length;
//         var tienConLai, moneyTai, moneyUsesr;

//         for (var i = 0; i < log; i++) {
//             var totalAmountTai, totalAmountXiu, soDu;
//             var docBetLists = await db.doc("betLists/" + timeStart).get();
//             totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//             totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//             soDu = totalAmountTai - totalAmountXiu;
//             var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//             var log = docListTai.docs.length;
//             var tienConLai, moneyTai, moneyUsesr;

//             var getMoney = parseInt(docListTai.docs[log - i - 1].data().moneyTai);
//             var id = docListTai.docs[log - i - 1].id;
//             tienConLai = soDu - getMoney;
//             var doo = await db.doc("users/" + id).get();
//             var money = parseInt(doo.data().money);
//             console.log(money);

//             if (tienConLai < 0) {
//                 moneyTai = tienConLai * (-1);
//                 moneyUsesr = money + soDu;

//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//                 db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//                     "moneyTai": moneyTai,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountTai": totalAmountXiu,
//                 });
//                 break;
//             }
//             if (tienConLai == 0) {
//                 moneyUsesr = money + soDu;
//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//                 db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//                     "moneyTai": 0,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountTai": totalAmountXiu,
//                 });
//                 break;
//             }
//             if (tienConLai > 0) {
//                 moneyUsesr = money + getMoney;
//                 db.doc("betLists/" + timeStart + '/listTai/' + id).update({
//                     "moneyTai": 0,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountTai": (totalAmountTai - getMoney),
//                 });
//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//             }
//         }
//     }
//     if (soDu < 0) {
//         var docListTai = await db.collection("betLists/" + timeStart + '/listTai').get();
//         var log = docListTai.docs.length;
//         var tienConLai, moneyTai, moneyUsesr;

//         for (var i = 0; i < log; i++) {
//             var totalAmountTai, totalAmountXiu, soDu;
//             var docBetLists = await db.doc("betLists/" + timeStart).get();
//             totalAmountTai = parseInt(docBetLists.data().totalAmountTai);
//             totalAmountXiu = parseInt(docBetLists.data().totalAmountXiu);
//             soDu = totalAmountXiu - totalAmountTai;
//             var docListXiu = await db.collection("betLists/" + timeStart + '/listXiu').get();
//             var log = docListXiu.docs.length;
//             var tienConLai, moneyXiu, moneyUsesr;
//             var getMoney = parseInt(docListXiu.docs[log - i - 1].data().moneyXiu);
//             var id = docListXiu.docs[log - i - 1].id;
//             tienConLai = soDu - getMoney;
//             var doo = await db.doc("users/" + id).get();
//             var money = parseInt(doo.data().money);
//             console.log(tienConLai);

//             if (tienConLai < 0) {
//                 console.log(tienConLai);
//                 moneyXiu = tienConLai * (-1);
//                 moneyUsesr = money + soDu;
//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//                 db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//                     "moneyXiu": moneyXiu,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountXiu": totalAmountTai,
//                 });
//                 break;
//             }
//             if (tienConLai == 0) {
//                 console.log(tienConLai);
//                 moneyUsesr = money + soDu;
//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//                 db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//                     "moneyXiu": 0,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountXiu": totalAmountTai,
//                 });
//                 break;
//             }
//             if (tienConLai > 0) {
//                 console.log(tienConLai);
//                 moneyUsesr = money + getMoney;
//                 db.doc("betLists/" + timeStart + '/listXiu/' + id).update({
//                     "moneyXiu": 0,
//                 });
//                 db.doc("betLists/" + timeStart).update({
//                     "totalAmountXiu": (totalAmountXiu - getMoney),
//                 });
//                 db.doc("users/" + id).update({
//                     "money": moneyUsesr,
//                 });
//             }
//         }
//     }
// }
// canCua();