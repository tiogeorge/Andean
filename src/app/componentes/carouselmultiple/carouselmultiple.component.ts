import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-carouselmultiple',
  templateUrl: './carouselmultiple.component.html',
  styleUrls: ['./carouselmultiple.component.css']
})
export class CarouselmultipleComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  iniciocarru(e){
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        console.log("entra" ,idx);
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
  }

}
