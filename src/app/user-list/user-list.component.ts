import {HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { UserDetailsComponent } from '../user-details/user-details.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit , AfterViewInit {
  private _jsonURL = './assets/data/data.json';
  //data:any;
  displayedColumns: string[] = ['name', 'accountNumber', 'country', 'dob'];
  data: users[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  constructor(private http: HttpClient,private matDialog: MatDialog) { }
  ngOnInit(): void {
    
    this.getJSON().subscribe(data => {
      this.data = data;
      console.log(this.data);
    }, error => {
      console.log(error);
    });
  }
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL, {headers:{skip:"true"}});
  }
  openDialog(row: any) {
    console.log("***********:::"+row.emailAddress);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '650px';
    dialogConfig.data = { udetails: row};
    this.matDialog.open(UserDetailsComponent, dialogConfig);
  }
  
  ngAfterViewInit() {
   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getJSON().pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        })
      ).subscribe(data => this.data = data);
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
