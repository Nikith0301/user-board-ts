import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DataPage from "./pages/DataPage";
import './index.css';
import { Loader } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authUser";

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl font-bold">Hello, Tailwind with TypeScript!</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 text-sm text-white bg-blue-600 dark:bg-blue-800 rounded"
        >
          Toggle Dark Mode
        </button>
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/data' element={ <DataPage /> } />
      </Routes>
    </>
  );
}

export default App;
