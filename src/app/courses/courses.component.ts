import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  // Kurslista från interfacet, tar en tom array
  courseList: Course[] = [];
  // filtrerad kurslista baserat på användarens sökfråga
  filteredCourses: Course[] = [];
  // variabel för söktexten från inmatning
  searchText: string = '';
  // sortering av kurslistan, code och stigande ordning
  sortField: string = 'code';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Konstruktor för import av kurser
  constructor(private coursesservice: CoursesService) {}

  // Kör ngOnInit-metoden när applikationen startar
  ngOnInit() {
    this.coursesservice.getCourses().subscribe(data => {
      this.courseList = data; // Lagrar datan i courselist
    })
  }

}
