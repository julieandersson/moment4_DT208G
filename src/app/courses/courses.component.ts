import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  // Kurslista från interfacet, tar en tom array
  courseList: Course[] = [];

  // Konstruktor för import av kurser
  constructor(private coursesservice: CoursesService) {}

  // Kör ngOnInit-metoden när applikationen startar
  ngOnInit() {
    this.coursesservice.getCourses().subscribe(data => {
      this.courseList = data; // Lagrar datan i courselist
    })
  }

}
