import React from 'react';
import { Box } from '@mui/material';
import { projectFireStore, projectStorage } from '../firebase/config';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

function CollectionImage (props) {
  const { sx, document, docId, ...other } = props;
  console.log(docId);
  const [url1, setURL] = React.useState(null);
  React.useEffect(() => {
    const fileref = ref(projectStorage, document);
    console.log('getting_data');
    getDownloadURL(fileref).then((url) => {
      setURL(url);
    });
    console.log('hi there');
  } ,[document]);
  console.log(document);
  return (
    <Box sx={{ width:'25vh', height:'25vh', ...sx, backgroundImage:`url(${url1})`, backgroundRepeat:'no-repeat',backgroundSize:'100% 100%', justifyContent:'flex-start', alignItems:'flex-start', textAlign:'left', boxShadow:5 }}{...other}>
      <Box sx={{ display:'flex', flexDirection:'row' }}>
        <IconButton aria-label="delete" style={{ position:'relative', top:'0px', left:'0px', zIndex:'100' }} onClick={() => {
          const refer = ref(projectStorage, document);
          const docrefer = doc(projectFireStore, 'collections', docId);
          async function delete_image(){
            await updateDoc(docrefer, {
              images:arrayRemove(document),
            });
            return ;
          }
          delete_image(docrefer).then(() => {
            window.location.reload(false);
            deleteObject(refer).then(() => {
            });
          });
        }}>
          <CloseIcon fontSize="inherit" style={{ zIndex:'100', color:'red' }} />
        </IconButton>
        <Box sx={{ width:'100%', position:'relative' }} onClick={() => window.open(url1)}></Box>
      </Box>
      <Box sx={{ width:'100%', height:'100%', position:'relative' }} onClick={() => window.open(url1)}></Box>
    </Box>
  );
}

export default CollectionImage;