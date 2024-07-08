import React from 'react'
import './MoviesPage.css'
import {Link} from 'react-router-dom'

const MoviesPage=(props)=>{

    const {movie}=props
    const {poster_path,title,vote_average,id}=movie 

    return (
        <Link className='lin' to={`/movie/${id}`}>
        <li className='li'>
           <img src={poster_path} className='img' alt={title}/>
           <h1 className='heading'> {title} </h1>
           <p className='para'> Rating{' '}:{' '} {vote_average} </p>
        </li>
        </Link> 
    )

}

export default MoviesPage