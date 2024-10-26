import { FcGoogle } from "react-icons/fc";

const Oauth = () => {
  async function onGoogleClick() {
   
  }

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
};

export default Oauth;
