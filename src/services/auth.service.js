import { auth } from './firebase';

class service {

    onAuthStateChanged(callback) {
        if (!auth) {
            return;
        }
        auth.onAuthStateChanged(callback);
    }

    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email.trim(), password)
                .then(resp => {
                    resp.user.getIdToken(true).then(token => {
                        resolve(token);
                    })
                })
                .catch(error => {
                    reject(error);
                })
            Promise.resolve();
        });
    }

    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email.trim(), password)
                .then(resp => {
                    resp.user.getIdToken(true).then(token => {
                        resolve(token);
                    })
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        });
    }

    signOut() {
        if (!auth) {
            return;
        }
        auth.signOut();
    }
}

const authService = new service();

export default authService;
