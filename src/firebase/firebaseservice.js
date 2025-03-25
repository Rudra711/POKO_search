import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Function to add Pokémon data to Firestore
export const addPokemon = async (pokemon) => {
  try {
    const docRef = await addDoc(collection(db, "pokemons"), pokemon);
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

// Function to fetch Pokémon data from Firestore
export const fetchPokemons = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pokemons"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};
