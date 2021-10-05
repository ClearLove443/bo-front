import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meun',
  templateUrl: './meun.component.html',
  styleUrls: ['./meun.component.scss'],
})
export class MeunComponent implements OnInit {
  isCollapsed = false;
  islogin = false;
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.islogin = true;
    }
  }
  logout(): void {
    localStorage.clear();
    location.href = '/';
  }
}
