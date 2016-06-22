import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Injectable()
export class EditBarService {
  constructor (private http: Http, private httpClient: HttpClient, private _authenticationService: AuthenticationService) {}

	uploadFile(file:File) {
   

      /*  let xhr:XMLHttpRequest = new XMLHttpRequest();
       
		 	var string = localStorage.getItem("auth_token");
		 	var url = "";
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', string); 

        let formData = new FormData();
        formData.append("file", file, file.name);
        xhr.send(formData);*/
   
	}
	
	setProfileImage(formData){
		 var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'multipart/form-data');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/attachmentUI/addUserImage'; 
	    return this.http.post(_resultUrl, formData,{headers})
	            .map(this.extractData)
	            .do(data => console.log(data))
	            .catch(this.handleError);
	
	
	}
	
	
	publishStory(id){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/story/'+id+'/publish'; 
	    return this.http.get(_resultUrl, {headers})
	            .map(this.extractData)
	            //.do(data => console.log(data))
	            .catch(this.handleError);
	  	
	}
	
	unpublishStory(id){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/story/'+id+'/unpublish'; 
	    return this.http.get(_resultUrl, {headers})
	            .map(this.extractData)
	            //.do(data => console.log(data))
	            .catch(this.handleError);
	  	
	}

	updateUserValues(key, value ,user_id){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/user/updateMe'; 
	    return this.http.put(_resultUrl, JSON.stringify(new function(){ this[key] = value; }),{headers})
	            .map(this.extractData)
	            //.do(data => console.log(data))
	            .catch(this.handleError);
	  	
	}
	
	updateStoryValues(key, value ,story_id){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/story/'+story_id; 
	    return this.http.put(_resultUrl, JSON.stringify(new function(){ this[key] = value; }),{headers})
	            .map(this.extractData)
	            //.do(data => console.log(data))
	            .catch(this.handleError);
	  	
	}

	saveData(images,texts,links,actualPage){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
  		
  		
  		if(texts[0]== undefined){
  			texts.splice(0, 0, {content:""});
		}
		if(texts[1] == undefined){
			texts.splice(1, 0, {content:""});
		}
  		
  		var id = actualPage['id']
		var object = {};
		object['images'] = images; 
		object['texts'] = texts; 
		object['links'] = links;
		var serializedContent =  btoa(JSON.stringify(object));
		
		
		
		//here update links!!
  		
		var _resultUrl = '/page/'+id; 
	    return this.http.put(_resultUrl, JSON.stringify({'serializedContent' : serializedContent ,'title': texts[0]['content'], 'description': texts[1]['content']}),{headers})
	            .map(this.extractData)
	            .do(data => console.log(data))
	            .catch(this.handleError);
	}

	getLoggedInUser(){
		var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
  		}else{
  			headers.delete('Authorization');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/user/'; 
	 	return this.http.get(_resultUrl+"me",{headers})
            .map(this.extractData)
           // .do(data => console.log(data))
            .catch(this.handleError);
	}
	
	 getPageById(id){
       var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/page/';
        return this.http.get(_resultUrl+id, { headers })
            .map(this.extractData)
            //.do(data => console.log(data))
            .catch(this.handleError);  
    }
  
  
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    
    return body.data || {};
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
   
}
