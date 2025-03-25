import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/slices/SearchSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [input, setInput] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setIsAuthenticated(!!currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    function searchHandler(e) {
        e.preventDefault();
        if (input.trim() === '') {
            toast.error('⚠️ Please enter a search term!', { position: 'top-center', autoClose: 2000 });
            return;
        }
        dispatch(setSearchTerm(input.toLowerCase()));
        setInput('');
        navigate('/search');
    }

    function handleLogout() {
        signOut(auth)
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);
            })
            .catch((error) => console.error('Logout Error:', error));
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="border-gray-200 bg-orange-600 sticky top-0 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <span className="text-2xl font-semibold text-white">PokeNavigator</span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 justify-center hidden md:flex">
                    <form className="max-w-[480px] w-full" onSubmit={searchHandler}>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full border h-12 shadow p-4 rounded text-gray-900 placeholder-gray-700 bg-gray-50"
                                placeholder="Search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {/* User Authentication Section */}
                <div className="flex items-center space-x-4">
                    <ul className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/favorites" className="block py-2 px-3 text-white rounded hover:bg-gray-100">
                                        Favorites
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="block py-2 px-3 text-white rounded hover:bg-gray-100">
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/registration" className="block py-2 px-3 text-white rounded hover:bg-gray-100">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="block py-2 px-3 text-white rounded hover:bg-gray-100">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* User Profile Picture */}
                    {isAuthenticated && user && (
                        <div className="relative group">
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                                onClick={toggleMenu}
                            />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg">
                                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </nav>
    );
}

export default Navbar;
