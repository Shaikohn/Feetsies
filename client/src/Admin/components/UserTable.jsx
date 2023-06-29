import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from 'react-dom'
import {Card,
        Paper,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        Stack,
        Typography,
        Avatar,
        Box,
        TableRow} from '@mui/material'
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {ContactMail,
        AccountBox,
        TaskAlt,
        LocalPolice,
        LocationOn,
        LocalPhone, 
      Mail,
       Close } from '@mui/icons-material/'
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateUserAdmin,
  updateUserBan,
} from "../../redux/actions/getAllUsers";

import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2'


export function UserCard({userDetail, setShow}) {
  const userSince = new Date(userDetail.createdAt)
  return (
    <Box sx={{ p: 2, display: 'flex', width:'fit-content', margin:'auto', alignItems:'center', height:'100%' }}>
        <Box sx={{margin: '1%'}}>
        <Avatar variant="rounded" src= {userDetail.image} sx={{margin: 'auto', width:'5em', height:'5em'}} />
        </Box>
        <Box sx={{margin: '1%', width:'20em', overflowWrap:'break-word', wordBreak:'break-word'}}>
        <Stack spacing={0.5}>
          <Typography fontWeight={700}>{userDetail.name} {userDetail.lastName}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', marginRight: '1%'}}>
            <LocationOn sx={{color: 'grey[500]', display:'inline-flex', marginRight: '1%'}} />
              <span style={{margin:'auto'}}>{userDetail.location}</span>
          </Typography>
            <Typography sx={{display:'flex', alignItems:'center'}}>
              <Mail sx={{color: 'grey[500]', display:'inline-flex', marginRight: '1%'}}/> <a href={`mailto:${userDetail.email}`} style={{margin:'auto'}}>{userDetail.email}</a>
            </Typography>
            { 
            userDetail.phone_number !== 'No phone number added' ? (
                <Typography sx={{display:'flex', alignItems:'center', marginRight: '1%'}}>
                  <LocalPhone sx={{color: 'grey[500]', display:'inline-flex', marginRight: '1%'}}/> <a href={`tel:${userDetail.phone_number}`} style={{margin:'auto'}}>{userDetail.phone_number}</a>
                </Typography>
              )  : null
            }
          <Typography sx={{display:'flex', alignItems: 'center'}}>
          <span style={{margin:'auto'}}> User since {userSince.getUTCFullYear()} </span>
          </Typography>  
        </Stack>
      
        </Box>
    </Box>
                
  )
}

const UserTable = () => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { allUsers } = useSelector((state) => state.users);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage?.getItem("profile"))
  );
  const [show, setShow] = React.useState(false)
  const [userDetail, setUserDetail] = React.useState({})
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [reducerValue, dispatch, userDetail]);
  

  function showUserContactInfo(user) {
    setShow(true)
    setUserDetail(user)
  }

  const handleAdmin = (e, id) => {
    e.preventDefault();
    dispatch(updateUserAdmin(id));
    forceUpdate();
    if(userId === id) {
      Swal.fire({
        title: 'User not updated', 
        text: 'You cant change your role!', 
        icon: 'error',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'User updated', 
        text: 'User role has been updated', 
        icon: 'success',
        timer: 3000
      });
    }
  };

  const handleBan = (e, id) => {
    e.preventDefault();
    dispatch(updateUserBan(id));
    forceUpdate();
    if(userId === id) {
      Swal.fire({
        title: 'User not updated', 
        text: 'You cant ban yourself!', 
        icon: 'error',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'User updated', 
        text: 'User status has been updated', 
        icon: 'success',
        timer: 3000
      });
    }
  };

  return (
    <TableContainer component={Paper} sx={{width: '100%'}}>
      <Table sx={{ width:'100%', zindex: '0' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Emails</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Ban</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((users) => (
            <TableRow
              key={users.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {users.name}
              </TableCell>
              <TableCell>{users.lastName}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.phone_number}</TableCell>
              <TableCell>
                {users.isAdmin ? (
                  <div>
                    <IconButton onClick={(e) => handleAdmin(e, users.id)}>
                      <LocalPolice />
                    </IconButton>
                  </div>
                ) : (
                  <div>
                    <IconButton onClick={(e) => handleAdmin(e, users.id)}>
                      <AccountBox />
                    </IconButton>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {users.isBan ? (
                  <IconButton onClick={(e) => handleBan(e, users.id)}>
                    <TaskAlt />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => handleBan(e, users.id)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell><IconButton onClick={() => showUserContactInfo(users)}><ContactMail/></IconButton></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        { show && ReactDOM.createPortal(
          <Card sx={{width: 'fit-content', height: 'fit-content', zIndex: '1', display: 'flex', alignItems: 'center', boxShadow: '-5px 10px 15px black', overflow: 'visible' }}>
                <Box sx={{zIndex: '2', position:'relative', margin:'auto'}}>
                  <Box sx={{position:'absolute', top: '-12%', left: '50%', backgroundColor:'white', borderRadius:'35%'}}> 
                    <IconButton onClick={() =>setShow(false)} >
                        <Close />
                    </IconButton>
                  </Box>
                  <UserCard userDetail={userDetail} setShow={setShow}/>
                </Box>
          </Card>,
                document.querySelector('#contact')
                )
              }
      </Table>
    </TableContainer>
  );
};

export default UserTable;
