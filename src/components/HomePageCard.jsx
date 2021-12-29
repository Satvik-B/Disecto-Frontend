import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getDownloadURL, ref, deleteObject } from 'firebase/storage';
import { projectFireStore, projectStorage } from '../firebase/config';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import background from '../img/download.jpeg';


export default function HomePageCard(props) {
  const { sx, document, ...other } = props;
  const [url1, setURL] = React.useState(background);
  console.log(url1);
  React.useEffect(() => {
    console.log(document['images']);
    if(document['images'].length>0){
      const fileref = ref(projectStorage, document['images'][0]);
      getDownloadURL(fileref).then((url2) => {
        setURL(url2);
      }, (error) => {
        console.log(error);
      });
    }
  });
  return (
    <Card sx={{ minWidth: 345, ...sx }} {...other}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="230"
        image={url1}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {document['name']}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {document['description']}
        </Typography>
      </CardContent>
      <CardActions sx={{  display:'flex', justifyContent:'space-evenly' }}>
        <Link to="/collection" state = {{ docId : document['id'] }}>
          <Button variant="contained" size="small">
            Open
          </Button>
        </Link>
        <Link to="/">
          <Button variant="contained" size="small" onClick={async () => {
            for(let i=0;i<document['images'].length;i++)
            {
              const temp = ref(projectStorage, document['images'][i]);
              deleteObject(temp).then(() => {

              }).catch((error) => {
                console.log(error);
              });
            }
            await deleteDoc(doc(projectFireStore, 'collections', document['id']));
          }}>
            Delete
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
