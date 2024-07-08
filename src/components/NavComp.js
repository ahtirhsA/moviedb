import React,{useState} from 'react'
import './NavComp.css'
import NavContext from '../Context/NavContext'
import {Link} from 'react-router-dom'

const NavComp=()=>{

    const [inp,setInp]=useState('')

    const inpFunc=(event)=>{
       setInp(event.target.value)
    }

return (
<NavContext.Consumer>
   { (value)=>{
 
   const {searchFunc}=value 


   const setValue=()=>{
      searchFunc(inp)
   }
   
   return (
    <nav className='nav'>
         <h1 className='title'> MovieDb</h1>
         <div className='ul-search'>
         <ul className='ul3'>
            <Link className='Link' to='/'>
            <li className='li2'> Popular </li>
            </Link> 
            <Link className='Link' to='/top-rated'> 
            <li className='li2'> Top Rated </li>
            </Link> 
            <Link className='Link' to='/upcoming'>
            <li className='li2'> Upcoming </li>
            </Link> 
         </ul>
         <input type='text' placeholder='Movie Name' className='inp' onChange={inpFunc} value={inp}/> 
         <button className='butt' onClick={setValue}> Search </button>
         </div> 
    </nav>
   )
   }
}
    </NavContext.Consumer>
)
}

export default NavComp 