import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  errMsg: any = '';
  displayedColumns: string[] = ['id', 'avatar', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<IUser>();

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.usersService.getSearchQuery().subscribe(query => {
      // Call applyFilter method when the search query changes
      this.applyFilter(query);
    });

    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users: any) => {
        this.users = users.data; // Extract the user data from the response
        this.dataSource = new MatTableDataSource(this.users); // Use the extracted user data to initialize MatTableDataSource
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        this.errMsg = err.message || 'An error occurred while fetching users.';
      },
    });
  }

  selectedUser(id: number): void {
    this.router.navigate(['user', id]);
  }

  applyFilter(query: string): void {
    const filterValue = query.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: IUser, filter: string) => {
      // Check if any of the columns match the filter value
      return (
        data.id.toString().includes(filter) || // Match ID
        data.first_name.toLowerCase().includes(filter) || // Match first name
        data.last_name.toLowerCase().includes(filter) // Match last name
      );
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
