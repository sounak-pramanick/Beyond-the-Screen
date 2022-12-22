import { Badge } from '@mui/material';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import './SingleContent.css';

const SingleContent = ({id, poster, title, date, media_type, vote_average}) => {
  return (
    <ContentModal id={id} media_type={media_type}>
        <Badge 
          badgeContent={vote_average ? Math.round(vote_average * 10) / 10 : "N/A"} 
          color={vote_average >= 6 ? "primary" : "secondary"} 
        />
        
        <img 
          className="poster" 
          src={poster ? `${img_300}/${poster}` : unavailable} 
          alt={title} 
        />
        
        <b className="title">{title}</b>
        
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
    </ContentModal>
  )
}

export default SingleContent;