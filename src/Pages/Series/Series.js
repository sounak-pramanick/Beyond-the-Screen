import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../components/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';

const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    
    setContent(data.results);
    setNumOfPages(500);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  
  return (
    <div>
        <span className="pageTitle">Explore TV Series</span>
        
        <Genres
          type="tv"
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />

        <div className="trending">
          {
            content && content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type="tv"
                vote_average={c.vote_average}
              />
            ))
          }
        </div>

        {numOfPages > 0 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
    </div>
  )
}

export default Series;