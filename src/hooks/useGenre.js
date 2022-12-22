const useGenres = (selectedGenres) => {
    if(selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map((genre) => genre.id);

    return GenreIds.reduce((result, genreId) => ( `${result},${genreId}`));
}

export default useGenres;