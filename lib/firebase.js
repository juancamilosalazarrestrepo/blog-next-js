import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"): undefined,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL:"https://blog-next-js-33548.firebaseio.com"
  });
}

export default admin.firestore();
