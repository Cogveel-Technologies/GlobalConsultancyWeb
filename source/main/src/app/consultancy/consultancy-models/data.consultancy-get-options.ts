export interface ConsultancyDetailsOptions{
    OrderBy:string,
    sortExpression:string,
    pageSize:number,
    currentPage:number,
    totalElements?:string,
    searchText?:string,
    InstituteId?:string,
    ProgramId?:string,
    SessionId?:string,
    ConsultancyId?:string,
    CountryId?:string,
    IntakeId?:string,
    IsPublic?:string,
    UserId?:string,
    IsDeleted?:boolean,
    IsAdmin?:boolean|string
}