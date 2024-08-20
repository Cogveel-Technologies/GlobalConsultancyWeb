import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class SessionService {
    getAllSessions(){
        const data = [
            {
                Id:1,
                SessionName: "Fall Semester",
                InstituteId: 101,
                Year: "2023"
            },
            {
                Id:2,
                SessionName: "Spring Semester",
                InstituteId: 102,
                Year: "2024"
            },
            {
                Id:3,
                SessionName: "Winter Session",
                InstituteId: 104,
                Year: "2024"
            }
        ]

        return of(data)
    }
}