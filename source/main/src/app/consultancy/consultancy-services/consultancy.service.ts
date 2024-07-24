
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { ConsultancyData } from "../consultancy-models/data.consultancy";
import { Observable } from "@ckeditor/ckeditor5-utils";


@Injectable({
    providedIn:"root"
})

export class ConsultancyService{
    constructor(private route:ActivatedRoute){}
    data:ConsultancyData[];
    editMode:boolean = false; 
    

    getConsultancyData(){
      this.data = [
        {
            Id: 0,
            ConsultancyName: "Tech Innovators Consultancy",
            Phone1: 1234567890,
            Phone2: 9876543210,
            Email1: "info@techinnovators.com",
            Email2: "support@techinnovators.com",
            Country: "USA",
            State: "California",
            City: "San Francisco",
            Address: "123 Market Street",
            Street: "Market Street",
            Pincode: "94103",
            RegistrationNo: "TIC-2024-001",
            Website: "https://techinnovators.com",
            FbUrl: "https://facebook.com/techinnovators",
            LinkedInUrl: "https://linkedin.com/company/techinnovators",
            YearEstablished: 2010,
            Password: "securepassword123"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Future Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
          {
            Id: 1,
            ConsultancyName: "Kamran Insights Consultancy",
            Phone1: 2234567890,
            Phone2: 2876543210,
            Email1: "info@futureinsights.com",
            Email2: "support@futureinsights.com",
            Country: "USA",
            State: "California",
            City: "Los Angeles",
            Address: "456 Sunset Boulevard",
            Street: "Sunset Boulevard",
            Pincode: "90028",
            RegistrationNo: "FIC-2024-002",
            Website: "https://futureinsights.com",
            FbUrl: "https://facebook.com/futureinsights",
            LinkedInUrl: "https://linkedin.com/company/futureinsights",
            YearEstablished: 2012,
            Password: "anothersecurepassword"
          },
        ]
      //call the api in the api services when available
      return of(this.data)
    }   
}