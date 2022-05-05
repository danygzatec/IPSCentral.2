import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import ExcelData from 'src/excel-dummy.json'


import {Router} from '@angular/router';
import { Employee } from './models/employee';
import { EvaluationPeriod } from './models/evaluation-period';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IPSCentral';
  employees : Employee[];
  evaluationPeriod : any[];

  public test = 0;

  constructor(private msalService: MsalService, public router: Router){
    this.employees = ExcelData.employee;
    this.evaluationPeriod = ExcelData.evaluation_period;

  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account !=null){
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
    this.employees = ExcelData.employee;
    this.evaluationPeriod = ExcelData.evaluation_period;
    //this.isLoggedIn();

  }

  isLoggedIn() : boolean {
    // this.router.navigate(['/home']);
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    //redirect a microsoft login
    //this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) =>{
      this.msalService.instance.setActiveAccount(response.account)
      // console.log("hola", response.account?.name)
      // console.log("hola", response.account?.username)
    }); 
    this.rerouteHR();
  }

  logout(){
    this.msalService.logout();
  }

  getNameAccount(): any{
    return this.msalService.instance.getActiveAccount()?.name;
  }

  getEmailAccount(): any{
    return this.msalService.instance.getActiveAccount()?.username;
  }

  setHasUpload(){
    this.evaluationPeriod[0].has_uploaded = true;
    console.log("excel app", this.evaluationPeriod[0].has_uploaded);
  }

  getHasUpload() : boolean{
    console.log("navbar app", this.evaluationPeriod[0].has_uploaded);
    this.test++;
    console.log(this.test);
    return this.evaluationPeriod[0].has_uploaded
  }
  
  isHR() : boolean {
    var user = this.employees.find(element => element.employee_name === this.msalService.instance.getActiveAccount()!.name);
    if (user!.is_HR) {
      return true;
    } else {
      return false;
    }
  }

  rerouteHR() {
    var user = this.employees.find(element => element.employee_name === this.msalService.instance.getActiveAccount()!.name);
    if (user!.is_HR) {
      this.router.navigate(['crear-equipos']);
    } else {
      this.router.navigate(['myprojects']);
    }
  }

}
