import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from '../interfaces/movie';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    movies: Movie[];
    constructor(private movieservice: MoviesService) {
        this.getMovies();
    }

    getMovies() {
        this.movieservice.get().subscribe((data: Movie[]) => {
            this.movies = data;
        }, (error) => {
            console.log('error: ', error);
            alert('errorr');
        });
    }
    ngOnInit() {
    }
    delete(id) {
        if (confirm('¿Confirma que desea eliminar la película?')) {
            this.movieservice.delete(id).subscribe((data) => {
                alert('Película eliminada');
                console.log('data:', data);
                this.getMovies();
            }, (error) => {
                alert('error al eliminar');
                console.log('Error:', error);
            });
        }
    }
}
