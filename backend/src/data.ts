interface User{
    id:number,
    name:string,
    role:string
}

interface Projects{
    id:number,
    name:string,
    userId:number
}

export const ROLE={
    ADMIN:"admin",
    BASIC:"basic"
}as const;//When you use as const, the type of ROLE becomes:

// const role: typeof ROLE.ADMIN = 'sadmin';//this gives error

export const users:User[]=[
    {id:1,name:"Sai",role:ROLE.ADMIN},
    {id:2,name:"Baba",role:ROLE.ADMIN},
    {id:3,name:"Tyaga",role:ROLE.BASIC},
    {id:4,name:"Kartou",role:ROLE.BASIC}
]

export const projects:Projects[]=[
    {id:1,name:"Sai's project",userId:1},
    {id:2,name:"Baba's project",userId:2},
    {id:3,name:"Tyaga's project",userId:3},
    {id:4,name:"Kartou's project",userId:4},
    {id:5,name:"Baba's project2",userId:2},
    {id:6,name:"Tyaga's project2",userId:3},
]

