import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    API_ENDPOINT = 'http://127.0.0.1:8000/api';
    constructor(private httpClient: HttpClient) { }
    // Retorna las peliculas desde la base de datos utilizando el index del MovieController a través de la api de laravel
    get(){
        return this.httpClient.get(this.API_ENDPOINT + '/movies');
    }
    // Guarda la película en la base de datos utilizando el método store del MovieController a través de la api de laravel
    save(movie: Movie) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post(this.API_ENDPOINT + '/movies', movie, {headers: headers});
    }
    // Actualiza el registro en la base utilizando el metodo update de MovieController
    put(movie) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.put(this.API_ENDPOINT + '/movies/' + movie.id, movie, {headers: headers});
    }

    delete(id) {
        return this.httpClient.delete(this.API_ENDPOINT + '/movies/' + id);
    }
}
