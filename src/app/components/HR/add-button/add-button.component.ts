import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  public members : Employee[];
  public isChecked : Boolean[];

  constructor(private  dialogRef:  MatDialogRef<AddButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.members = data.m;
      this.isChecked = [];
      this.members.forEach(m => {
      this.isChecked.push(false)
    });
    }

  ngOnInit(): void {
    console.log(this.members);
  }

  public  closeMe() {
    this.dialogRef.close();
  }

  hasMembers() {
    return this.members.length > 0;
  }

  checkMembers(memb: Employee) {
    var index = this.members.findIndex(m => m.id === memb.id);
    this.isChecked[index] = !this.isChecked[index];

  }

  getCheckedMembers() {
    var checkedMembers: Employee[] = [];

    var i = 0;
    this.members.forEach(element => {
      if (this.isChecked[i]) {
        checkedMembers.push(element);
      }
      i++;
    });

    return checkedMembers;

  }
}
