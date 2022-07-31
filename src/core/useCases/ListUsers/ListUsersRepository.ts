export default interface ListUsersRepository{
  RestGetListUsers: (page:number)=>Promise<any>
}
