const functions = require('firebase-functions');
const { getMaxListeners } = require('process');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
})
exports.welcomeMail = functions.firestore.document("bienvenida/{id}").onCreate((snap, context)=> {
    const email =snap.data().email;
    const name= snap.data().name;
    return sendWelcomeMail(email,name)
});

function sendWelcomeMail(){
    return transport.sendMail({
        from: "Angel <contacto@test.com>",
        to:email,
        subject: "Subject",
        html: `
            <h1>Hola ${name}</h1>
        `
    
    })
    .then(r=>r)
    .catch(e=>e);
}
