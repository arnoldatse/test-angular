export default interface DetailsUserRepository{
  RestGetDetailsUser: (userId: number)=>Promise<any>
}
