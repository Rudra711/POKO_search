import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { auth, db } from '../firebase/firebase'; // Ensure Firebase is set up
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

function Card({ id, name, image }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null); // Store authenticated user
  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch favorite status when user is logged in
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const favDoc = await getDoc(doc(db, `favorites/${user.uid}/pokemons`, id));
          setIsFavorite(favDoc.exists()); // If Pokémon exists in Firestore, mark as favorite
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [user, id]);

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("Please log in to add favorites!");
      return;
    }

    const favRef = doc(db, `favorites/${user.uid}/pokemons`, id);

    try {
      if (isFavorite) {
        await deleteDoc(favRef); // Remove from Firestore
        setIsFavorite(false);
      } else {
        await setDoc(favRef, { id, name, image }); // Save in Firestore
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="card w-80 glass cursor-pointer">
      <figure className="bg-gradient-to-r from-purple-500 to-purple-900">
        <img
          src={image}
          alt={`${name}`}
          onClick={() => navigate(`/detail/${id}`)}
          className="w-full"
        />
      </figure>
      <div className="card-body bg-yellow-100">
        <h2 className="card-title text-green-900">{name.toUpperCase()}</h2>
        <div className="card-actions flex justify-between items-center mt-4">
          <button className="btn btn-primary" onClick={() => navigate(`/detail/${id}`)}>
            Details
          </button>
          {/* Favorite Button */}
          <div className="ml-4 cursor-pointer text-2xl hover:animate-bounce" onClick={handleFavoriteClick}>
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
