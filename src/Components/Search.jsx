import React from 'react'
import { useSelector } from 'react-redux';
import Content from './Content';
function Search() {
    const para  = useSelector((state) => state.search.searchTerm); // Ensure this is correct
    console.log(para);

  return (
    <div>
        <Content 
        para = {para}
        />
    </div>
  )
}

export default Search