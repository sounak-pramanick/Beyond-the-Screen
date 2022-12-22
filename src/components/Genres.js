import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';

const Genres = ({type, genres, setGenres, selectedGenres, setSelectedGenres, setPage}) => {
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        
        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres([]);
        }
        // eslint-disable-next-line
    }, []);


    const handleAdd = (genre) => {
        const newSelectedGenres = [...selectedGenres, genre].sort((a,b) => a.name.localeCompare(b.name));
        setSelectedGenres(newSelectedGenres);
        const newGenres = genres.filter((g) => g.id !== genre.id).sort((a,b) => a.name.localeCompare(b.name));
        setGenres(newGenres);
        setPage(1);
    }

    const handleRemove = (genre) => {
        const newSelectedGenres = selectedGenres.filter((sg) => sg.id !== genre.id).sort((a,b) => a.name.localeCompare(b.name));
        setSelectedGenres(newSelectedGenres);
        const newGenres = [...genres, genre].sort((a,b) => a.name.localeCompare(b.name));
        setGenres(newGenres);
        setPage(1);
    }

  return (
    <div style={{padding: "6px 0"}}>
        {selectedGenres && 
            selectedGenres.map((selectedGenre) => (
                <Chip
                    key={selectedGenre.id}
                    label={selectedGenre.name}
                    style={{margin: 2, backgroundColor: "#402e36"}}
                    size="small"
                    color="primary"
                    clickable
                    onDelete={() => handleRemove(selectedGenre)}
                />
            ))}

        {genres && 
            genres.map((genre) => (
                <Chip 
                    key={genre.id}
                    label={genre.name}
                    style={{margin: 2, backgroundColor: "#f3e8f1", color: "#000"}}
                    size="small"
                    clickable
                    onClick={() => handleAdd(genre)}
                />
        ))}
        
    </div>
  )
}

export default Genres;