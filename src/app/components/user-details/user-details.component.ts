import { Component, OnChanges, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: any ;
  errMsg: any = '';
  userOfId:any ;

  constructor(private UsersService: UsersService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      this.userId = this.ActivatedRoute.snapshot.paramMap.get("id");
      this.UsersService.getUserDetails(this.userId).subscribe({
        next: data => {
          // console.log('User data retrieved successfully:', data);
          this.userOfId = data;
          // console.log(this.userOfId)
        },
        error: err => {
          // console.error('Error retrieving user data:', err);
          this.errMsg = err;
        }
      });
    }

    returnBack(): void{
      this.router.navigate(['home']);
    }

  }
