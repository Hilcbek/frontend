import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Nav } from "./Component/Nav"
import { Footer } from "./Component/Footer"
import { AllUsers } from "./pages/AllUsers"
import { Register } from "./pages/Register"
import { useDispatch, useSelector } from "react-redux"
import { SIGNIN } from "./Redux/User.Reducer"
import { AboutAss } from "./pages/AboutAss"
function App() {
  let {username} = useSelector((state) => state.user)
  let dispatcher = useDispatch();
  !username && dispatcher(SIGNIN({type : true}))
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={username ? <AllUsers /> : <Register />} />
          <Route path="/auth" element={username ? <AllUsers/> : <Register />} />
          <Route path="/about" element={<AboutAss/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
