import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
const Index = () => {
  //Router
  const router = useRouter();
  // ! Google provider

  const googleProvider = new GoogleAuthProvider();
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //liste fields

  useEffect(() => {
    if (password.length < 6 || !email.includes("@")) {
      setError("field");
    } else {
      setError("");
    }
  }, [email, password]);

  //! userData
  const [user, laoding, userError] = useAuthState(auth);

  //normal login

  const normalLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((er) => {
      setError(er.code.replace("auth/", ""));
    });
    console.log(user && user);
  };

  //google Account login

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };
  // !push home page

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      return null;
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border-[3px] rounded w-[30rem] h-[40rem] flex flex-col items-center p-6">
        <h1 className="mx-auto mb-10 font-semibold italic tracking-wider text-3xl">
          Login
        </h1>
        <form className="flex flex-col w-full items-center gap-y-8">
          <label className="flex group items-start justify-between w-full relative">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              required
              placeholder="Enter Your Email"
              className={`border-2 rounded px-4 transition-all focus:border-sky-400 outline-none w-full h-14 ${
                error === "field"
                  ? "focus:border-red-500"
                  : "focus:border-sky-400"
              }`}
            />
            <HiOutlineMail className="absolute right-4 top-1/2  transition-all -translate-y-1/2 text-2xl text-gray-500 group-focus-within:text-black" />
          </label>
          <label className="flex group items-start justify-between w-full relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter Your Password"
              className={`border-2 rounded px-4 transition-all focus:border-sky-400 outline-none w-full h-14 ${
                error === "field"
                  ? "focus:border-red-500"
                  : "focus:border-sky-400"
              }`}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 cursor-pointer  transition-all -translate-y-1/2 text-2xl text-gray-500 group-focus-within:text-black"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </label>
          <div
            className={`${
              error ? "block" : "hidden"
            } text-red-500 border-b-2 text-xl border-red-300`}
          >
            {error === "field" ? "Please complate all fields " : error && error}
          </div>
          <button
            onClick={normalLogin}
            disabled={error === "field" ? true : false}
            className={`border-2 ${
              error ? "cursor-not-allowed" : null
            } disabled:opacity-25 w-full h-12 rounded font-semibold text-lg  transition-all hover:border-gray-600`}
          >
            Login
          </button>
        </form>
        <div className=" bg-gray-300 w-full h-[3px] rounded my-4 mt-6"></div>
        <h1 className="mx-auto mb-6 font-semibold italic tracking-wider text-xl">
          Other Providers
        </h1>
        <button
          onClick={loginWithGoogle}
          className="w-full h-12 border-2 px-6 flex items-center justify-center gap-x-4 hover:border-sky-400 transition-all  hover:shadow-md rounded "
        >
          <FcGoogle className="text-3xl" />
          <p>Login With Google Account</p>
        </button>
      </div>
    </div>
  );
};

export default Index;
