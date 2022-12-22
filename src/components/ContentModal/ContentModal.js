import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import "./ContentModal.css";
import Carousel from '../Carousel/Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: '#604551',
  color: '#f3e8f1',
  border: '1px solid #342831',
  borderRadius: 10,
  boxShadow: 5,
  padding: (1,1,3)
};

export default function ContentModal({children, id, media_type}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

    setContent(data);
  }

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

    // console.log(data.results);
    setVideo(data.results[data.results.length - 1]?.key);
  }

  useEffect(() => {
    fetchData();
    fetchVideo();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div 
        className="media"
        style={{cursor: "pointer"}}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && 
            (<div className="ContentModal">
              <img 
                src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} 
                alt={content.name || content.title}
                className="ContentModal__potrait"
              />

              <img 
                src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} 
                alt={content.name || content.title} 
                className="ContentModal__landscape" 
              />

              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {content.name || content.title} ({(content.first_air_date || content.release_date || "----").substring(0, 4)})
                </span>
                
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal__description">
                  {content.overview}
                </span>

                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>

                <Button 
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>
              </div>
            </div>)}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}