import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Oauth from "../components/Oauth";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      await updateProfile(user, {
        displayName: name
      })
      
     const formDataCopy: any = {...formData};
     delete formDataCopy.password
     formDataCopy.timestamp = serverTimestamp();

     await setDoc(doc(db, "users", user.uid), formDataCopy)

     navigate("/home")
    } catch (error) {
        console.log(error)
      toast.error("Something went wrong with the registration ")
      
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          
        </div>
        <div className="mt-8 space-y-6">
          <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          <div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                required
                className="transition ease-in-out rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                placeholder="Enter name"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="transition ease-in-out rounded w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                required
                className="rounded transition ease-in-out w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer "
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <p>
                Have an account?
                <Link
                  to="/login"
                  className="font-medium text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  {" "}
                  Log in
                </Link>
              </p>

              <Link
                to="/forgot-password"
                className="font-medium text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full uppercase flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
              >
                Sign up
              </button>
            </div>

            <div className="flex items-center my-4  before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
            <p className="text-center font-semibold mx-4 ">OR</p>
          </div>

          <Oauth></Oauth>
          </form>    
        </div>
      </div>
    </div>
  );
};

export default SignUp;
