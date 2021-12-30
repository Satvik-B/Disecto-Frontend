import { Button, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { projectStorage, projectFireStore } from '../firebase/config';
import { ref, uploadBytesResumable } from 'firebase/storage';
import TextField from '@mui/material/TextField';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
// import { createBrowserHistory as history} from 'history';


const UploadCollection = () => {
  const [detail, setDetail] = useState([]);
  const [url, setURL] = useState([]);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const history = useNavigate();
  const changeHandler = (e) => {
    const selected = e.target.files;
    for(let i=0;i<selected.length;i++) {
      const time = Timestamp.now();
      setDetail(detail => [...detail, selected[i]]);
      setURL(url => [...url, (selected[i].name).slice(0, -4)+time+selected[i].name.slice(-4)]);
    }
  };

  const handleSubmit = async () => {
    if(detail) {
      for(let i=0;i<detail.length;i++){
        if(detail[i]) {
          const storageRef = ref(projectStorage, url[i]);
          const uploadTask = uploadBytesResumable(storageRef, detail[i]);
          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, (error) => {
            console.log(error);
          });
        }
      }
    }
    try{
      const docReference = await addDoc(collection(projectFireStore, 'collections'), {
        name:name, 
        description:description, 
        images:url,
      });
      console.log(docReference.id);
    }
    catch (e) {
      console.log('Error: '+e);
    }
    setTimeout(() => history('/'), 5000);
  };

  return (
    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', mt:'2%' }}>
      <Box sx={{ display:'flex', width:'80%', flexDirection:'column' }}>
        <Typography variant="h2" sx={{ m:'2%' }}>Upload New Collection</Typography>
        <Box sx={{ display:'flex', flexDirection:['column', 'row'], m:'2%' }}>
          <TextField
            required
            error={name===''}
            id="outlined-error"
            label="Enter Name"
            placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            onClick={(event) => {
              setName(event.target.value);
            }}
            helperText={name==='' && 'Name is not required'}
            sx={{ width:['100%', '30%'], m:'1%' }}
          />
          <TextField
            required
            error={description===''}
            id="outlined-error"
            label="Enter Description"
            placeholder="Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            onClick={(event) => {
              setDescription(event.target.value);
            }}
            helperText={description==='' && 'Description is required'}
            sx={{ width:'100%', m:'1%' }}
          />
        </Box>
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', my:'1%' }}>
          <Button variant="contained" component="label" sx={{ width:'20%', minWidth:'120px' }}>
            <input accept="image/*" type="file" multiple hidden onChange={changeHandler} />
            Add Image
          </Button>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center' }}>
          {detail && [...detail].map((image) => {
            console.log(image);
            return (
              <Box id={URL.createObjectURL(image)} sx={{ boxShadow:4, borderRadius:'10px', width:['80%', '25%'], height:'40vh', m:'2%' }} key={URL.createObjectURL(image)}>
                <img src={URL.createObjectURL(image)} key={URL.createObjectURL(image)} alt={image.name} height="85%" width="100%" style={{ borderRadius:'10px' }} />
                <Button variant="contained" onClick={() => {
                  const array = [...detail]; // make a separate copy of the array
                  const array1 = [...url]; // make a separate copy of the array
                  const index = array.indexOf(image);
                  if (index !== -1) {
                    array.splice(index, 1);
                    setDetail(array);
                    array1.splice(index, 1);
                    setURL(array1);
                  }
                }}
                sx={{
                  backgroundColor:'red',
                }}>
                  Delete
                </Button>
              </Box>
            );})}
        </Box>
        {name==null || name===''? 'Please Enter a Name':
          description==='' || description==null ? 'Please Enter a Description' : null
        }
        <Box sx={{ justifyContent:'center', alignItems:'center' }}>
          <Button component={Link} to="/" variant="contained" sx={{ width:'30%', minWidth:'120px', mb:'10%' }} disabled={name==='' || description==='' || name==null || description==null } onClick={() => {handleSubmit();}}> 
              Submit
          </Button>
        </Box>        
      </Box>
    </Box>
  );
};

export default UploadCollection;