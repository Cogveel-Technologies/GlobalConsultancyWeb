import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IntakeData } from '../consultancy-models/data.intake';


@Injectable({
  providedIn: 'root'
})
export class IntakeService {
  constructor(){}
  data: IntakeData[];

  getIntakeData() {
    this.data = [
        {
            ProgramId: 1,
            InstituteId: 101,
            SessionId: 2021,
            NoOfIntake: 1200,
            Year:2023,
            Id:1
          },
          {
            ProgramId: 2,
            InstituteId: 102,
            SessionId: 2022,
            NoOfIntake: 1400,
            Year:2021,
            Id:2
          },
          {
            ProgramId: 3,
            InstituteId: 103,
            SessionId: 2023,
            NoOfIntake: 800,
            Year:2025,
            Id:3
          },
    ]

    return of(this.data)
  }
}