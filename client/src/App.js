import "./App.css";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import InitialSignupPage from "./Pages/InitialSignup";
import Aboutus from "./Pages/Aboutus";
import ContactUs from "./Pages/ContactUs";
import RequireAuth from "./Components/RequireAuth";

//client
import ClientPageRequest from "./Pages/ClientPageRequests";
import ClientPage from "./Pages/ClientPage";
//worker
import ClientLogData from "./Pages/ClientLogData";
import WorkerPage from "./Pages/WorkerPage";
import WorkerSignUp from "./Pages/WorkerSignup";
import ClientSignUp from "./Pages/ClientSignup";
import ListingPage from "./Pages/ListingPage";
import Workerxxx from "./Pages/Workerxxx"

//admin
import AdminPage from "./Pages/AdminPage"
import Adminxx from "./Pages/Adminxx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="clientpage" element={<ClientPage />} />
            <Route path="workerpage" element={<WorkerPage />} />
            <Route path="clientlisting" element={<ListingPage />} />
            <Route path="/admin" element= {<AdminPage/>} />
            <Route path="clientpagerequests" element={<ClientPageRequest />} />
             <Route element={<RequireAuth />}>
                <Route path="worker" element={<Workerxxx />} /> 
                <Route path="admin" element={<Adminxx />} />
             </Route> 

            <Route path="aboutus" element={<Aboutus />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<InitialSignupPage />} />
            <Route path="workersignup" element={<WorkerSignUp />} />
            <Route path="clientsignup" element={<ClientSignUp />} />

            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
