import { sendEmailVerification, signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "../firebase/firebase";

const Index = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  console.log(user);
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full ">
      <div className="flex items-center gap-x-4  ">
        <img
          src={
            user?.photoURL ||
            "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"
          }
          alt=""
          className="rounded-full border-2 w-12 h-12"
        />
        {user?.email}
        <button
          className="border-2 rounded px-8 py-2"
          onClick={() => {
            signOut(auth);
          }}
        >
          LogOut
        </button>
        <Link href={"/login"}>
          <a> Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
