import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import getOrderDetail from '../../../redux/actions/orderDetail';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Card, Typography } from '@mui/material';
import HeaderMUI from '../Header/HeaderMUI'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
   
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function OrderDetail() {

  const {id} = useParams()
  const dispatch = useDispatch();
  const {elements} = useSelector((state)=> state.orderDetail.orderDetail);
  useEffect(() => {
    dispatch(getOrderDetail(id))
  }, [dispatch])
    
  return ( 
    <div>
    <HeaderMUI />
    <Card sx={{height:'fit-content', marginLeft: '20%', marginTop:'1%', maxWidth: 800}}>
      <TableContainer component={Paper} sx={{ mt: 2,}}>
        <Table sx={{ maxWidth: 800, bgcolor: "#87a827", color: "#3a0ca3" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="rigth">Unit Price($)</StyledTableCell>
              <StyledTableCell align="rigth">Subtotal($)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elements? elements.map ((e,id)=>{
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell align="left">{e.productName}</StyledTableCell>
                  <StyledTableCell align="center">{e.quantity}</StyledTableCell>
                  <StyledTableCell align="rigth">{e.subtotal / e.quantity}</StyledTableCell>
                  <StyledTableCell align="rigth">{e.subtotal}</StyledTableCell>
                </StyledTableRow>
              )}
            ) : (
              <Typography>
                Wait a few moment
              </Typography>
            )}
          </TableBody>
        </Table>
        <Stack direction="row" spacing={2} >
          <Link to= "/profile" >
            <Button 
              sx={{ 
                m: 1, 
                width: '20ch', 
                color: '#022335', 
                bgcolor:'#dee2e6', 
                borderColor:'#022335',  
                borderRadius: "5px"
              }}   
              variant="outlined" 
              startIcon={<KeyboardReturnIcon fontSize = "large"/>}
            >
              GO BACK
            </Button>
          </Link>
        </Stack>
      </TableContainer>
    </Card>
    </div>
  );
}

