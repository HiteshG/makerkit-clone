import * as admin from "firebase-admin";
const ServiceAccount = require("../../saas-2dca9-firebase-adminsdk-dj96w-1ffb1e564d.json");

process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
  });
}

export default admin;
