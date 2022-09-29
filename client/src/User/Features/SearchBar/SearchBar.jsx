import {useState} from 'react';

function SearchBar() {
    const[name,setName] = useState("");

    

    return (
        <div className='container-searchBar'>
            <input
            placeholder='Search by name'
            autoComplete='off'
            value={name}
            // onChange={(e)=>eventHandlerInput(e)}
            ></input>
            <button
            // onClick={(e)=>searchProduct(e)}
            >Search</button>
        
        </div>
      );
}

export default SearchBar;