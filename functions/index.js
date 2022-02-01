const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./sa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dollarstoremobile.firebaseio.com"
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const firestore = admin.firestore();
// admin.auth().generateEmailVerificationLink(){

// }

exports.scheduledFunction = functions.pubsub.schedule('0 9 * * *').onRun(async (context) => {
  const query = firestore.collection('publish').where(pubType === "Publier").where( '' , );

  let tasks = await query.get();

  const jobs = []

  tasks.forEach(snapshot => {
   const { worker, options} = snapshot.data();

   const job = workers[worker](options)

    .then(() => snapshot.ref.update({status: 'complete'}))
    .catch((err) => snapshot.ref.update({status: 'error'}))

    jobs.push(job)
  });

  return await Promise.all(jobs)
});
