import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useAuthStore } from "../store/authUser";
import useContent from "../store/content";
import Navbar from "../components/Navbar";

import { TrashIcon } from '@heroicons/react/24/solid';

// Define the Project interface (if not already defined)
interface Project {
  id: string;
  name: string;
  _id?: string;
}

// DataPage Component
const DataPage = () => {
  

  // Authenticated user from Zustand store
  const { user } = useAuthStore();


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

  const handleDeleteProject = async (projectId: string) => {
    try {
      const userId=user?._id;
      console.log(userId)
      const response = await axios.delete(`http://localhost:5000/api/v1/search/delete/${userId}/${projectId}`,{withCredentials:true});
  
      if (response) {
        // Optionally, refresh the projects or remove the project from state
        // e.g., setProjects(prev => prev.filter(project => project.id !== projectId));
        console.log('Project deleted successfully');
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };



  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <SideBar />

        <div className="flex-grow  h-screen p-4 dark:bg-slate-600">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
            Project Data
          </h2>

    

          {projects.length > 0 ? (
            <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    ID
                  </th>
                  <th className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    Project Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {project.id}
                    </td>
                    <td className="py-2 px-4 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {project.name}

                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete Project"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
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
