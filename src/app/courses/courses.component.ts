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
  sortField: keyof Course = 'code'; // använder keyof Course för att inkludera giltiga fält från Course (code, coursename, progression, syllabus)
  sortDirection: 'asc' | 'desc' = 'asc';

  // Konstruktor för import av kurser
  constructor(private coursesservice: CoursesService) {}

  // Kör ngOnInit-metoden när applikationen startar
  ngOnInit() {
    this.coursesservice.getCourses().subscribe(data => {
      this.courseList = data; // Lagrar datan i courselist
      this.filteredCourses = data;
    });
  }

  // Metod för att filtrera baserat på söktext
  filterCourses() {
    this.filteredCourses = this.courseList.filter(course =>
      // Kontrollera så att kurskoden eller kursnamnet innehåller söktexten
      course.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.coursename.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.sortCourses(); // Sorterar efter filtrering
  }

  // Sorterar listan med filtrerade kurser
  sortCourses() {
    this.filteredCourses.sort((a, b) => {
      // Hämtar det fält som ska användas för sortering, undviker skiftlägeskänslighet genom att använda små bokstäver
      const fieldA = a[this.sortField].toLowerCase();
      const fieldB = b[this.sortField].toLowerCase();

      if (fieldA < fieldB) return this.sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Metod för att sätta sorteringsfält och vända sorteringsordning
  setSortField(field: keyof Course) {
    // Om det valda sorteringsfältet redan är det aktuella fältet
    if (this.sortField === field) {
      // Vänd sorteringsordningen: om vi var i stigande (asc), byt till fallande (desc) och vice versa
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      // Sätt sorteringsordningen till stigande (asc) som standard
      this.sortDirection = 'asc';
    }
    this.sortCourses();
  }
}