export interface ConsultancyDetailsOptions{
    OrderBy:string,
    sortExpression:string,
    pageSize:number,
    currentPage:number,
    totalElements?:string,
    searchText?:string,
    isDeleted?:boolean,
    InstituteId?:string,
    ProgramId?:string,
    SessionId?:string,
    ConsultancyId?:string,
    CountryId?:string,
    IntakeId?:string,
    IsPublic?:string,
    UserId?:string
}