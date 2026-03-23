import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Favourites from "./pages/Favourites"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  )
}

export default App
