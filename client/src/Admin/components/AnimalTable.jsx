import Title from './Title';
import { Avatar, TableCell, TableBody, TableHead, TableRow, IconButton, Grid, Button, Table } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAnimals } from "../../redux/actions/getAnimalsA";
import { Link } from 'react-router-dom';


export function AnimalsTable() {
    let {allAnimals} = useSelector(state => state.animals)
    let dispatch = useDispatch()

    React.useEffect(() => {
        if(allAnimals.length === 0) {
            dispatch(getAllAnimals())
        }
        console.log(allAnimals)
    },[allAnimals])

    
    return (
        <React.Fragment>
            <Title>Animals</Title>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Sex</TableCell>
            <TableCell align="center">Breed</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align='center'>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allAnimals?.map((p) => (
            <TableRow key={p.id}>
              <TableCell align="center" sx={{ width:'100%', display: 'flex', justifyContent:"center"}}>
                <Avatar  src={p.main_image}/>
              </TableCell>            
                <TableCell align="center"><Link to={`/home/animals/${p.id}`}>{p.name}</Link></TableCell>
              <TableCell align="center">{p.sex}</TableCell>
              <TableCell align="center">{p.breed}</TableCell>
              <TableCell align="center">{p.size}</TableCell>
              <TableCell align="center">{p.age} yrs</TableCell>
              {/* <TableCell align='center'>{p.animal_types.map((type, i) => {
                return (
                    <p>{type.name}</p>
                )
              } )}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </React.Fragment>
    )
}