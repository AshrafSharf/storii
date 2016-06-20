import {Component,bind} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import {LoginComponent} from './scripts/login/login.component';
import {RegisterComponent} from './scripts/register/register.component';
import {SearchFormComponent} from './scripts/search/search-form.component';
import {ResultComponent} from './scripts/result/result.component';
import {LogStateComponent} from './scripts/logState/logState.component';
import {NodeEditorComponent} from './scripts/nodeEditor/nodeEditor.component';
import {ProfileComponent} from './scripts/profile/profile.component';
import {AboutComponent} from './scripts/about/about.component';
import {ErrorComponent} from './scripts/error/error.component';
import {PresentationComponent} from './scripts/presentation/presentation.component';
import {CommentsComponent} from './scripts/comments/comments.component';


    
@Component({
      selector: 'storii-app',
      templateUrl:`app/html/start/start.html`,
      directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', name: 'Search', component: SearchFormComponent},
	{ path: '/login', name: 'Login', component: LoginComponent},
    { path: '/register', name: 'Register', component: RegisterComponent},
    { path: '/error', name: 'Error', component: ErrorComponent},
    { path: '/search', name: 'Result', component: ResultComponent},
    { path: '/users/:name/:storyName/node/edit', name: 'NodeEditor', component: NodeEditorComponent},
    { path: '/users/:name', name: 'Profile', component: ProfileComponent},
    { path: '/users/:name/:storyName', name: 'About', component: AboutComponent},
    { path: '/users/:name/:storyName/comments', name: 'Comments', component: CommentsComponent},
    { path: '/users/:name/:storyName/published', name: 'Presentation', component: PresentationComponent} 
    
  ])

export class AppComponent{
 	libelleImageUrl = 'app/assets/files/libelle.jpg';
 	logoImageUrl = 'app/assets/files/logo.jpg';

}