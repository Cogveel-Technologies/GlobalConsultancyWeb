import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProgramData } from "../consultancy-models/data.program";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class allProgramDetails implements Resolve<ProgramData>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProgramData> {
        const id = route.paramMap.get('id');
        return of({
            id: 1,
            programName: 'Business Administration',
            programDescription: 'A comprehensive program focusing on business principles and management practices.',
            duration: '3 years',
            applicationFee: 60,
            tuitionFee: 18000,
            levelOfEducation: 'Undergraduate',
            status: 'Active',
            subjectRequirements: 'Economics, Mathematics',
            academicRequirements: 'High School Diploma',
            programCategoryId: 102,
            programIntake: 200,
            intakeId: 1002,
            instituteId: 5002
        })
    }
}