import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Responses from "./pages/Responses"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/responses" element={<Responses/>}/>

    </Routes>
    </>
  )
}

export default App
