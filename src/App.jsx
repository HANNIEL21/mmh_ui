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
import Staffs from './pages/dashboard/staff/Staffs';
import Records from './pages/dashboard/records/Records';
import RecordsDetails from './pages/dashboard/records/RecordsDetails';
import Payments from './pages/dashboard/Payments';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Inventory from './pages/dashboard/inventory/Inventory';
import InventoryDetails from './pages/dashboard/inventory/InventoryDetails';
import Settings from './pages/dashboard/settings/Settings';
import DrugCategories from './pages/dashboard/settings/drugCategory/DrugCategories';
import RecordsProfile from './pages/dashboard/records/RecordsProfile';
import RecordsMedical from './pages/dashboard/records/RecordsMedical';
import RecordsPayment from './pages/dashboard/records/RecordsPayment';
import RecordsLab from './pages/dashboard/records/RecordsLab';
import RecordsAppointment from './pages/dashboard/records/RecordsAppointment';
import Investigation from './pages/dashboard/nurse/investigation/Investigation';
import PatientsRoot from './pages/dashboard/patient/EditRoot';
import EditPatient from './pages/dashboard/patient/EditPatient';
import EditRoot from './pages/dashboard/patient/EditRoot';
import EditMedical from './pages/dashboard/patient/EditMedical';
import Remark from './pages/dashboard/remark/Remark';
import Pharmacy from './pages/dashboard/pharmacy/Pharmacy';


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
          <Route path='/dashboard/patients/edit/:id' element={<EditRoot />} >
            <Route index element={<EditPatient />} />
            <Route path='/dashboard/patients/edit/:id/vitals' element={<EditMedical />} />
          </Route>
          <Route path='/dashboard/staffs' element={<Staffs />} />
          <Route path='/dashboard/investigation' element={<Investigation />} />
          <Route path='/dashboard/remark' element={<Remark />} />
          <Route path='/dashboard/records' element={<Records />} />
          <Route path='/dashboard/records/:patient' element={<RecordsDetails />} >
            <Route index element={<RecordsProfile />} />
            <Route path='/dashboard/records/:patient/medical' element={<RecordsMedical />} />
            <Route path='/dashboard/records/:patient/payment' element={<RecordsPayment />} />
            <Route path='/dashboard/records/:patient/lab' element={<RecordsLab />} />
            <Route path='/dashboard/records/:patient/appointment' element={<RecordsAppointment />} />
          </Route>
          <Route path='/dashboard/payments' element={<Payments />} />
          <Route path='/dashboard/pharmacy' element={<Pharmacy />} />
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
