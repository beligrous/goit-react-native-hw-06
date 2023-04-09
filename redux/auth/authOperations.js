import { authActions } from "./authSlice";
import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignUp =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authActions.updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

const authSignOut = () => async (dispatch, getState) => {};

export const authStateChange = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authActions.updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
        })
      );
      dispatch(authActions.authStateChange(true));
    }
  });
};
