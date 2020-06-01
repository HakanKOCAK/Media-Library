import auth from './firebase';

class Service {
  onAuthStateChanged(callback) {
    if (!auth) {
      return;
    }
    auth.onAuthStateChanged(callback);
  }

  createUserWithEmailAndPassword(displayName, email, password) {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email.trim(), password)
        .then((resp) => {
          resp.user.updateProfile({
            displayName,
          }).then(resolve(resp.user));
        })
        .catch(error => {
          reject(error);
        })
      return Promise.resolve();
    });
  }

  signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email.trim(), password)
        .then(resp => {
          resolve(resp.user);
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    });
  }

  updatePassword(password) {
    return new Promise((resolve, reject) => {
      auth.currentUser.updatePassword(password)
        .then(() => {
          resolve({ success: true });
        }).catch((error) => {
          reject(error);
        })
    })
  }

  signOut() {
    if (!auth) {
      return;
    }
    auth.signOut();
  }
}

const authService = new Service();

export default authService;
