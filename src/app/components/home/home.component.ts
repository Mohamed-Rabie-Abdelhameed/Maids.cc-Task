import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { ApiService } from '../../services/api.service';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private ApiService: ApiService) {}
  currentPage = signal(1);
  isLoading = signal(false);
  errorHappened = signal(false);
  totalPages: number = 1;
  users: any[] = [];

  ngOnInit(): void {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'ease-in-out',
    });
    this.isLoading.set(true);
    this.ApiService.getUsers(1).subscribe((results) => {
      this.totalPages = results.total_pages;
      this.users = results.data;
      this.isLoading.set(false);
    });
  }

  loadUsers() {
    this.isLoading.set(true);
    this.ApiService.getUsers(this.currentPage()).subscribe(
      (results) => {
        this.users = results.data;
        this.isLoading.set(false);
      },
      (err) => {
        this.isLoading.set(false);
        this.errorHappened.set(true);
        console.log(err);
      }
    );
  }

  nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.scrollToTop();
      this.currentPage.set(this.currentPage() + 1);
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.scrollToTop();
      this.currentPage.set(this.currentPage() - 1);
      this.loadUsers();
    }
  }

  scrollToTop() {
    const line = document.getElementById('line');
    line!.scrollIntoView({ behavior: 'smooth' });
  }
}
