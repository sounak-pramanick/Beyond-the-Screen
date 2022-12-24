import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`);

    // console.log(data);
    setContent(data.results);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
        <span 
          className="pageTitle"
        >
          Trending Now <WhatshotIcon style={{fontSize: "30px"}} />
        </span>
        
        <div className="trending">
          {
            content && content.map((c) => (
              <SingleContent 
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))
          }
        </div>
        
        <CustomPagination setPage={setPage}  />
    </div>
  )
}

export default Trending;