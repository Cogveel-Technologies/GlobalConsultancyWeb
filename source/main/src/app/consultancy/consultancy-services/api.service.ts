import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { map, Observable, tap } from "rxjs";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { InstituteData } from "../consultancy-models/data.institute";
import { ProgramData } from "../consultancy-models/data.program";
import { IntakeData } from "../consultancy-models/data.intake";
import { SessionData } from "../consultancy-models/data.session";
import { loginService } from "app/login.service";
import { SpecificConsultancyRelated } from "../consultancy-models/data.specificInstitutes";
import { AgentDetails } from "../consultancy-models/data.agent";

@Injectable({
    providedIn: 'root'
})

export class ConsultancyApi {
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpClient, private loginService: loginService) { }
    totalConsultancy: number

    /////////////////////////////////////////// CONSULTANCY //////////////////////////////////////////////////

    // ------- register-consultancy------
    registerConsultancy(data: ConsultancyData) {
        return this.http.post(`${this.baseUrl}/Consultancy`, data)
    }
    // --------  get-consultancies (paginated) ----------
    getConsultancy(data: ConsultancyDetailsOptions): Observable<ConsultancyData[]> {
        return this.http.get<ConsultancyData[]>(`${this.baseUrl}/Consultancy?limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`)
    }
    // --------  get-all-consultancies ----------
    getAllConsultancies(): Observable<ConsultancyData[]> {
        return this.http.get<Observable<ConsultancyData[]>>(`${this.baseUrl}/Consultancy/all`).pipe(map(response => response['data']))
    }
    // -------- delete-consultancy ---------------
    deleteConsultancy(id: number) {
        return this.http.delete(`${this.baseUrl}/Consultancy/byId?Id=${id}`)
    }
    // --------- single-consultancy-details ------------------
    getConsultancyDetails(id: number): Observable<ConsultancyData> {
        return this.http.get<Observable<ConsultancyData>>(`${this.baseUrl}/Consultancy/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    // --------- update-consutancy ----------------
    updateConsultancy(data: ConsultancyData) {
        return this.http.put(`${this.baseUrl}/Consultancy/${data.id}`, data)
    }

    ///////////////////////////////////////////// INSTITUTE /////////////////////////////////////////////////

    // ------------- register-institute -------------
    registerInstitute(data: InstituteData) {
        return this.http.post(`${this.baseUrl}/Institute`, data)
    }
    // ------------- display-institutes based on country -------------
    getInstitutes(data: ConsultancyDetailsOptions): Observable<InstituteData[]> {
        return this.http.get<InstituteData[]>(`${this.baseUrl}/Institute?CountryId=${data.CountryId}&IsAdmin=${data.IsAdmin}&ConsultancyId=${data.ConsultancyId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}&isDeleted=${data.IsDeleted}`)

    }

    // ------------- get specific institutes related to loggedin consultancy ------------- ----------
    getSpecificInstitutes(data?:ConsultancyDetailsOptions): Observable<SpecificConsultancyRelated[]> {
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/Institute/All?CountryId=${data.CountryId}&ConsultancyId=${data.ConsultancyId}&IsDeleted=${data.IsDeleted}&IsAdmin=${data.IsAdmin}`).pipe(map(response => response['data']));
    }
  
    // ------------- delete-institute -----------------
    deleteInstitute(id: number) {
        return this.http.delete(`${this.baseUrl}/Institute/byId?Id=${id}`)
    }
    // ------------- edit-Institute ------------------
    updateInstitute(id: number, data: InstituteData) {
        return this.http.put(`${this.baseUrl}/Institute/${id}`, data)
    }

    // --------- single-institute-details ------------------
    getInstituteDetails(id: number): Observable<InstituteData> {
        return this.http.get<Observable<InstituteData>>(`${this.baseUrl}/Institute/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    ////////////////////////////////////////////// PROGRAM //////////////////////////////////////////////////
    // ------------- register-program -------------
    registerProgram(data: ProgramData) {
        return this.http.post(`${this.baseUrl}/Program`, data)
    }
    // ------------- display-programs -------------
    getPrograms(data: ConsultancyDetailsOptions): Observable<ProgramData[]> {
        return this.http.get<ProgramData[]>(`${this.baseUrl}/Program?InstituteId=${data.InstituteId}&SessionId=${data.SessionId}&ConsultancyId=${data.ConsultancyId}&IsAdmin=${data.IsAdmin}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}&isDeleted=${data.IsDeleted}`)
    }
    // ------------- delete-Program -----------------
    deleteProgram(id: number) {
        return this.http.delete(`${this.baseUrl}/Program/byId?Id=${id}`)
    }
    // ------------- edit-Program ------------------
    updateProgram(id: number, data: ProgramData) {
        return this.http.put(`${this.baseUrl}/Program/${id}`, data)
    }

    // --------- single-Program-details ------------------
    getProgramDetails(data: ConsultancyDetailsOptions): Observable<ProgramData> {
        return this.http.get<Observable<ProgramData>>(`${this.baseUrl}/Program/byId?Id=${data.ProgramId}`).pipe(map(res => res['data']))
    }

    getProgramSessions(data:ConsultancyDetailsOptions){
        return this.http.get<Observable<{id:number,sessionName:string}>>(`${this.baseUrl}/Program/Session?ProgramId=${data.ProgramId}`).pipe(map(res => res['data']))
    }
    // ------------- get specific institutes related to loggedin consultancy ------------- ----------
    getSpecificPrograms(data:ConsultancyDetailsOptions): Observable<SpecificConsultancyRelated[]> {
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/Progam/All?InstituteId=${data.InstituteId}&ConsultancyId=${data.ConsultancyId}&IsDeleted=${data.IsDeleted}`).pipe(map(response => response['data']))
    }
    // ------------------------ get program category ----------------------------
    getCategory(filterBy: string): Observable<SpecificConsultancyRelated[]> {
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/DropDown/All?DropDownListName=${filterBy}`).pipe(map(response => response['data']))
    }
    // --------------------------- get all programs -----------------------------
    getAllPrograms(data:ConsultancyDetailsOptions){
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/Program/All?InstituteId=${data.InstituteId}&ConsultancyId=${data.ConsultancyId}&IsDeleted=${data.IsDeleted}`).pipe(map(response => response['data']))
    }
    // ------------------------- get documents on the basis of program ---------------------------------
    getDocumentsOfProgram(id:number){
        return this.http.get(`${this.baseUrl}/Program/GetDocumentsByProgramId?ProgramId=${id}`)
    }
    ///////////////////////////////////////////// INTAKES /////////////////////////////////////////////////
    // --------- register-intake ------------------
    registerIntake(data: IntakeData) {
        return this.http.post(`${this.baseUrl}/Intake`, data)
    }
    // ------------------- display-intakes ----------------
    getIntakes(data: ConsultancyDetailsOptions): Observable<IntakeData[]> {
        return this.http.get<IntakeData[]>(`${this.baseUrl}/Intake?ProgramId=${data.ProgramId}&InstituteId=${data.InstituteId}&SessionId=${data.SessionId}&ConsultancyId=${data.ConsultancyId}&IsAdmin=${data.IsAdmin}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}&isDeleted=${data.IsDeleted}`)
    }
    // ------------- delete-Intake -----------------
    deleteIntake(id: number) {
        return this.http.delete(`${this.baseUrl}/Intake/byId?Id=${id}`)
    }
    // ------------- edit-Program ------------------
    updateIntake(id: number, data: IntakeData) {
        return this.http.put(`${this.baseUrl}/Intake?id=${id}`, data)
    }
    // --------- single-intake-details ------------------
    getIntakeDetails(id: number): Observable<IntakeData> {
        return this.http.get<Observable<IntakeData>>(`${this.baseUrl}/Intake/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    // ------------- get specific sessions related to loggedin consultancy ------------- ----------
    getSpecificIntakes(): Observable<SpecificConsultancyRelated[]> {
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/Intake/All`).pipe(map(response => response['data']))
    }

    ///////////////////////////////////////////// Session /////////////////////////////////////////////////
    // --------- register-session ------------------
    registerSession(data: SessionData) {
        return this.http.post(`${this.baseUrl}/Session`, data)
    }
    // ------------------- display-session ----------------
    getSession(data: ConsultancyDetailsOptions): Observable<SessionData[]> {
        return this.http.get<SessionData[]>(`${this.baseUrl}/Session?InstituteId=${data.InstituteId}&ProgramId=${data.ProgramId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.currentPage}`)
    }
    // ------------- delete-session -----------------
    deleteSession(id: number) {
        return this.http.delete(`${this.baseUrl}/Session/byId?Id=${id}`)
    }
    // ------------- edit-Program ------------------
    updateSession(id: number, data: SessionData) {
        return this.http.put(`${this.baseUrl}/Session?id=${id}`, data)
    }
    // --------- single-session-details ------------------
    getSessionDetails(id: number): Observable<SessionData> {
        return this.http.get<Observable<SessionData>>(`${this.baseUrl}/Session/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    // ------------- get specific sessions related to loggedin consultancy ------------- ----------
    getSpecificSessions(data: ConsultancyDetailsOptions): Observable<SpecificConsultancyRelated[]> {
        return this.http.get<Observable<SpecificConsultancyRelated[]>>(`${this.baseUrl}/Session/All?InstituteId=${data.InstituteId}&ConsultancyId=${data.ConsultancyId}`).pipe(map(response => response['data']))
    }
    // ------------------------ Country Api ---------------------------------
    getAllCountries(): Observable<{ countryName: string, id: (number|string) }[]> {
        return this.http.get<Observable<{ countryName: string, id: number }[]>>(`${this.baseUrl}/Country/All`).pipe(map(res => res['data']))
    }

    /////////////////////////////////////////// AGENT //////////////////////////////////////////////////

    // --------- register-agent ------------------
    registerAgent(data: AgentDetails) {
        return this.http.post(`${this.baseUrl}/Agent`, data)
    }
    // ------------------- display-agent ----------------
    getAgents(data: ConsultancyDetailsOptions): Observable<AgentDetails[]> {
        return this.http.get<AgentDetails[]>(`${this.baseUrl}/Agent?IsAdmin=${data.IsAdmin}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.currentPage}&isDeleted=${data.IsDeleted}`)
    }
    // ------------- delete-agent -----------------
    deleteAgent(id: number) {
        return this.http.delete(`${this.baseUrl}/Agent/byId?Id=${id}`)
    }
    // ------------- edit-Program ------------------
    updateAgent(id: number, data: AgentDetails) {
        return this.http.put(`${this.baseUrl}/Agent/${id}`, data)
    }
    // --------- single-session-details ------------------
    getAgentDetails(id: number): Observable<AgentDetails> {
        return this.http.get<Observable<AgentDetails>>(`${this.baseUrl}/Agent/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    // ------------------ get institutes of consultancy -------------------------
    getInstitutesOfConsultancy(data:ConsultancyDetailsOptions): Observable<any> {
        return this.http.get(`${this.baseUrl}/Institute/ConsultancyId?CountryId=${data.CountryId}&ConsultancyId=${data.ConsultancyId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.currentPage}`)
    }

    getRoless(data:ConsultancyDetailsOptions){
        return this.http.get(`${this.baseUrl}/Role?limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.currentPage}&isDeleted=${data.IsDeleted}`).pipe(tap(res=>console.log(res)))
      }
    
    
    
    

}