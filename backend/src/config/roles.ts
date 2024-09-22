export const ROLE={
    ADMIN:"admin",
    BASIC:"basic"
}as const;//When you use as const, the type of ROLE becomes:

// const role: typeof ROLE.ADMIN = 'sadmin';//this gives error