import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setPage } from "../../../redux/actions/paginadoA";

import './Paginado.css'

function Paginado({ items, itemsPerPage }) {
  const dispatch = useDispatch();
  const {page} = useSelector(state=> state.currentPage)
  
  const arrayNumber = [];
  
  for (let i = 0; i < Math.ceil(items / itemsPerPage); i++) {
    arrayNumber.push(i+1);
  }
  
  const previousPage = (e)=>{
    e.preventDefault();
    if(page!==1){
      dispatch(setPage(page - 1))
    }
  }
  
  const nextPage = (e)=>{
    e.preventDefault();
    if(page < arrayNumber.length){
      dispatch(setPage(page +  1))
    }
  }

  return (
    <div className="pagcontainer">
      <ul >
        <button onClick={(e)=> previousPage(e)} >
          Prev
        </button>
        {arrayNumber.map((n) => {
          return (
            <button key={n}
            className={n===page?"actualPage pagcontainer":"none"} 
            onClick={() => 
             { 
            dispatch(setPage(n))}}>
              {n}
            </button>
          );
        })}
        <button onClick={(e)=> nextPage(e)}>
          Next
        </button>
      </ul>
    </div>
  );
}

export default Paginado;