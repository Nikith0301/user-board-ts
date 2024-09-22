import { useState } from 'react';
import axios from 'axios';

// Define the Project interface (if not already defined)
interface Project {
  id: string;
  name: string;
  _id: string;
}

const DataPage = () => {
  // Explicitly type projects as an array of Project
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {

// const yourAuthToken= localStorage.getItem('user-jwt');
const yourAuthToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYwMjJhZjE0NDllMjVhYzVlOTRhNjIiLCJpYXQiOjE3MjcwMjA2MTQsImV4cCI6MTcyODMxNjYxNH0.noJNp1eu74ObDsS85ExQF6f0XjaOFaIXO_da8PwsLXI"
console.log("19 your",yourAuthToken)

    setLoading(true);
    try {
        const response = await axios.get('http://localhost:5000/api/v1/search/projects/66f008cadc376bc369cddc3d', {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${yourAuthToken}`
            }
          });
      if (response.data.success) {
        setProjects(response.data.projects); // Set projects in state
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Data</h2>

      <button 
        onClick={fetchProjects} 
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        {loading ? 'Loading...' : 'Fetch Projects'}
      </button>

      {projects.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Project Name</th>
              <th className="py-2 px-4 border-b">Database ID</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="py-2 px-4 border-b">{project.id}</td>
                <td className="py-2 px-4 border-b">{project.name}</td>
                <td className="py-2 px-4 border-b">{project._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default DataPage;
