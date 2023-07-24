import { BrowserRouter,Routes, Route} from "react-router-dom";
// import { LoginPage} from './pages';
// import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import PatientsPage from "./pages/patient";
import PatientsDetails from "./pages/patientDetails";
import ReferedPatient from "./pages/ReferedPatient";
// import SearchPage from "./pages/searchPage";
import ReferedPatientDetails from "./pages/referedPatientDetail";
import { LoginRoute } from "./pages/login";
import { RegisterUserRoute } from "./pages/register";
import { SearchPage } from "./pages/searchPage";
import { PantientSearchPage } from "./pages/PatientSearchPage";
import KeyNotFound from "./pages/KeyNotFound";
import {Helmet} from "react-helmet";


function App() {
  return (
   <div>

    <Helmet>
      <meta charSet="utf-8" />
      <title>E-Colposcopy Portal</title>
      <link rel="canonical" href="https://colposcopy-patient-dashboard.web.app/" />
      <meta name="description" content="E-Colposcopy Portal" />
    </Helmet>
    <BrowserRouter>
      <Routes>
        <Route index element = {<LoginRoute/>}/>
        <Route path="/login" element = {<LoginRoute/>}/>
        <Route path="/home" element = {<HomePage/>}/>
        <Route path="/patients" element = {<PatientsPage/>}/>
        <Route path="/patientsdetails" element = {<PatientsDetails/>}/>
        <Route path="/referedpatients" element = {<ReferedPatient/>}/>
        <Route path="/referedPatientSearch" element = {<SearchPage/>}/>
        <Route path="/referedPatientDetails" element = {<ReferedPatientDetails/>}/>
        <Route path="/patientSearch" element = {<PantientSearchPage/>}/>
        <Route path="/registerUser" element = {<RegisterUserRoute/>}/>
        <Route path="/keyNotFound" element = {<KeyNotFound/>}/>
        {/* <Route path="*" element = {<Nopage found/>}/> */}
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
