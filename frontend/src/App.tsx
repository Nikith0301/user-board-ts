import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";
import './index.css';
import { Loader } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authUser";
import Navbar from "./components/Navbar";

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();

  
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-green-600 size-10' />
				</div>
			</div>
		);
	}


  // if (isCheckingAuth) {
  //   return <div>Loading...</div>; // Show a loading indicator while checking auth
  // }

  return (
    <>    
    {/* <Navbar/> */}
   
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/data' element={ user?<DataPage /> :<Navigate to={"/login"}/>} />
      </Routes>
    </>
  );
}

export default App;
