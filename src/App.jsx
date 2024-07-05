import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Appointment from './pages/Appointment';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthOtp from './pages/auth/AuthOtp';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Appointments from './pages/dashboard/appointment/Appointments';
import Calendar from './pages/dashboard/Calendar';
import Patients from './pages/dashboard/patient/Patients';
import Doctors from './pages/dashboard/doctor/Doctors';
import Nurses from './pages/dashboard/nurse/Nurses';
import Records from './pages/dashboard/Records';
import Payments from './pages/dashboard/Payments';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Inventory from './pages/dashboard/inventory/Inventory';
import Settings from './pages/dashboard/settings/Settings';
import DrugCategories from './pages/dashboard/settings/drugCategory/DrugCategories';
import InventoryDetails from './pages/dashboard/inventory/InventoryDetails';


function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile' element={<Profile />}>
          <Route index element={<EditProfile />} />
        </Route>
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/forgotpassword' element={<ForgotPassword />} />
        <Route path='/auth/resetpassword' element={<ResetPassword />} />
        <Route path='/auth/otp' element={<AuthOtp />} />
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path='/dashboard/appointments' element={<Appointments />} />
          <Route path='/dashboard/calendar' element={<Calendar />} />
          <Route path='/dashboard/patients' element={<Patients />} />
          <Route path='/dashboard/doctors' element={<Doctors />} />
          <Route path='/dashboard/nurses' element={<Nurses />} />
          <Route path='/dashboard/records' element={<Records />} />
          <Route path='/dashboard/payments' element={<Payments />} />
          <Route path='/dashboard/inventory' element={<Inventory />} />
          <Route path='/dashboard/inventory/:category' element={<InventoryDetails />} />
          <Route path='/dashboard/settings' element={<Settings />}>
            <Route index element={<DrugCategories />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
