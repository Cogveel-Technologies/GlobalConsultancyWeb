import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ProgramData } from "../consultancy-models/data.program";

@Injectable({
    providedIn: 'root'
})

export class ProgramService {
    constructor() { }

    data:ProgramData[] = [
        {
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
        }
        
    ];

    getPrograms() {
        //get programmes api when available
        

        return setTimeout(()=>{
            return of(typeof this.data)
        },2000)
    }
}