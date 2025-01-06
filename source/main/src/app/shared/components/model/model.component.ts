import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,OnDestroy } from '@angular/core';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  constructor(private consultancyService: ConsultancyService) { }
  message:string;
  deleteId:number;
  ngOnInit(){
    this.consultancyService.deleteId.subscribe(res => this.deleteId = res)
    this.consultancyService.deleteMessage.subscribe(res => this.message = res)
  }
  onDeletePopup() {
    this.consultancyService.deletePopUpState.next(true)
  }
  onClosePopup() {
    console.log("pppp")
    this.consultancyService.deletePopUpState.next(false)
  }
  onDeleteConfirmation() {
    this.consultancyService.deletePopUpState.next(false)
    this.consultancyService.sendDeleteIdtoPC.next(this.deleteId)
  }
  ngOnDestroy(){
    this.consultancyService.deletePopUpState.next(false)
  }
}
