import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { IUser } from './../interfaces/IUser';
import { LoadingService } from './loading.service'; // Import LoadingService

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private searchQuerySubject = new BehaviorSubject<string>('');

  private _urlApi = "https://reqres.in/api/users"

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): BehaviorSubject<string> {
    return this.searchQuerySubject;
  }

  getAllUsers(): Observable<IUser[]> {
    this.loadingService.loadingOn(); // Indicate loading start
    return this.http.get<IUser[]>(this._urlApi)
      .pipe(
        catchError((error) => {
          throw error.message || "Server Error";
        }),
        finalize(() => {
          this.loadingService.loadingOff(); // Indicate loading end
        })
      );
  }

  getUsers(page: number): Observable<IUser[]> {
    this.loadingService.loadingOn(); // Indicate loading start
    return this.http.get<IUser[]>(`${this._urlApi}?page${page}`)
      .pipe(
        catchError((error) => {
          throw error.message || "Server Error";
        }),
        finalize(() => {
          this.loadingService.loadingOff(); // Indicate loading end
        })
      );
  }

  getUserDetails(id: number): Observable<IUser[]> {
    this.loadingService.loadingOn(); // Indicate loading start
    return this.http.get<IUser[]>(`${this._urlApi}/${id}`)
      .pipe(
        catchError((error) => {
          throw error.message || "Server Error";
        }),
        finalize(() => {
          this.loadingService.loadingOff(); // Indicate loading end
        })
      );
  }
}
