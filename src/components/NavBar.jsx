import { Link, useLocation } from 'react-router-dom'

function NavBar() {

  const location = useLocation()

  return (
    <nav className='navbar'>

      <h2 className='logo'>🎬 FilmFinder</h2>

      <div className='nav-links'>

        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to='/favourites' className={location.pathname === '/favourites' ? 'active' : ''}>Favourites</Link>

      </div>
      
    </nav>
  )
}

export default NavBar