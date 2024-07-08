import React,{useState} from 'react';
import Home from './components/Home'
import MovieDetailsPage from './components/MovieDetailsPage';
import NavContext from './Context/NavContext';
import {Routes,Route} from 'react-router-dom'
import NavComp from './components/NavComp';
import TopRated from './components/TopRated';
import Upcoming from './components/Upcoming';

const App = () => {

   const [search,setSearch]=useState('')

   const searchFunc=(val)=>{
      setSearch(val)
   }

return (
   <div>
   <NavContext.Provider value={{search,searchFunc}}>
   <NavComp/>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movie/:id' element={<MovieDetailsPage/>}/>
      <Route path='/top-rated' element={<TopRated/>}/>
      <Route path='/upcoming' element={<Upcoming/>}/>
   </Routes>
    
   </NavContext.Provider>
</div> 
)

}

export default App;
