import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyBlXie1k01FdLtc3092-yhLhxa1uR4CyVk",
  authDomain: "shopping-mall-342ab.firebaseapp.com",
  databaseURL: "https://shopping-mall-342ab.firebaseio.com",
  projectId: "shopping-mall-342ab",
  storageBucket: "shopping-mall-342ab.appspot.com",
  messagingSenderId: "4489709454",
  appId: "1:4489709454:web:4a6e0c0ab963e2760046df",
  measurementId: "G-03050294LN"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
};

export const addCollectionandDocument = async( collectionKey, objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    
    return {
      routeName : encodeURI(title.toLowerCase()),
      id : doc.id,
      title,
      items,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};


firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 