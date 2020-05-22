import React, { Component } from 'react';
import './App.css';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from '.components/Movie'

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      movies:[],
      genres: [],
      baseURL: 'https://image.tmdb.org/t/p/w92/'
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

  filteredResults = (genreID) =>
  this.state.genres.filter((genre) => {
    return this.genreID.includes(genre.id);
  }) 

  render () {
    const { error, isLoaded, movies, baseURL, genres} = this.state;

    // const filteredResults = () => {
    // genres.filter((genre) => {
    //   return genreID.includes(genre.id);
    //   })
    // }

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className='movie-list'>
    
          
          {movies.map (movie => (
            <div className='container' key={movie.id}>
                
                <img className='posters'
                      src={`${baseURL}${movie.poster_path}`} 
                      alt=''/>

              <div className='text-container'>

                <h1>{movie.title}</h1>

                {movie.genre_ids.map ((genreID) => (
                  <Badge pill variant="info">{this.filteredResults(genreID)}</Badge>
                ))}
              </div>
              <div className='text-reviews'>
                <h3>Score</h3>
                <h1>{movie.vote_average}</h1>
                <h5>{`${movie.vote_count} votes`}</h5>
                </div>

            </div>
          ))}

        </div>
      );
    }
  };
};

export default Movies;

