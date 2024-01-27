import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { ApiService } from '../../services/api.service';
import AOS from 'aos';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private ApiService: ApiService, private cache: CacheService) {}
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
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    if (
      this.cache.getData('users' + this.currentPage()) &&
      this.cache.getData('totalPages')
    ) {
      this.users = this.cache.getData('users' + this.currentPage());
      this.totalPages = this.cache.getData('totalPages');
      this.isLoading.set(false);
      return;
    }
    this.ApiService.getUsers(this.currentPage()).subscribe(
      (results) => {
        this.users = results.data;
        this.totalPages = results.total_pages;
        this.isLoading.set(false);
        this.cache.saveData('users' + this.currentPage(), this.users);
        this.cache.saveData('totalPages', this.totalPages);
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
