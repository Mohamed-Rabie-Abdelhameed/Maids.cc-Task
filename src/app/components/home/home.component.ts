import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private ApiService: ApiService) {}
  currentPage = 1;
  totalPages: number = 1;
  users: any[] = [];

  ngOnInit(): void {
    this.ApiService.getUsers(1).subscribe((results) => {
      this.totalPages = results.total_pages;
      this.users = results.data;
    });
  }

  loadUsers() {
    this.ApiService.getUsers(this.currentPage).subscribe((results) => {
      this.users = results.data;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}
