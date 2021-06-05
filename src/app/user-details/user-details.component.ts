import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.userDetails = data.udetails;
    console.log("****in dialog:::", this.userDetails.emailAddress);
  }

  ngOnInit(): void {
    
  }
  close() {
    this.dialogRef.close();
  }
}
