import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './components/Movie'
import Header from './components/Header'


class App extends Component {
  constructor(props) {
    super(props);
    this.baseURL = 'https://image.tmdb.org/t/p/w92/'
    this.state = {
      error: null,
      isLoaded: false,
      movies:[],
      genres: [],      
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=73d7fe19a1d79c91745271144ecef022&language=en-US')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movies: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    
    fetch ('https://api.themoviedb.org/3/genre/movie/list?api_key=73d7fe19a1d79c91745271144ecef022&language=en-US', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((genres) => this.setState({ genres: genres.genres}))
  };

  render () {
    const { baseURL, state} = this;
    const { movies, genres} = state;
    
      return (
        // <Header/>
        <div className='movie-list'>

          {movies.map (movie => 
            <Movie key={movie.id} 
                   baseURL= {baseURL}
                   movie= {movie}
                   genres= {genres} />            
          )}

        </div>
      );
  };
};

export default App;

