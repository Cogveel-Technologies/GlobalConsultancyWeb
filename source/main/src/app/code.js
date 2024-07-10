// import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
// import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

// @Directive({
//   selector: '[appCustomValidator]',
//   providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true }]
// })
// export class CustomValidatorDirective implements Validator, OnInit {
//   @Input('appCustomValidator') validationType: string;

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     if (!this.validationType) {
//       throw new Error('Validation type is required');
//     }
//   }

//   validate(control: AbstractControl): ValidationErrors | null { 
//     if (!control.value) {
//       this.removeError();
//       // return { required: true }; // if the field is empty, mark it as required
//       //  console.log("sdfsfdsdfsdfds");
      
//     }

//     let error: ValidationErrors | null = null;

//     switch (this.validationType) {
//       case 'email':
//         error = this.validateEmail(control.value) ? null : { 'invalidEmail': true };
//         break;
//       case 'firstName':
//         case 'agentCompany':
//         error = this.validateName(control.value) ? null : { 'invalidFirstName': true };
//         break;
//       case 'agentFirstName':
//         error = this.validateName(control.value) ? null : { 'invalidagentFirstName': true };
//         break;
//       case 'agentLastName':
//         error = this.validateName(control.value) ? null : { 'invalidagentLastName': true };
//         break;
//       case 'phoneNumber':
//         error = this.validatePhoneNumber(control.value) ? null : { 'invalidPhoneNumber': true };
//         break;
//       default:
//         error = null;
//     }

//     this.setError(error);
//     return error;
//   }

//   validateEmail(value: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(value);
//   }

//   validateName(value: string): boolean {
//     const nameRegex = /^[a-zA-Z]+$/;
//     return nameRegex.test(value);
//   }

//   validatePhoneNumber(value: string): boolean {
//     const phoneRegex = /^\+?[1-9]\d{1,14}$/;
//     return phoneRegex.test(value);
//   }

//   setError(error: ValidationErrors | null) {
//     this.removeError();
//     if (error) {
//       const errorMessage = this.getErrorMessage(error);
//       const errorNode = this.renderer.createElement('div');
//       const text = this.renderer.createText(errorMessage);
//       console.log("----------------------->", text);
//       this.renderer.appendChild(errorNode, text);
//       this.renderer.setStyle(errorNode, 'color', 'red');
//       this.renderer.setStyle(errorNode, 'font-size', '12px');
//       this.renderer.setStyle(errorNode, 'margin-top', '5px');
//       this.renderer.setAttribute(errorNode, 'class', 'validation-error');
//       this.renderer.appendChild(this.el.nativeElement.parentElement, errorNode);
//     }
//   }

//   removeError() {
//     const parent = this.el.nativeElement.parentElement;
//     const errorNode = parent.querySelector('.validation-error');
//     if (errorNode) {
//       this.renderer.removeChild(parent, errorNode);
//     }
//   }

//   getErrorMessage(error: ValidationErrors): string {
//     if (error['invalidEmail']) {
//       return 'Invalid Email';
//     }
//     if (error['invalidFirstName']) {
//       return 'Invalid Input Value';
//     }
//     if (error['invalidagentFirstName']) {
//       return 'Invalid agent First Name';
//     }
//     if (error['invalidagentLastName']) {
//       return 'Invalid Last Name';
//     }
//     if (error['invalidPhoneNumber']) {
//       return 'Invalid Phone Number';
//     }
//     return 'Invalid Value';
//   }
// }
