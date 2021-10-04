import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function register(name, email, password) {
  return new Promise((resolve, reject) => {
    console.log(email, password);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = {
          name: name,
          email: email
        };
        firestore()
          .collection('users')
          .doc(res.user.uid)
          .set(user)
          .then(function (querySnapshot) {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function login(email, password) {
  return new Promise((resolve, reject) => {

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        let user = {
          email: res.user.email,
          uid: res.user.uid
        }
        resolve(user)
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  register,
  login
}