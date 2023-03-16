const admin = require('firebase-admin')
const serviceAccount = require('./milkk-c3f45-firebase-adminsdk-c3att-0f386fc028.json');

export const verifyIdToken = (token) => {
    if (!admin.appa.lenght) {
        admin.initialzeApp({
            credential:admin.credential.cret(serviceAccount)
        })
    }
    return admin.auth().verifyIdToken(token).catch(err=> { throw err; })
}