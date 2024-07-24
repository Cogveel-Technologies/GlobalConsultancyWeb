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
      {
        Id: 1,
        InstituteName: 'Institute of Technology',
        AboutInstitute: 'A leading institution in technology and innovation.',
        Province: 'Ontario',
        Country: 'Canada',
        YearEstablished: '1985',
        Email: 'info@techinstitute.ca',
        PhoneNo: 12345678901,
        Website: 'https://www.techinstitute.ca',
        LinkedInUrl: 'https://www.linkedin.com/institute-of-technology',
        FbUrl: 'https://www.facebook.com/instituteoftechnology'
      },
      {
        Id: 2,
        InstituteName: 'Global Business School',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      },{
        Id: 2,
        InstituteName: 'Global Business School',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      },{
        Id: 2,
        InstituteName: 'Global Business School',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      },{
        Id: 2,
        InstituteName: 'Global Business School',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      },{
        Id: 2,
        InstituteName: 'Global Business School',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      },{
        Id: 2,
        InstituteName: 'kamrans school',
        AboutInstitute: 'A premier school for business studies with a global perspective.',
        Province: 'California',
        Country: 'USA',
        YearEstablished: '1992',
        Email: 'contact@gbusinessschool.com',
        PhoneNo: 19876543210,
        Website: 'https://www.gbusinessschool.com',
        LinkedInUrl: 'https://www.linkedin.com/global-business-school',
        FbUrl: 'https://www.facebook.com/globalbusinessschool'
      }
    ];

    return of(this.data)
  }
}