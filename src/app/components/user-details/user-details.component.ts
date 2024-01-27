import { Component, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit() {
    this.isLoading.set(true);
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData();
    });
  }

  getUserData() {
    this.apiService.getUserDetails(this.id).subscribe((res) => {
      this.user = res.data;
      this.isLoading.set(false);
    });
  }
}
