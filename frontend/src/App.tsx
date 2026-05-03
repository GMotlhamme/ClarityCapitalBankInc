import { BrowserRouter, Route, Routes } from "react-router"
import ProtectedRoute from "./Utils/ProtectedRoute"
import Login from "./Pages/LogIn"
import Register from "./Pages/Register"
import PaymentGate from "./Pages/PaymentGate"
import Landing from "./Pages/Landing"

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
            {/* <Route path="/PaymentGate" element={<PaymentGate />} /> */}
            <Route path="/PaymentGate" element={<ProtectedRoute><PaymentGate /></ProtectedRoute>} />

       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
