import React from 'react';
import Header from "./components/navbar";
import Movie from './components/Movie'
import icons from './components/icons'
import './App.css';
import { Component } from "react";
import './components/node_modules/bootstrap/dist/css/bootstrap.min.css';
/* import { Router, Route, browserHistory } from 'react-router';
import { Switch, Redirect, Link } from 'react-router-dom'; */
//const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props)
    this.apikey = '9ebb3ffadcb7802418b60d473c655910';
    this.base = 'https://api.themoviedb.org/3/';
    this.imagebase = 'https://image.tmdb.org/t/p/w300/';
    this.state = {
      list: [],
      filteredList: [],
      searchFilter: ''
    };
  }

  componentDidMount() {
    fetch(`${this.base}movie/popular?api_key=${this.apikey}`).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ list: data.results })
    }).catch(function (error) {
      console.log(error);
    });
  };

  updateMovieSearch = (value) => {
    fetch(`${this.base}search/movie?api_key=${this.apikey}&query=${value}&include_adult=false`).then((response) => {
      return response.json();
    }).then((data) => {
      let MovieSearched = data.results
      this.setState({ list: MovieSearched })
    }).catch(function (error) {
      console.log(error);
    });
  }

  updateSearch = (value) => {
    let moviesList = this.state.list;
    let filtered = moviesList.filter((post) => {
      return !value || post.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    })
    this.setState({ searchFilter: value, filteredList: filtered })
  }


  render() {
    let moviesList = this.state.list;
    return (
      <div className="App">
        <Header onChange={this.updateMovieSearch} />
        <div>
          <ul>
            {moviesList.map(item =>
              <Movie key={item.id} title={item.title} poster_path={item.poster_path} imagebase={this.imagebase} {...item} />

            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App