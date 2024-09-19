import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url: string = "https://webbutveckling.miun.se/files/ramschema_ht23.json";

  
  constructor() { }
}
