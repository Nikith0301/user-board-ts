// this is permissions to view projects


import { ROLE } from "../data";

interface User {
    id: number;
    name: string;
    role: string;
  }
  
  interface Project {
    id: number;
    name: string;
    userId: number;
  }

export function canViewProject(user:User,project:Project):boolean {

return user.role===ROLE.ADMIN || project.userId===user.id
   
}

export function filteredProjects(user:User,projects:Project[]):Project[]{
    if(user.role===ROLE.ADMIN){return projects}
    return projects.filter(project=>project.userId===user.id)
}


export function canDeleteProject(user:User,project:Project):boolean{

    return project.userId === user.id;

}