import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Exception } from '../../../common/exceptions/exception';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  public searchValue;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let queryStr = '';

    this.route.queryParams.subscribe(params => {
      queryStr = params.search;
      this.searchValue = queryStr;
    });
  }

  submit() {
    // console.log(this.searchValue);
    if (_.isUndefined(this.searchValue)) {
      throw new Exception('Enter SKU please');
    }
    const query = _.replace(this.searchValue, /\s/g, '');
    // console.log(query);
    const url = 'inventory/batch?search=' + encodeURI(query);
    // console.log(url);
    this.router.navigateByUrl(url);
  }
}
