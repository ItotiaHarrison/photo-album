import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [pageState, setPageState] = useState("Login")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setPageState(user ? "Profile" : "Login");
    })
}, [auth])


  function pathMatchRoute(route: string){
        return route === location.pathname;
};

const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/home" className="text-white font-bold text-xl">
              Photo Album
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/home"
                className={`text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium ${
                  pathMatchRoute("/home") && "text-black bg-blue-700"
                }`}
              >
                Home
              </Link>            

              <div
                className={`text-white hover:bg-blue-700 hover:cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                  (pathMatchRoute("/login") || pathMatchRoute("/profile")) &&
                  "text-black border-b-red-500"
                }`}
                onClick={() => navigate("/profile")}
              >
                {pageState}
              </div>
            </div>
          </div>


          <div className="sm:hidden">
            {/* Mobile menu button */}
            <button
            onClick={toggleMobileMenu}
              type="button"
              className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu button */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/home"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
         
          <Link
            to={pageState === "Profile" ? "/profile" : "/login"}
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMobileMenu}
          >
            {pageState}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
