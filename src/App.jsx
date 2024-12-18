import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,  } from 'react-router-dom'
import './App.css'
import './Component/Common/Common.css'
import Register from './Component/Register/Register'
import app from './firebase.config'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <Register/>
    <ToastContainer />

    </>
  )
}

export default App
