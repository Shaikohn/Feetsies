import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Badge } from '@mui/material';
import Title from './Title';
import {Report, Drafts, Mail, DeleteForever} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPetitions, readAdoption, deletePetition } from '../../redux/actions/adoptionAction';
import {Link} from 'react-router-dom'


function getDate(date) {
  let simplyDate  = ''
  let now = new Date(Date.now())
  let completeDate = new Date(date)
  let day = completeDate.getDay()
  let month = completeDate.getMonth()
  let year =  completeDate.getFullYear()
  let hour = completeDate.getHours()
  let minutes = completeDate.getMinutes()
  if((now.getMinutes() - minutes) < 60 && now.getHours() - hour < 1 ) {
    let minutesAgo = now.getMinutes() - minutes
    simplyDate  = `${minutesAgo} mins ago `
   
  } else if((now.getMinutes() - minutes +60) > 60 && now.getHours() - hour >= 1 && now.getHours() - hour < 24  && now.getDay() - day < 1) {
    let hoursAgo = now.getHours() - hour
    simplyDate = `${hoursAgo} hrs ago`
  } else if ((now.getMinutes() - minutes +60) > 60 && now.getHours() - hour > 24  && now.getDay() - day < 30) {
    let daysAgo = now.getDay() - day 
    simplyDate = `${daysAgo} dys ago`
  } else {
    simplyDate = `${day}/${month}/${year}`
  }
  return simplyDate

}

function preventDefault(event) {
  event.preventDefault();
}

export default function AdoptionPetitions() {
  let {petitions} = useSelector(state => state.petitions)
  let dispatch = useDispatch()

  React.useEffect(() => {
    if(petitions.length === 0) {
      dispatch(getAllPetitions())
    }
    else{
      setInterval(() => {
        dispatch(getAllPetitions())
      }, 150000)
    }    
  },[petitions])

    
  function readAdoptionfn(id) {
    dispatch(readAdoption(id))
    setTimeout(() => {
      dispatch(getAllPetitions())
    }, 500)
  }

  function deletePetitionfn(id) {
    dispatch(deletePetition(id))
    setTimeout(() => {
      dispatch(getAllPetitions())
    },500)
  }
  return (
    <React.Fragment>
      <Title>Requested adoptions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Solicitation date</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Animal</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Importance</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {petitions.map((p) => (
            <TableRow key={p.id}>
                <TableCell align="center">{getDate(p.createdAt)}</TableCell>
              <TableCell align="center">{p.user.name} {p.user.lastName}</TableCell>
              <TableCell align="center"><Link to={`/home/animals/${p.animal.id}`}>{p.animal.name}</Link></TableCell>
              <TableCell align="center">{p.user.location}</TableCell>
              <TableCell align="center">
                {
                  (p.isImportant === false)  ? (
                    <div></div>
                  ): (
                    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', width:'100%'}}><Report sx={{color:'orange'}}/></div>
                  )
                }
              </TableCell>
              <TableCell align="center">
                {
                  p.read === true ? (
                    <Link to={`/adoptionPetition/${p.id}`}>
                    <IconButton onClick={() => readAdoptionfn(p.id)} sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}><Drafts /></IconButton>
                  </Link>
                  ): (
                    <Link to={`/adoptionPetition/${p.id}`}>
                      <IconButton onClick={() => readAdoptionfn(p.id)} sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                        <Badge variant='dot' color="error">
                          <Mail color="action" />
                        </Badge>
                      </IconButton>
                    </Link>
                  )
                }
              </TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => deletePetitionfn(p.id)} size='small'>
                  <DeleteForever fontSize='small' color='error'/>
                </IconButton>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}