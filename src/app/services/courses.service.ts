import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private url (egenskap), typ string
  private url: string = "https://webbutveckling.miun.se/files/ramschema_ht23.json";


  constructor(private http: HttpClient) { } // Läser in HttpClient

  getCourses(): Observable<Course[]> { // Hämtar kurser genom att ta emot en array av kurser enligt interfacet

    return this.http.get<Course[]>(this.url); // returnerar data från url från getCourses
  }
}
