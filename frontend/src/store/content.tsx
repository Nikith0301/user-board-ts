import { create } from 'zustand';

// Define the Project interface
interface Project {
  id: string;
  name: string;
  _id?: string;
}

interface ContentState{
  projects:Project[];
  setProjects:(projects:Project[])=>void;
}

// Zustand store for managing projects
const useContent = create<ContentState>((set) => ({
  projects: [] ,

  // Method to set projects in the store
  setProjects: (projects: Project[]) => set({ projects }),
}));

export default useContent;
