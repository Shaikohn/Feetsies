import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Clear, ClearAll} from '@mui/icons-material';
import Title from './Title';
import { Card, Box,  Stack, IconButton} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { getAllInquieres, delateOneInquery,cleanAllInqueries } from '../../redux/actions/inquiryActions';



function preventDefault(event) {
  event.preventDefault();
}





export default function ShowInqueries() {
  let {inqueries} = useSelector(state => state.inqueries)
  let dispatch = useDispatch()
  let loading = 'Any inquery yet'
  
  React.useEffect(() => {
    if(inqueries.length === 0) {
      dispatch(getAllInquieres()) 
    }
  }, [inqueries])


  function deleteInquery(id) {
    dispatch(delateOneInquery(id))
    setTimeout(() => {
      dispatch(getAllInquieres())
    }, 500)
  }
  function cleanAll() {
    dispatch(cleanAllInqueries())
  }


  function InqueryCard({topic, id}) {
    return (
      <Card sx={{height:'fit-content', overflowWrap:'anywhere', marginTop:'1%'}}>
        <Box sx={{height:'fit-content', margin:'auto'}}>
          <Stack direction='row' sx={{height:'2em', margin:'auto'}}>
            <Typography sx={{fontSize:'1em', alignContent:'center', justifyContent:'center', display:'flex', marginLeft:'auto', marginRight:'auto'}}>{topic}</Typography>
            <IconButton onClick={() => deleteInquery(id)} sx={{height: 'fit-content', alignContent:'center'}}>
              <Clear sx={{fontSize:'.6em'}}/>
            </IconButton>
          </Stack>
        </Box>
      </Card>
    )
  }
  return (
    <React.Fragment>
      <Title>Inqueries</Title>
      {
        inqueries.length === 0 ? (
          <h1>{loading}</h1>
        ): (
          
            inqueries.map(s => {
              
              return (
               
                  <InqueryCard key={s.id} topic={s.topic} id={s.id} />
                
              )
            })
          
        )
      } 
      <div style={{position: 'sticky', bottom:'0%'}}>
        <IconButton size="small" variant='contained' onClick={() => cleanAll()} ><ClearAll /></IconButton>
        
      </div>
    </React.Fragment>
  );
}