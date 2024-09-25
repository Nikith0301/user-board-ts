import { create } from 'zustand';

// Define the Project interface
interface Project {
  id: string;
  name: string;
  _id?: string;
}

// Zustand store for managing projects
const useContent = create((set) => ({
  projects: [] as Project[],  // Initialize projects as an empty array

  // Method to set projects in the store
  setProjects: (projects: Project[]) => set({ projects }),
}));

export default useContent;
