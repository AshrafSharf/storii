import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import { Search }    from './search';
import {LogStateComponent} from './logState.component';

@Component({
  selector: 'search-form',
  templateUrl: `app/search/search.html`,
  directives: [LogStateComponent]
})


export class SearchFormComponent {
	title = 'Search:';
	
	submitted = false;

  	onSubmit() { this.submitted = true; }
}
