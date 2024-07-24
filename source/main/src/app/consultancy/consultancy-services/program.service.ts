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
            Id: 1,
            ProgramName: 'Computer Science',
            ProgramDescription: 'An in-depth program covering fundamental and advanced topics in computer science.',
            Duration: '4 years',
            ApplicationFee: 50,
            TuitionFee: 20000,
            LevelOfEducation: 'Undergraduate',
            Status: 'Active',
            SubjectRequirements: 'Mathematics, Physics',
            AcademicRequirements: 'High School Diploma',
            ProgramCategoryId: 101,
            ProgramIntake: 150,
            IntakeId: 1001,
            InstituteId: 5001
        },
        {
            Id: 2,
            ProgramName: 'Business Administration',
            ProgramDescription: 'A comprehensive program focusing on business principles and management practices.',
            Duration: '3 years',
            ApplicationFee: 60,
            TuitionFee: 18000,
            LevelOfEducation: 'Undergraduate',
            Status: 'Active',
            SubjectRequirements: 'Economics, Mathematics',
            AcademicRequirements: 'High School Diploma',
            ProgramCategoryId: 102,
            ProgramIntake: 200,
            IntakeId: 1002,
            InstituteId: 5002
        }
    ];

    getPrograms() {
        //get programmes api when available
        

        return setTimeout(()=>{
            return of(typeof this.data)
        },2000)
    }
}