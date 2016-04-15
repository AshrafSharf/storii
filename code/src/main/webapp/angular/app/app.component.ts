import {Component} from 'angular2/core';
import {SearchFormComponent} from './search-form.component';

    
@Component({
      selector: 'storii-app',
      templateUrl:`app/start/start.html`,
      directives: [SearchFormComponent]
})

export class AppComponent {
    
}