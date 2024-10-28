import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrls: ['./register-agent.component.scss']
})
export class RegisterAgentComponent {
  constructor(private fb: FormBuilder, private consultancyApiService: ConsultancyApi, private route: ActivatedRoute, private router: Router) { }
  breadscrums = [
    {
      title: 'Add Agent',
      items: ['Agents'],
      active: 'Add Agent',
    },
  ];
  registerAgent: FormGroup;
  subscription: Subscription = new Subscription();
  consultancyId = localStorage.getItem("id");
  editId: number
  editMode: boolean
  hide3 = true;

  ngOnInit() {
    this.registerAgent = this.fb.group({
      agentCompany: [''],
      alternateCompanyName: [''],
      companyAddress: [''],
      companyWebsite: [''],
      agentFirstName: [''],
      agentMiddleName: [''],
      agentLastName: [''],
      agentPhone: [''],
      agentEmail: [''],
      password: [''],
      linkedInProfile: ['']
    });

    // for editMode
    const editAgent = this.route.snapshot.data['editResponse'];
    
    if (editAgent) {
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.editMode = true;
      this.registerAgent.patchValue(editAgent);
    }
  }

  navigateToAgentList() {
    this.router.navigate(["consultancy", "agent-list"])
  }


  onSubmit() {
    const details = this.registerAgent.value;
    details.consultancyId = +this.consultancyId;

    if (this.editMode) {
      this.subscription.add(
        this.consultancyApiService.updateAgent(this.editId, details).subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            this.navigateToAgentList()
          }
        })
      );
    } else {
      this.subscription.add(
        this.consultancyApiService.registerAgent(details).subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            this.navigateToAgentList()
          }
        })
      );
    }
  }
}
