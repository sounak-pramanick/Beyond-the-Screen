import { createTheme, Pagination, ThemeProvider } from '@mui/material';
import React from 'react';


const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

const CustomPagination = ({setPage, numOfPages = 10}) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10
      }}
    >
      <ThemeProvider theme={darkTheme}>
          <Pagination 
            count={numOfPages} 
            onChange={(e) => {console.log(e.target);handlePageChange(e.target.textContent)}}  
            color="secondary"
            hideNextButton
            hidePrevButton
          />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination;