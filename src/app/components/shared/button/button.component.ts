import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() value:string;
  @Input() icon:string;

  constructor() { }

  ngOnInit(): void {
      console.log("init button ", this.icon, this.value);

  }

}
