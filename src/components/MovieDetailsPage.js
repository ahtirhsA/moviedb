import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import './MovieDetailsPage.css'

const statusObj={
    success:'SUCCESS',
    progress:'INPROGRESS',
    failure:'failure'
}

const MovieDetailsPage=()=>{

    const basepath='https://image.tmdb.org/t/p/w500'
    const [details,setDetails]=useState({status:'INITIAL',obj:{}})
    const [cast, setCast]=useState({sta:'INITIAL',castDetails:[]})
    const {id}=useParams()


   
    useEffect(()=>{
        const api1=async ()=>{
            const response1=await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=5ad9d5f2845c8ede20e13348e5a441ba&language=en-US`)
            const jsondata1=await response1.json()
            const newLis=jsondata1.cast.slice(0,5).map((i)=>({pic:`${basepath}${i.profile_path}`,char:i.character}))
            if (response1.ok){
             setCast({sta:statusObj.success,castDetails:newLis})
            }
            
         }
         
         const api=async ()=>{
             const response=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5ad9d5f2845c8ede20e13348e5a441ba&language=en-US`)
             const jsondata=await response.json()
             
     
             if (response.ok){
                 const back_drop=`${basepath}${jsondata.backdrop_path}`
                 const poster_path=`${basepath}${jsondata.poster_path}`
                 const genre=jsondata.genres
                 const lis=[]
                 for (let i of genre){
                     lis.push(i.name)
                 }
                 const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                 const week=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                 const modDate=new Date(jsondata.release_date)
                 const new_date=`${week[modDate.getDay()]} ${months[modDate.getMonth()]} ${modDate.getDate()} ${modDate.getFullYear()}`
     
                 const retObj={
                     backpath:back_drop,poster:poster_path,title:jsondata.original_title,overview:jsondata.overview,
                     time:jsondata.runtime,date:new_date,rating:jsondata.vote_average,
                     gen:lis.join(",")
                 }
     
                 setDetails({status:statusObj.success,obj:retObj})
             }
         }
     
      api() 
      api1()
    },[id])

    const onSuccess1=()=>{

        const {castDetails}=cast 

        return (
             <ul className='ul1'>
                {
                    castDetails.map((i)=>{
                        return (
                            <li className='li1'>
                              <img src={i.pic} alt={i.char} className='pic'/>
                              <p className='gen'> Character{' '}:{' '}{i.char}</p>
                            </li>
                        )
                    })
                }
             </ul>
        )

    }

    const switchFunc1=()=>{

        const {sta}=cast

        switch(sta){

            case statusObj.success:
                return onSuccess1()
            default:
                return null 

        }
    }


    const onSuccess=()=>{
        const {obj}=details
        const {backpath,poster,title,rating,time,gen,date,overview}=obj

        return (
            <div>
            <div className='cmn'>
            <div className='main'>
            <div className='pos'>
              <img src={poster}  className='im1'alt={title}/> 
              <div>
                <h1 className='head'> {title} </h1>
                <p className='pa'> Rating {' '}:{''} {rating}</p>
                <div className='cmn mb-0'>
                    <button className='tym'> {time} min</button>
                    <p className='gen'> {gen}</p>
                </div>
             
                <p className='gen mt-0'> Release Date{' '}: {date}</p>
              </div>
            </div>
              <h1 className='head'> Overview </h1>
              <p className='gen'>{overview} </p>
            </div>
            <img src={backpath} alt={title} className='back'/> 
            </div> 
             <h1 className='head mt-1 mb-3'> Cast </h1>
           
                {switchFunc1()}
           
          </div> 
        )


    }

    const switchFunc=()=>{
       
        const {status}=details
        switch(status){
            case statusObj.success:
                return onSuccess()
            default:
                return null 
        }

    }

    return (
        <div className='con1 container-fluid'>
            <div className='row'>
              <div className='col-12'>
               {switchFunc()}
               </div> 
           </div> 
        </div>
    )

    
}

export default MovieDetailsPage