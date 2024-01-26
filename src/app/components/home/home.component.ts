import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  users = [
    {
      avatar_image: 'https://example.com/avatar1.jpg',
      first_name: 'John',
      last_name: 'Doe',
      id: 1,
    },
    {
      avatar_image: 'https://example.com/avatar2.jpg',
      first_name: 'Jane',
      last_name: 'Smith',
      id: 2,
    },
    {
      avatar_image: 'https://example.com/avatar3.jpg',
      first_name: 'Alex',
      last_name: 'Johnson',
      id: 3,
    },
    {
      avatar_image: 'https://example.com/avatar4.jpg',
      first_name: 'Emily',
      last_name: 'Williams',
      id: 4,
    },
    {
      avatar_image: 'https://example.com/avatar5.jpg',
      first_name: 'Michael',
      last_name: 'Brown',
      id: 5,
    },
    {
      avatar_image: 'https://example.com/avatar6.jpg',
      first_name: 'Samantha',
      last_name: 'Miller',
      id: 6,
    },
    {
      avatar_image: 'https://example.com/avatar7.jpg',
      first_name: 'William',
      last_name: 'Davis',
      id: 7,
    },
    {
      avatar_image: 'https://example.com/avatar8.jpg',
      first_name: 'Olivia',
      last_name: 'Moore',
      id: 8,
    },
    {
      avatar_image: 'https://example.com/avatar9.jpg',
      first_name: 'Daniel',
      last_name: 'Anderson',
      id: 9,
    },
    {
      avatar_image: 'https://example.com/avatar10.jpg',
      first_name: 'Ava',
      last_name: 'Taylor',
      id: 10,
    },
  ];
}
