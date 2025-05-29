import React, { useState, useEffect, useContext } from "react";

// Import de l'API
const url = 'https://api.themoviedb.org/3/search/movie?query=';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmQxOGM1ZTZjYTg3NzY3ZmUxZjg4NjY1ZTgxOTFjZCIsIm5iZiI6MTc0ODUyOTMyNS4wMjIsInN1YiI6IjY4Mzg3MGFkYjQ1N2NmNWRkMTA1Njc1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Kd-gyoHiVb6nkZ-VTslfFWyUI6YdheY81Ycq5opYcY'
  }
};
//Fin de l'import de l'API

// Fonction qui permet grâce à la recherche de remplir les listes des constantes suivantes
export function Recherche() {  // Contient la barre de rechecher et la recherche effectuée
    const [searchTerm, setSearchTerm] = useState("");  // Initialise la barre de recherche à vide avec "", la recherche se rempli dans la constante searchTerm, setSearchTerm fonction qui rempli SearchTerm
  const [ListMovies, setListMovies] = useState([]);  // Initialise la liste des films à vide avec [], la liste se rempli dans la constante ListMovies, setListMovies fonction qui rempli ListMovies
  const [error, setError] = useState(null);  // Initialise les erreurs si elle existe (Affichage des erreurs)

// Fonction qui vérifie les modifications apportées lors de l'utilisation de la page web (ex : utilisation de la barre de recherche mise à jour automatique)
  useEffect(() => {
    if (searchTerm) {
      // Lancer la recherche uniquement si un terme de recherche est présent
      fetch(url + searchTerm , options) 
        .then(res => res.json())
        .then(json => {
          if (json.results && Array.isArray(json.results)) {
            setListMovies(json.results);  // Mettre à jour la liste des films avec les résultats
          } else {
            setListMovies([]);  // Si aucun film n'est trouvé
          }
        })
        .catch(err => {
          setError("An error occurred while fetching movies.");
          console.error(err);
        });
    } else {
      setListMovies([]);  // Si le champ est vide, on réinitialise la liste des films
    }
  }, [searchTerm]);  // La recherche se fait à chaque changement du terme dans la barre de recherche


  return (
    <div>
      <ChercherFilm onSearch={setSearchTerm} text="film" />  {/* Utiliser le composant de recherche | Recherche le film dans la base de données par le biais de la barre de recherche*/} 
      <div>
        {error && <p>{error}</p>} {/* Afficher un message d'erreur si nécessaire */}
        {ListMovies.length > 0 ? (
          ListMovies.map((film, index) => (
            <FilmTag key={index} film={film} />
          ))
        ) : (
          <p>Aucun film trouvé</p>
        )}
      </div>
    </div>
  );


}

export function FilmTag({ film }) {
  return (
      <div className="FilmTag">
        <img
          src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
          alt={film?.original_title}
        />
        <h3>{film?.original_title}</h3>
      </div>
  );
}

export function ChercherFilm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="barre_recherche">
      <input
        type="text"
        placeholder="Rechercher un film"
        value={searchTerm}
        onChange={handleSearch}
        className="input-recherche"
      />
    </div>
  );
}
