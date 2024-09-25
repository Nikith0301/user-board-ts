import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useContent from "../store/content";

interface Project {
  id: string;
  name: string;
  _id?: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  projects?: Project[]; // Now assuming `projects` contains an array of Project objects
}

const SideBar = () => {
  const [users, setUsers] = useState<User[]>([]); // Array of User objects
  const { setProjects } = useContent(); // Zustand function to set projects

  // Fetch all users with their projects
  async function fetchUsers() {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/users`, {
        withCredentials: true,
      });
      setUsers(response.data.users); // Store the fetched users along with projects
      console.log(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  // Set projects directly from user data
  async function setContent(projects: Project[] | undefined) {
    if (!projects || projects.length === 0) {
      console.log("No projects for this user.");
      return;
    }

    try {
      setProjects(projects); // Use Zustand to set the projects in the state
      console.log("Projects set in Zustand:", projects);
    } catch (error) {
      console.error("Error setting projects:", error);
    }
  }

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="#"
                onClick={fetchUsers}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>

            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setContent(user.projects)}
                className="flex items-center space-x-10 dark:text-white"
              >
                {user.name}

                {user.role === "admin" && (
                  <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold shadow-md shine-effect">
                    Admin
                  </div>
                )}
              </button>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
