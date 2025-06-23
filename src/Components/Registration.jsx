import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Registration() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optional: save fullName in Firestore here
      navigate('/'); // ✅ Redirect to home
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message); // Optional error alert
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 pt-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-800">
            <img className="w-8 h-8 mr-2" src="https://freesvgplanet.com/wp-content/uploads/2019/10/pokemon-svg-free-30195.jpg" alt="logo" />
            PokeNavigator
          </a>
          <div className="w-full bg-orange-600 rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Your Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="block w-full p-2.5 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full p-2.5 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full p-2.5 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full p-2.5 rounded-lg text-sm" />
                </div>
                <button type="submit" className="w-full bg-orange-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-orange-800">
                  Create an account
                </button>
                <p className="text-sm font-light text-white">
                  Already have an account?
                  <Link to="/login" className="ml-1 font-medium text-white underline hover:text-orange-300">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
