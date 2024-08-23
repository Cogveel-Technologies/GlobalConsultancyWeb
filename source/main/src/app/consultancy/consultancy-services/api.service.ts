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
import { SpecificInstitutes } from "../consultancy-models/data.specificInstitutes";

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
    getConsultancy( data: ConsultancyDetailsOptions): Observable<ConsultancyData[]> {
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
    // ------------- display-institutes -------------
    getInstitutes(data: ConsultancyDetailsOptions): Observable<InstituteData[]> {
        return this.http.get<InstituteData[]>(`${this.baseUrl}/Institute?ConsultancyId=${data.ConsultancyId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`)
        .pipe(map(res => {
            return res['data']
        }))
    } 
    
    // ------------- get specific institutes related to loggedin consultancy ------------- ----------
    getSpecificInstitutes(consultancyId:string): Observable<SpecificInstitutes[]> {
        return this.http.get<Observable<SpecificInstitutes[]>>(`${this.baseUrl}/Institute/All?ConsultancyId=${consultancyId}`).pipe(map(response => response['data']))
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
    getPrograms( data: ConsultancyDetailsOptions): Observable<ProgramData[]> {
        return this.http.get<ProgramData[]>(`${this.baseUrl}/Program?InstituteId=${data.InstituteId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`).pipe(map(response => response['data']))
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
    getProgramDetails(id: number): Observable<ProgramData> {
        return this.http.get<Observable<ProgramData>>(`${this.baseUrl}/Program/byId?Id=${id}`).pipe(map(res => res['data']))
    }
     // ------------- get specific institutes related to loggedin consultancy ------------- ----------
     getSpecificPrograms(consultancyId:string): Observable<SpecificInstitutes[]> {
        return this.http.get<Observable<SpecificInstitutes[]>>(`${this.baseUrl}/Institute/All?ConsultancyId=${consultancyId}`).pipe(map(response => response['data']))
    }
    ///////////////////////////////////////////// INTAKES /////////////////////////////////////////////////
    // --------- register-intake ------------------
    registerIntake(data: IntakeData) {
        return this.http.post(`${this.baseUrl}/Intake`, data)
    }
    // ------------------- display-intakes ----------------
    getIntakes( data: ConsultancyDetailsOptions): Observable<IntakeData[]> {
        return this.http.get<IntakeData[]>(`${this.baseUrl}/Intake?ProgramId=${data.ProgramId}&InstituteId=${data.InstituteId}&SessionId=${data.SessionId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`).pipe(map(response => response['data']))
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

    ///////////////////////////////////////////// Session /////////////////////////////////////////////////
    // --------- register-session ------------------
    registersession(data: SessionData) {
        return this.http.post(`${this.baseUrl}/session`, data)
    }
    // ------------------- display-session ----------------
    getsession( data: ConsultancyDetailsOptions): Observable<SessionData[]> {
        return this.http.get<SessionData[]>(`${this.baseUrl}/Session?ProgramId=${data.ProgramId}&InstituteId=${data.InstituteId}&SessionId=${data.SessionId}&limit=${data.pageSize}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.currentPage}`).pipe(map(response => response['data']))
    }
    // ------------- delete-session -----------------
    deletesession(id: number) {
        return this.http.delete(`${this.baseUrl}/Session/byId?Id=${id}`)
    }
    // ------------- edit-Program ------------------
    updatesession(id: number, data: SessionData) {
        return this.http.put(`${this.baseUrl}/Session?id=${id}`, data)
    }
    // --------- single-session-details ------------------
    getsessionDetails(id: number): Observable<SessionData> {
        return this.http.get<Observable<SessionData>>(`${this.baseUrl}/Session/byId?Id=${id}`).pipe(map(res => res['data']))
    }
    // ------------------------ Country Api ---------------------------------
    getAllCountries(){
        return this.http.get(`${this.baseUrl}/Country/All`).pipe(map(res => res['data']))
    }
}