// Sidebar.jsx

import React from 'react';
import SearchInput from "./SearchInput";
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className="">
      <SearchInput />
      <Conversations />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
