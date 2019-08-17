import { Component, OnInit } from '@angular/core';
import {Movie} from '../interfaces/movie';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    movie: Movie = {
        name: null,
        description: null,
        year: null,
        duration: null,
        gender: null
    };
    id: any;
    editing: boolean = false;
    movies: Movie[];
    constructor(private movieService: MoviesService, private activatedRoute: ActivatedRoute) {
        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.editing = true;
            this.movieService.get().subscribe((data: Movie[]) => {
                console.log('data: ', data);
                this.movies = data;
                this.movie = this.movies.find((m) => { return m.id == this.id; });
                console.log('this.movie: ', this.movie);
            }, (error) => {
                alert('error');
            });
        } else {
            this.editing = false;
        }
        console.log(this.id);
    }

    ngOnInit() {
    }

    saveMovie() {
        if (this.editing) {
            this.movieService.put(this.movie).subscribe((data) => {
                alert('Película actualizada');
                console.log('data: ', data);
            }, (error) => {
                console.log('error: ', error);
                alert('error');
            });
        } else {
            this.movieService.save(this.movie).subscribe((data) => {
                alert('Película guardada');
                console.log('data: ', data);
            }, (error) => {
                console.log('error: ', error);
                alert('error');
            });
        }
    }

}
