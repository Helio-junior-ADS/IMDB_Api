import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import MovieCard from '../components/MovieCard'

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const red = () => {
    return navigate('/')
  }
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json()

    setMovie(data);

  };

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: "currency",
      currency: "USD",
    });
  }

  useEffect(()=>{
    const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-br`
    getMovie(movieURL);
  },[])
  
  return (
    <div className='movie-page'>
      {movie && (
         <>
         <MovieCard movie={movie} showLink={false}/>
         <p className="tagline">{movie.tagline}</p>
         <div className="info">
            <h3>
              <BsWallet2/> Orçamento:              
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
         </div>
         <div className="info">
            <h3>
              <BsGraphUp/> Receita:              
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
         </div>
         <div className="info">
            <h3>
              <BsHourglassSplit/> Duração:              
            </h3>
            <p>{movie.runtime} Minutos</p>
         </div>
         <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill/> Descrição              
            </h3>
            <p className='descrition'>{movie.overview}</p>
            <button className='back' onClick={red}>Voltar</button>
         </div>         
       </>
      )}
    </div>
  )
}

export default Movie