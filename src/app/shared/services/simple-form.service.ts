import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SimpleFormService {
	baseAPIURL = "https://file.io"

	constructor(private http: HttpClient) { }

	// service for the upload image function
	uploadImage(file: any):Observable<any> {
		const formData = new FormData(); 
		formData.append("file", file, file.name);
		return this.http.post(this.baseAPIURL, formData)
	}
}
