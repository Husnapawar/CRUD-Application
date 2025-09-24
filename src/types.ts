export interface  users{
    id:number,
    first_name:String,
    last_name:String, 
    dob:Date, 
    mobile:number, 
    address:String,
   
}
export interface loginUser{
     password:string,
    username:string
}

export interface  addUserRequest{
    id:number,
    first_name:String,
    last_name:String, 
    dob:Date, 
    mobile:number, 
    address:String
}
export interface CreateUserRequest {
page:number, 
      limit: number, 
      sortKey:string, 
      sortOrder:string, 
      name:string
}
interface CustomError extends Error {
  statusCode?: number;
  message: string;
}