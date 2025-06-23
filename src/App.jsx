import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase/firebase"; // Firebase authentication
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import Detail from "./Components/Detail";
import Search from "./Components/Search";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Favorites from './Components/Favorites';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="bg-blue-200">
        <Navbar />  {/* ✅ Now correctly placed outside of <Routes> */}
        <Routes>
          {user ? (
            <>
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/" element={<Cards />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Navigate to="/" replace />} /> {/* Redirect logged-in users */}
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} /> 
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
        <ToastContainer />
      </div>
    </Router>

  );
}

export default App;
