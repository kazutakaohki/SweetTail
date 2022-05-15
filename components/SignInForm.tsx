import { FC } from "react";
import {
  getAuth,
  // EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "../firebase/firebase_init"; // Initialize FirebaseApp

const uiConfig: auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    // EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/register",
};

export const SignInForm: FC = () => {
  return <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={uiConfig} />;
};
