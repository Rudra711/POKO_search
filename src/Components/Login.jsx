import React from 'react';
import { Link } from 'react-router-dom';
import { signInWithGitHub } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGitHub();
      navigate("/");  // Redirect to home after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-800">
            <img className="w-8 h-8 mr-2" src="https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195.jpg" alt="logo" />
            PokeNavigator
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <button 
                onClick={handleLogin} 
                className="w-full flex justify-center items-center gap-2 text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-5 h-5" alt="GitHub Logo" />
                Sign in with GitHub
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to="/registration" className="font-medium text-orange-600 hover:underline dark:text-orange-500">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
