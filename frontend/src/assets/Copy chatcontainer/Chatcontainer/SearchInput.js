import React, {useState}from 'react'
import useGetConversations from "../../hooks/useGetConversations"
import useConversation from "../../zustand/useConversation"
import {toast} from "react-toastify";
import { IoSearchSharp } from "react-icons/io5";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

  return (
    
<form onSubmit={handleSubmit}>
<div className="px-4 d-none d-md-block">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <input type="text" className="form-control my-3" placeholder="Search..."
                value={search}
				onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
            </div>
            
          </div>
          
              </form>
    
  )
}

export default SearchInput
