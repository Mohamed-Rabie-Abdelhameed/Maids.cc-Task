import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  totalPages: number = 2;
  allUsers: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.filterUsers();
        console.log(this.searchResults);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 1; i <= this.totalPages; i++) {
        this.getUsers(i);
      }
    }, 1000);
  }

  getUsers(page: number) {
    this.apiService.getUsers(page).subscribe((results) => {
      this.allUsers = this.allUsers.concat(results.data);
      this.totalPages = results.total_pages;
      console.log(this.allUsers);
    });
  }

  filterUsers() {
    this.searchResults = this.allUsers.filter((user: any) => {
      return user.id.toString().includes(this.searchTerm);
    });
  }
  searchUser() {
    if (this.searchTerm.length === 0) {
      this.searchResults = [];
      return;
    }
    this.searchSubject.next(this.searchTerm);
  }
}
