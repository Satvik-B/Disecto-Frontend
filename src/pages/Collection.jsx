import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CollectionImage from '../components/CollectionImage';
import { doc, getDoc, updateDoc, Timestamp, arrayUnion  } from 'firebase/firestore';
import { projectFireStore, projectStorage } from '../firebase/config';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { ref, uploadBytesResumable } from 'firebase/storage';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const Collection =  () => {
  const variable = useLocation();
  const docId = variable.state;
  console.log(docId);
  const [docu, setDoc]=useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(typeof(docId));
    console.log('in use effect');
    const docRef = doc(projectFireStore, 'collections', docId['docId']);
    async function get_data(docRef){
      const docSnap = await getDoc(docRef);
      return docSnap;
    }
    get_data(docRef).then((docSnap) => {
      console.log(docSnap);
      if(docSnap.exists()){
        setDoc(docSnap.data());
        setName((docSnap.data())['name']);
        setDescription((docSnap.data())['description']);
      }
      else{
        console.log('there is an error');
      }
    });
  }, [docId]);

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    const time = Timestamp.now();
    const name = (selected.name).slice(0, -4)+time+selected.name.slice(-4);
    console.log(name);
    async function upload_data(name){
      await updateDoc(doc(projectFireStore, 'collections', docId['docId']), {
        images:arrayUnion(name),
      });
      return;
    }
    upload_data(name).then(() => {
      if(selected) {
        const storageRef = ref(projectStorage, name);
        const uploadTask = uploadBytesResumable(storageRef, selected);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, (error) => {
          console.log(error);
        }, () => {
          window.location.reload(false);
        });
      }
    });
  };


  return (
    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', p:'5%', alignItems:'center' }}> 
      {docu!=null?<>
        <Typography variant="h3">{docu['name']}</Typography>
        <Typography variant="subtitle1">{docu['description']}</Typography>
        <Button variant="contained" onClick={handleClickOpen}>Edit</Button>
        <Box sx={{ display:'flex', flexDirection:'row', flexWrap:'wrap', width:'90%', justifyContent:'center' }}>
          <Box sx={{ width:'29%', display:'flex', justifyContent:'center', alignItems:'center', m:'1%' }}>
            <IconButton aria-label="delete" size="40px" component="label" sx={{ boxShadow:5 }}>
              <input accept="image/*" type="file" hidden onChange={changeHandler} />
              <AddIcon fontSize="inherit" sx={{  margin:'auto', height:'5em', width:'5em' }} />
            </IconButton>
          </Box>
          {
            docu['images'].map((ele) => { 
              console.log(ele);
              return (<CollectionImage document={ele} key={ele} docId={docId['docId']} sx={{ width:'29%', m:'1%' }} />);
            })
          }
        </Box>
        <Link to="/"><Button variant="contained">Home page</Button></Link></>
        :'waiting for data'}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            defaultValue={name}
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
            helperText={name==='' && 'Name is required'}
            error = {name===''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Description"
            label="Description"
            fullWidth
            variant="standard"
            defaultValue={description}
            required
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            helperText={description==='' && 'Description is required'}
            error = {description===''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={name==='' || description==='' || name==null || description==null } onClick={() => {
            async function change_data(name, description){
              await updateDoc(doc(projectFireStore, 'collections', docId['docId']), {
                'name':name,
                'description':description,
              });
              return;
            }
            change_data(name, description).then(() => {
              handleClose();
              window.location.reload(false);
            });
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Collection;