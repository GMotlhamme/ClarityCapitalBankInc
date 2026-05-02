import { BrowserRouter, Route, Routes } from "react-router"
// import ProtectedRoute from "./utils/ProtectedRoute"
import Login from "./pages/LogIn"
import Register from "./pages/Register"
import PaymentGate from "./pages/PaymentGate"
import Landing from "./pages/Landing"

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
            <Route path="/PaymentGate" element={<PaymentGate />} />
            {/* <Route path="/PaymentGate" element={<ProtectedRoute><PaymentGate /></ProtectedRoute>} /> */}

       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
