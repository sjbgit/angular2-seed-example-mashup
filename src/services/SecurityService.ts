import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, RequestOptionsArgs} from 'angular2/http';
import {IRole, IUser} from '../../common/interfaces/SecurityInterfaces';

@Injectable()
export class SecurityService {

	constructor(public http: Http) {
        console.log('Constructing the security service.');
	}

	getUsers() : Observable<IUser[]> {
		var result = this.http.get('/api/users')
			.map(response => {
                return response.json();
            });

		return result;
	}

    addRole(role:IRole) : Observable<IRole[]> {

        var result = this.http.post('/api/Roles', JSON.stringify(role), this.getPostOptions())
			.map(response => response.json());

		return result;
    }

	getRoles() : Observable<IRole[]> {
		var result = this.http.get('/api/Roles')
			.map(response => {
                return response.json();
            });

		return result;
	}

	getRoleMembers(roleName:string) : Observable<IUser[]> {
		var result = this.http.get(`/api/Roles/${roleName}/members`)
			.map(response => {
                return response.json();
            });

		return result;
	}

    addRoleMebers(roleName:string, ...usernames:string[]) : Observable<any> {
        var result = this.http.post(`/api/roles/${roleName}/members`,
            JSON.stringify(usernames), this.getPostOptions())
            .map(response => {
                return response.json();
            });

        return result;
    }

	getPostOptions(): RequestOptions {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		var options: RequestOptionsArgs = {
			headers: headers
		};

		return new RequestOptions(options);
	}
}
