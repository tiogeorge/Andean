import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private link_copyright : string = "https://www.facebook.com/andeantecnology/";
  private link_desarrollador : string = "https://www.google.com";
  private link_facebook : string = "https://www.facebook.com/andeantecnology/";

  constructor() { }

  ngOnInit() {
  }

}
