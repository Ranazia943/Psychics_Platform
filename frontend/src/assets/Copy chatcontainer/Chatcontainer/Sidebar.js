import React from 'react'
import SearchInput from "./SearchInput"
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
const Sidebar = () => {
  return (
    
	<div className="col-12 col-lg-5 col-xl-3 border-right">
	<SearchInput />
			<Conversations />
			<LogoutButton />
		</div> 
   
  )
}

export default Sidebar
