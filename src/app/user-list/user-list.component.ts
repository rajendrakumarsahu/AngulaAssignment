import {HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import { UserDetailsComponent } from '../user-details/user-details.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 
  private _jsonURL = './assets/data/data.json';
  //data:any;
  myVar1 = false;
  users: users[] = [];
  page: number;
  pageSize: number;
  collectionSize: number = 0;
  maxSize: number;
  pageChange: number;
  articlesCount: number = 0;
  constructor(private http: HttpClient,public modalService: NgbModal) {
    this.page = 1;
    this.pageSize = 5;
    this.maxSize = 2;
    this.pageChange = 1;
   }
  ngOnInit(): void {
    
    this.getJSON().subscribe(data => {
      if (data !== null && data !== undefined) {
        this.users = data;
        this.collectionSize = data.length;
        console.log(this.users);
      }else{
        this.collectionSize = 0;
      }
     
    }, error => {
      console.log(error);
    });
    
  }
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL, {headers:{skip:"true"}});
  }
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
    this.maxSize = 2;
  }
  NextPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
    this.maxSize = 2;
  }
  PreviewPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
    this.maxSize = 2;
  }
  
  openPopup(user:users) {
    const modalRef = this.modalService.open(UserDetailsComponent);
    modalRef.componentInstance.user = user;
  }
}
export interface GithubApi {
  items: users[];
  total_count: number;
}

export interface users {
  name: string;
  accountNumber: string;
  country: string;
  dob: string;
  emailAddress: string;
  postalAddress: string;
  phoneNumber: string;
  FavouriteBand: string;
}


