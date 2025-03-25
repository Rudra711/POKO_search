import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Card from './Card';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const favRef = collection(db, `favorites/${user.uid}/pokemons`);
        const favSnap = await getDocs(favRef);
        const favList = favSnap.docs.map(doc => doc.data());
        setFavorites(favList);
      };
      fetchFavorites();
    }
  }, [user]);

  if (!user) return <h2 className="text-center text-2xl text-red-500 mt-5">Please log in to view favorites</h2>;

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-3xl font-bold text-center">Your Favorites</h2>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {favorites.length > 0 ? (
          favorites.map(pokemon => <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} />)
        ) : (
          <p className="text-xl text-center text-gray-500">No favorites yet!</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
