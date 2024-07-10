
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  ELEMENT_DATA = [
    { InstituteName: "lksdjffffffffff", AboutInstitute: "sdklfjasdppppp", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
    { InstituteName: "lksdjf", AboutInstitute: "sdklfjasd", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
    { InstituteName: "lksdjf", AboutInstitute: "sdklfjasd", Province: "klsdjfasdlj", Country: "sdkljfaskl", YearEstablished: "kldsjfklasj", Email: "klsdjflaskj", PhoneNo: "jkldjflaksdj", Website: "jklsdjfaklj", LinkedInUrl: "kljsdflk", FbUrl: "jkjasdfklj" },
  ]

  setInstituteData(data:any){
    this.ELEMENT_DATA = data
  }
}