import { Component,Output, EventEmitter  } from '@angular/core';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private UsersService: UsersService){}
  searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(): void {
    this.UsersService.setSearchQuery(this.searchQuery);
  }
}
