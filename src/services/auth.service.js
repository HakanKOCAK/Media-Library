import { auth } from './firebase';

class service {
    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
                .then(resp => {
                    resp.user.getIdToken(true).then(token => {
                        this.setSession(token);
                        resolve({ "token": token })
                    })
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        });
    }

    setSession = (token) => {
        if (token !== null) {
            console.log(token)
            localStorage.setItem('medialibrary.user.token', token);
            localStorage.setItem('medialibrary.user.token.expiresAt', Date.now() + 3600000);
        } else {
            localStorage.removeItem('medialibrary.user.token');
            localStorage.removeItem('medialibrary.user.token.expiresAt');
        }
    };
}

const authService = new service();

export default authService;
