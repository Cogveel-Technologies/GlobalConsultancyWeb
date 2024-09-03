export interface ConsultancyDetailsOptions{
    OrderBy:string,
    sortExpression:string,
    pageSize:number,
    currentPage:number,
    totalElements?:number,
    searchText?:string,
    isDeleted?:boolean,
    InstituteId?:string,
    ProgramId?:string,
    SessionId?:string,
    ConsultancyId?:string,
    CountryId?:string,
    IntakeId?:string
}