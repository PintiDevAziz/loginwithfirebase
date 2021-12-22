import React, { useState, useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import router from "next/dist/client/router";
const singUp = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //liste fields
  const [user, userLoading, userError] = useAuthState(auth);

  const rotuer = useRouter();
  useEffect(() => {
    if (password.length < 6 || !email.includes("@")) {
      setError("field");
    } else {
      setError("");
    }
  }, [email, password]);
  const createUser = (e) => {
    e.preventDefault();
    if (!error) {
      createUserWithEmailAndPassword(auth, email, password);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border-[3px] rounded w-[30rem] h-[30rem] flex flex-col items-center p-6">
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
            onClick={createUser}
            disabled={error === "field" ? true : false}
            className={`border-2 ${
              error ? "cursor-not-allowed" : null
            } disabled:opacity-25 w-full h-12 rounded font-semibold text-lg  transition-all hover:border-gray-600`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default singUp;
