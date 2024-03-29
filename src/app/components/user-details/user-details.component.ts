import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import AOS from 'aos';
import { CacheService } from '../../services/cache.service';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  id: number = 0;
  user: any;
  isLoading = signal(false);
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cache: CacheService
  ) {}

  ngOnInit() {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'ease-in-out',
    });
    this.isLoading.set(true);
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData();
    });
  }

  getUserData() {
    if (this.cache.getData('user' + this.id)) {
      this.user = this.cache.getData('user' + this.id);
      this.isLoading.set(false);
      return;
    }
    this.apiService.getUserDetails(this.id).subscribe((res) => {
      this.user = res.data;
      this.isLoading.set(false);
      this.cache.saveData('user' + this.id, this.user);
    });
  }
}
