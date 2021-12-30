import React from 'react';
import { Box, Typography } from '@mui/material';
import HomePageCard from '../components/HomePageCard';
import useFirestore from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomePage =  () => {
  const { docs } = useFirestore('collections');
  return (
    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', p:'2%', alignItems:'center' }}>
      <Typography variant="h2">Gallery</Typography>
      <Link to="/newCollection" underline="none" style={{ textDecoration:'none', mt:'2%' }}><Button variant="contained">Add Collection</Button></Link>
      <Box sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', width:'90%', justifyContent:'center' }}>
        {
          docs.map((ele) => {
            return (<HomePageCard document={ele} key={ele['id']} sx={{ width:'30%', m:'1%' }} />);
          })
        }
      </Box>
    </Box>
  );
};

export default HomePage;