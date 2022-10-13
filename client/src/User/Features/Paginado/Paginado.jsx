import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setPage } from "../../../redux/actions/paginadoA";
import { Pagination } from "@mui/material";


export default function Paginado({ items, itemsPerPage }) {

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
    <Pagination 
      count={arrayNumber.length} 
      variant="outlined" 
      color="primary" 
      onChange={(e, newPage) => dispatch(setPage(newPage))}
      page={page}
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 0.25,
        p: 0.25,
        "& .MuiPagination-ul": {
          gap: 3
        },
        "& .MuiPaginationItem-root": {
          bgcolor: "#fedf6a",
          border: "2px solid #87a827"
        }
      }}
    />
  );
};
