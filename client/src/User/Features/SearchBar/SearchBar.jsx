import {useState} from 'react';

function SearchBar() {
    const[name,setName] = useState("");

    // const eventHandlerInput = (e)=>{
    //     setName(e.target.value)
    // }

    // const searchProduct = (e)=>{
    //     e.preventDefault();
    //     dispatch(getProductByName(e.target.value))
    // }

    return (
        <div className='container-searchBar'>
            <input
            placeholder='Busqueda por nombre'
            autoComplete='off'
            value={name}
            onChange={(e)=>eventHandlerInput(e)}
            ></input>
            <button
            onClick={(e)=>searchProduct(e)}
            >Buscar</button>
        
        </div>
      );
}

export default SearchBar;