import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../model/category';
import { API_CONFIG } from '../config/api_config';


@Injectable()
export class CategoryService {
    url = API_CONFIG.urlApi
  constructor(private http: HttpClient) {}
  save (category: Category) : Observable<Category[]> {
    return this.http.post<Category[]>(this.url+'/category/insert', category);
  }

  list() : Observable<Category[]>{
  return this.http.get<Category[]>(this.url+'/category/list');
}

  delete(idCategory:any) : Observable<Category[]>{
  return this.http.delete<Category[]>(`${this.url}/category/delete/${idCategory}`);
}

  findById(idCategory: any): Observable<Category> {
  return this.http.get<any>(`${this.url}/category/findCategory/${idCategory}`);
}

  update(category: Category) : Observable<Category>{
    return this.http.put<Category>(this.url+'/category/update', category);
  }
}