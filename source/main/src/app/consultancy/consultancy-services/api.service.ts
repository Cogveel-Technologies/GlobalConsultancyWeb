import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { map, Observable } from "rxjs";
import { ConsultancyDetailsOptions } from "../consultancy-models/data.consultancy-get-options";
import { InstituteData } from "../consultancy-models/data.institute";
import { ProgramData } from "../consultancy-models/data.program";

@Injectable({
    providedIn: 'root'
})

export class ConsultancyApi {
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    /////////////////////////////////////////// CONSULTANCY //////////////////////////////////////////////////

    // ------- register-consultancy------
    registerConsultancy(data: ConsultancyData) {
        return this.http.post(`${this.baseUrl}/Consultancy`, data)
    }
    // --------  get-consultancies (paginated) ----------
    getConsultancy(data: ConsultancyDetailsOptions): Observable<ConsultancyData[]> {
        return this.http.get<ConsultancyData[]>(`${this.baseUrl}/Consultancy?limit=${data.limit}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&searchText=${data.searchText}&CurrentPage=${data.CurrentPage}`).pipe(map(response => response['data']))
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
        return this.http.get<InstituteData[]>(`${this.baseUrl}/Institute?limit=${data.limit}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.CurrentPage}`).pipe(map(response => response['data']))
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
        return this.http.get<ProgramData[]>(`${this.baseUrl}/Program?InstituteId=${data.InstituteId}&limit=${data.limit}&OrderBy=${data.OrderBy}&sortExpression=${data.sortExpression}&CurrentPage=${data.CurrentPage}`).pipe(map(response => response['data']))
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
}