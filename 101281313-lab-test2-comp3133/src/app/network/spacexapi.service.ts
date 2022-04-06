import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  private REST_API_SERVER = "https://api.spacexdata.com/v3/launches"

  //shared: any

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = "Unkown error!";
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`
    }
    else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
