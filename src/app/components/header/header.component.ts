import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm: string = '';
  searchResults: string[] = [];
  searchSubject: Subject<string> = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.apiService.getUsers(1).subscribe((results) => {
          this.searchResults = results;
          console.log(this.searchResults);
        });
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
