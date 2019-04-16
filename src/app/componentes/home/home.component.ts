import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  constructor(public titleService: Title, public metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle('SMARKET, lo ultimo en tecnología');
  }

}
