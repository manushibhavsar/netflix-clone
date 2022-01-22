import React, { useState,useEffect } from 'react'
import axios from "./axios";
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        //whenevr you are using useEffect and any variable that is pulled outside of the block you need to pass in epmpty braces so that useeffect update itself whenever there's a change in that variable 
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars : {
             // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        },
    }
    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));

            }).catch(error => console.log(error))
        }
    }
    return (
        <div className='row'>
                <h1 className='row__title'>{title}</h1>
            <div className='row_posters'>
            {/* for going through the array of movies and displaying the psoter of each movie we map through them */}
            {movies.map(movie => (
                
                <img
                // when anything in the movie list changes it won't re-render the entire row but it will re-render thatspecific movie poster
                key={movie.id} 
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                onClick={() => handleClick(movie)}
                // if the component is using isLargeRow only then display the the poster other then that display thumbnails
                src={`${base_url}${ isLargeRow ? movie.poster_path :  movie.backdrop_path}`} 
                alt={movie.name}/>
                
            )) }

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
