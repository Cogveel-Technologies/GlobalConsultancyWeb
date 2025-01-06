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
    ConsultancyId?:string|null,
    CountryId?:string,
    IntakeId?:string,
    IsPublic?:string,
    UserId?:string,
    IsDeleted?:boolean,
    IsAdmin?:boolean|string,
    roleId?:number|string,
    dropDownListName?:number|string
}