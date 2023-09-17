import React from 'react';
import { useState } from 'react';

function SearchBar() {
  return (
    <div className='searchContainer'>
                <div> <input type="search" name="search" id="" /></div>
            <div className="searchResult">Search Result</div>
    
    </div>
  )
}

export default SearchBar