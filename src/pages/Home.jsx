import {useState, useEffect} from 'react'
import MovieCard from '../components/MovieCard';

import './MoviesGrid.css'


const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMoveis, setTopMoveis] = useState([]);

  const getTopRatedMovies = async (url) => {

    const res = await fetch(url);
    const data = await res.json()

    setTopMoveis(data.results);
  };

  useEffect(()=>{
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    
    getTopRatedMovies(topRatedUrl)   
  },[])
  

  return (
    <div className='container'>  
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMoveis.length === 0 && <p>Carregando....</p>}
        {topMoveis.length > 0 && topMoveis.map((movie,index) => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </div>
  )
}

export default Home