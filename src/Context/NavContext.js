import React from 'react'

const NavContext=React.createContext(
    {
      search:'',
      searchFunc:()=>{}
    }
)

export default NavContext