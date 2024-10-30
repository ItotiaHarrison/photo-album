import { Link } from "react-router-dom";
import Oauth from "../components/Oauth";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      console.log('Error resetting password :', error);
      
      toast.error("Could not reset password")
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <form className="mt-6 space-y-6" onSubmit={onSubmit}>
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

            <div className="flex items-center justify-between text-sm">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="font-medium text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  {" "}
                  Register
                </Link>
              </p>

              <p>
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Send reset password
            </button>

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

export default ForgotPassword;
