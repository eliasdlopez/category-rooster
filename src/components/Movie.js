import React from 'react';
import '../App.css';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';



// class Movies extends Component {
//   constructor(props) {
//     super(props);

export default function Movie({ movie, baseURL, genres  }) {
 
  const { title, poster_path, genre_ids } = movie;

  const filteredResults = genres.filter((genre) => {
    return genre_ids.includes(genre.id);
  });

  return (
    <div className='container' key={movie.id}>
      <img className='posters'
        src={`${baseURL}${poster_path}`}
        alt='' />
      <div className='text-container'>
        <a href={`#${title}`}><h1>{title}</h1></a>
        {filteredResults.map((genre) => (
          <Badge pill variant="info">{genre.name}</Badge>
        ))}
      </div>
      <div className='text-reviews'>
        <h3>Score</h3>
        <h1>{movie.vote_average}</h1>
        <h5>{`${movie.vote_count} votes`}</h5>
      </div>
    </div>
  )
}