import React from "react";
import icons from './icons'
import { Component } from "react";

export default class Movie extends Component {
    constructor(props) {
        super(props)
        this.apikey = '9ebb3ffadcb7802418b60d473c655910';
        this.base = 'https://api.themoviedb.org/3/';
        this.state = {
            genres: [],
            list: [],
            watched: false,
            favorite: false,
            queue: false
        }
    }
    componentDidMount() {
        fetch(`${this.base}movie/popular?api_key=${this.apikey}`).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ list: data.results })
        }).catch(function (error) {
            console.log(error);
        });

        fetch(`${this.base}genre/movie/list?api_key=${this.apikey}`).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({ genres: data.genres })
        }).catch(function (error) {
            console.log(error);
        });
    };

    //({ title, poster_path, imagebase, watched, favorite, queue, onPress, ...rest })
    render() {
        const { state } = this;
        const { watched, favorite, queue, genres, list } = state;
        const { title, imagebase, poster_path, genre_ids } = this.props

        let filteredTerms = genres.filter((data) =>{
            return genre_ids.includes(data.id)
        })
       
        return (
            <li>
                <a href={`#${title}`}><img src={`${imagebase}${poster_path}`
                    || 'https://es.zenit.org/wp-content/uploads/2018/05/no-image-icon.png'}
                    alt={title} />
                </a>
                <div class="auto row">{filteredTerms.map((post) => <p>{post.name} </p>)}</div>
                <div class="container">
                    <h5>
                        <div class="row">
                            <div class="col">
                                <a href={`#${title}`}>{title}</a>
                            </div>
                            <div class="col col-lg-auto row">
                                <div onClick={() => this.setState({ watched: !watched })}>{watched ? icons.eyeFill : icons.eye}</div>
                                <div onClick={() => this.setState({ favorite: !favorite })}>{favorite ? icons.heartFill : icons.heart}</div>
                                <div onClick={() => this.setState({ queue: !queue })}>{queue ? icons.clockFill : icons.clock}</div>
                            </div>                            
                        </div>
                    </h5>                    
                </div>
            </li >
        );
    }
}