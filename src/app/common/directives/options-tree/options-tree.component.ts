import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[OptionsTreeComponent]',
  templateUrl: './options-tree.component.html',
  styleUrls: ['./options-tree.component.scss']
})
export class OptionsTreeComponent implements OnInit {

  @Input() trees;
  constructor() { }

  ngOnInit() {
    console.log(this.trees);
  }

}
