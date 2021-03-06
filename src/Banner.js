import React, { useState, useEffect } from 'react';
import axios from "./axios";
import requests from "./requests";
import './banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflix0riginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();

    }, []);
    console.log(movie);
   const truncate = (str, n) =>{
    //    check whether string exists with optional chaining
    // if it does check the length and if the length is greater than n 
    // add "..." otherwise keep the string as it is. 
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    
    return (
        

<header 
className='banner'
style={{
    backgroundSize: "cover",
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundPosition: "center center",
    
}}>
 
 <div className='banner__contents'>

    <h1 className='banner__title'>
{movie?.title || movie?.name || movie?.original_name}
    </h1>
    <div className='banner__buttons'>
    <button className='banner__button'>
        Play
    </button>
    <button className='banner__button'>
My List
    </button>
    <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
</div>


</div>
<div className='banner--fadeBottom'/>
        </header>
    )
}

export default Banner
