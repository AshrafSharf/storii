import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';


@Component({
  selector: 'profil',
  templateUrl: `app/html/profil/profil.html`,
  directives: [LogStateComponent]
})

export class NodeEditorComponent {
	title = 'NodeEditor:';	 
	
	constructor(private _router: Router) {}
	
 
}
