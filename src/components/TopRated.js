import React,{useEffect, useState,useContext} from 'react'
import './TopRated.css'
import MoviesPage from './MoviesPage'
import NavContext from '../Context/NavContext'

const statusObj={
    success:'SUCCESS',
    progress:'INPROGRESS',
    failure:'failure'
}

const TopRated=()=>{

      const basepath='https://image.tmdb.org/t/p/w500'
      const [disp,setdisp]=useState({status:'INITIAL',movies:[]})

      const {search}=useContext(NavContext)

      console.log(search)

      const apiRes=async ()=>{
          
        const response=await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=5ad9d5f2845c8ede20e13348e5a441ba&language=en-US&page=1');
        const jsondata=await response.json()
        console.log(jsondata)

        const modData=jsondata.results
        const res=modData.map((i)=>{
            return {...i, backdrop_path:`${basepath}${i.backdrop_path}`,
            poster_path:`${basepath}${i.poster_path}`
            }
        })
        if (response.ok){
            setdisp({status:statusObj.success,movies:res})
        }
      }

      useEffect(()=>{
        apiRes()
      },[])

      useEffect(()=>{

       if (search.trim() === ''){
        apiRes()
       }
       else {
        const searchResults=async()=>{
          const resp=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5ad9d5f2845c8ede20e13348e5a441ba&language=en-US&query=${search}&page=1`)
          const  data=await resp.json()
          const upd_data=data.results.map((i)=>({...i,poster_path:`${basepath}${i.poster_path}`}))
          if (resp.ok){
            setdisp({status:statusObj.success,movies:upd_data})
          }
        }
  
        searchResults()
      }
      },[search])


    
       const onSuccess=()=>{

         const {movies}=disp

         return (
            <div className="ul row">
              {movies.map((i) => (
                <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 mb-4" >
                  <MoviesPage movie={i} key={i.title}/>
                </div>
               ))}
      </div>
         )
       }


       const switchFunc=()=>{
           const {status}=disp
            switch(status){
                case statusObj.success:
                    return onSuccess()
                default:
                    return null 
            }
       }

       return(
        <div className='container-fluid con'>
          {switchFunc()}
        </div>
       )
     
}

export default TopRated