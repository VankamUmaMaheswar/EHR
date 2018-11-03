import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: string;
  passWord: string;
  userType: string;
  loginSuccess = false;
  authenticated = false;

  constructor(private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const loggedIn = queryParams['loggedIn'];
      if ( loggedIn ) {
        this.authenticated = true;
        console.log('homecomponent', loggedIn, this.authenticated);
        return this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.loginSuccess = true;
    console.log('loggedIn As', this.userType);
  }

}
