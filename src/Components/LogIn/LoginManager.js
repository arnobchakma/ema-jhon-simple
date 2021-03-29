import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const isSignedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            return isSignedInUser;
        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
};

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then((res) => {
            const isSignOut = {
                isSignOut: false,
                name: "",
                password: "",
                email: "",
                success: false,
            };
            return isSignOut;
        });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUser = res.user;
            newUser.error = "";
            newUser.success = true;
            updateUserName(name)
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.success = false;
            return newUser;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
            const newUser = res.user;
            newUser.error = "";
            newUser.success = true;
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.success = false;
            return newUser;
        });
}

const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: "name",
    })
        .then(function () {
            console.log('user name updated successfully')
        })
        .catch(function (error) {
            console.log(error)
        });
};