import { useState,useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import { useAuthStore } from '../store/authUser';
import useContent from "../store/content";
import Navbar from '../components/Navbar';

// Define the Project interface (if not already defined)
interface Project {
  id: string;
  name: string;
  _id?: string;
}

// DataPage Component
const DataPage = () => {
  // Local state to manage projects and loading state
  // const [data, setData] = useState<Project[]>([]); 
  // const [loading, setLoading] = useState(false);

  // Authenticated user from Zustand store
  const { user } = useAuthStore();

  // Fetch projects for the current user
  // const fetchProjects = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/v1/search/projects/${user?._id}`, {
  //       withCredentials: true,
  //     });
  //     if (response.data.success) {
  //       setProjects(response.data.projects); // Set fetched projects in local state
  //     } else {
  //       console.error('Failed to fetch projects');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching projects', error);
  //   }
  //   setLoading(false);
  // };


 // Zustand store
 const { projects } = useContent(); // Accessing projects from Zustand

 // Local state to manage the project list for display
 const [displayedProjects, setDisplayedProjects] = useState([]);

 // useEffect to update the displayed projects when Zustand's `projects` changes
 useEffect(() => {
   if (projects && projects.length > 0) {
     setDisplayedProjects(projects); // Update the state when projects change
   }
 }, [projects]); // Listen for changes in projects







  return (
    <div className='flex flex-col h-screen'>
            <Navbar />
      <div className='flex flex-grow'>
            <SideBar />

            <div className="flex-grow  h-screen p-4 dark:bg-slate-600">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Project Data</h2>

        {/* <button 
          onClick={fetchProjects} 
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          {loading ? 'Loading...' : 'Fetch Projects'}
        </button> */}

        {projects.length > 0 ? (
          <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">ID</th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">Project Name</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">{project.id}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">{project.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects available</p>
        )}
      </div> 
      
      </div>
   
     
 
    </div>
  );
};

export default DataPage;
