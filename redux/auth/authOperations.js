import { authActions } from "./authSlice";
import {
  getAuth,
  updateProfile,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch(authActions.updateUserProfileInProgress());
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(authActions.updateUserProfileError(error.message));
    }
  };

export const authSignUp =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      dispatch(authActions.updateUserProfileInProgress());
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authActions.updateUserProfileSuccess({
          userId: uid,
          nickName: displayName,
        })
      );
    } catch (error) {
      dispatch(authActions.updateUserProfileError(error.message));
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    dispatch(authActions.authSignOutInProgress());
    const auth = getAuth();
    await signOut(auth);
    dispatch(authActions.authSignOutSuccess());
  } catch (error) {
    dispatch(authActions.authSignOutError(error.message));
  }
};

export const authStateChange = () => async (dispatch, getState) => {
  try {
    dispatch(authActions.authStateChangeInProgress());
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.updateUserProfileSuccess({
            userId: user.uid,
            nickName: user.displayName,
          })
        );
        dispatch(authActions.authStateChangeSuccess(true));
        return;
      }
      dispatch(authActions.authStateChangeSuccess(false));
    });
  } catch (error) {
    dispatch(authActions.authStateChangeError(error.message));
  }
};
