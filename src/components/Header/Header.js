import './Header.css';

export const Header = () => {
  
  const scrollToTop = () => {
    window.scroll(0, 0);
  }

  return (
    <span 
      onClick={scrollToTop} 
      className="header"
    >
        &#127916; Beyond the Screen &#127909; 
    </span>
  );
}