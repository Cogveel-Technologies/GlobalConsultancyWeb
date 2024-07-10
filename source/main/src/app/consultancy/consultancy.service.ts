
import { Injectable } from "@angular/core";
import { ConsultancyData } from "./consultancy-models/data.consultancy";


@Injectable({
    providedIn:"root"
})

export class ConsultancyService{
    constructor(){}
    data = [
        {
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
            ConsultancyName: "Future Vision Consultancy",
            Phone1: 3456789012,
            Phone2: 7654321098,
            Email1: "info@futurevision.com",
            Email2: "support@futurevision.com",
            Country: "UK",
            State: "England",
            City: "London",
            Address: "789 King Street",
            Street: "King Street",
            Pincode: "EC2N 2BT",
            RegistrationNo: "FVC-2024-003",
            Website: "https://futurevision.com",
            FbUrl: "https://facebook.com/futurevision",
            LinkedInUrl: "https://linkedin.com/company/futurevision",
            YearEstablished: 2015,
            Password: "yetanothersecurepassword789"
          }
    ]
    consultancyData:ConsultancyData[]
}