import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';


@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  constructor(){}
  data: InstituteData[];

  getInstituteData() {
    this.data = [
      {id:3,
        consultancyId: 1,
        instituteName: 'Institute of Technology',
        aboutInstitute: 'A leading institution in technology and innovation.',
        province: 'Ontario',
        country: 'Canada',
        yearEstablished: 1985,
        email: 'info@techinstitute.ca',
        phoneNo: '12345678901',
        website: 'https://www.techinstitute.ca',
        linkedInUrl: 'https://www.linkedin.com/institute-of-technology',
        fbUrl: 'https://www.facebook.com/instituteoftechnology'
    },
    {id:3,
        consultancyId: 2,
        instituteName: 'Global Business School',
        aboutInstitute: 'A premier school for business studies with a global perspective.',
        province: 'California',
        country: 'USA',
        yearEstablished: 1992,
        email: 'contact@gbusinessschool.com',
        phoneNo: '19876543210',
        website: 'https://www.gbusinessschool.com',
        linkedInUrl: 'https://www.linkedin.com/global-business-school',
        fbUrl: 'https://www.facebook.com/globalbusinessschool'
    },
    
    ];

    return of(this.data)
  }
}