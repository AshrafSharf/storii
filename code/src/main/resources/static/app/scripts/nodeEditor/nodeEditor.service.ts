import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Injectable()
export class NodeEditorService {
    constructor(private http: Http, private httpClient: HttpClient, private _authenticationService: AuthenticationService) { }

    reorderNodes(id1,id2){
          var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/page/'+id1+"/swapWith/"+id2;
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
    }
    
     reorderBranches(id1,id2){
          var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/page/'+id1+"/swapWithBranch/"+id2;
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
    }
    
    appendBranch(id1,id2){
          var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/page/'+id1+"/appendToBranch/"+id2;
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
    }
    
    getChildren(id){
          var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/page/'+id+"/getAllOutgoing/";
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
    }
    
    addNewNode(storyID,selectedID,level,position){
        var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }
        var _resultUrl = '/story/'+storyID+'/addPage/'+selectedID;
        return this.http.post(_resultUrl, JSON.stringify({ "title": "defaultTitle" ,"description": "defaultDescription" ,"level": level,"position":position,"serializedContent": ""}),{ headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
        
    }
    
    deletePageById(id){
        var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }
       // var _resultUrl = '/page/'+id;
      //  return this.http.delete(_resultUrl,{ headers })
         var _resultUrl = '/page/'+id+'/deleteSingle';
         return this.http.get(_resultUrl,{ headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);  
        
    }
    
    deleteBranch(id){
        var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }
        var _resultUrl = '/page/'+id+'/deleteBranch';
        return this.http.get(_resultUrl,{ headers })
            .map(this.extractData)
            .do(data => console.log(data))
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
            .do(data => console.log(data))
            .catch(this.handleError);  
    }
    
    
    startDrawLines(id) {
        var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/story/' + id + '/getMaxLevel';
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    startDrawNodes(id) {
        var headers = new Headers();
        if (this._authenticationService.isLoggedIn()) {
            headers = this.httpClient.createHeader(headers);
            headers.append('Content-Type', 'application/json');
        } else {
            headers.delete('Authorization');
            headers.append('Authorization', "");
        }

        var _resultUrl = '/story/' + id + '/getPages';
        return this.http.get(_resultUrl, { headers })
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
