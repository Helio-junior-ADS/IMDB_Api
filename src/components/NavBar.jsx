import { useState,useEffect } from "react";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import {BiCaretRightSquare,BiSearchAlt} from 'react-icons/bi';



import "./Navbar.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const NavBar = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [search, setSearch] = useState("");
  const [inf, setInf] = useState([]);
  const [filter, setFilter] = useState([]);


  const navigate = useNavigate();


 const handleComplete = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  setInf(data.results)
 } 
  
  useEffect(()=> {
    const URL = `${searchURL}?${apiKey}&query=${query}`
    handleComplete(URL)
  },[query])




  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!search) return

    navigate(`/search?q=${search}`);
    setSearch("");
  };


  // funcao de auto complete
  const handlevalue = (e) => {
    setSearch(e.target.value);
    const newFilter = inf.filter((value)=>{
      return value.title.includes(search);
    })

    setFilter(newFilter);
  }

  console.log(filter)




  return (
    <nav id="navbar">
      <h2>
        <Link to="/"><BiCaretRightSquare/>IMDB Api</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Pesquise um filme" onChange={handlevalue}
        value={search} 
        />                                 
        <button type="submit">
            <BiSearchAlt/>
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
