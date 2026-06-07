import { BrowserRouter, Route, Routes } from "react-router"
import ProtectedRoute from "./Utils/ProtectedRoute"
import Login from "./Pages/LogIn"
import Register from "./Pages/Register"
import PaymentGate from "./Pages/PaymentGate"
import Landing from "./Pages/Landing"
import Home from "./Pages/Home"
import EmployeeLogin from "./Pages/EmployeeLogin";
import PendingPayments from "./Pages/PendingPayments";
import EmployeeDashboard from "./Pages/EmployeeDashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />

          {/* employee protected routes */}
          <Route path="/EmployeeDashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="/PendingPayments" element={<ProtectedRoute><PendingPayments /></ProtectedRoute>} />

          {/* client protected routes */}
          <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/PaymentGate" element={<ProtectedRoute><PaymentGate /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
