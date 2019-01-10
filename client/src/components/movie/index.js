import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
// import logo from './logo.svg'
// import Navigation from './components/navigation'

class MovieList extends Component {
  render() {
    return (
      <div>
        {this.props.movies &&
          this.props.movies.map(m => (
            <article key={`${m.title}`}>
              <a
                href="https://geo.itunes.apple.com/us/movie/primer/id536457427?at=1l3vqFJ&ct=1l3vqFJ&mt=6"
                className="fl w-25 w-25-l link overflow-hidden">
                <div
                  role="img"
                  aria-label="Primer movie"
                  className="grow aspect-ratio--4x6 "
                  style={{
                    background: `url(${m.image_url}) no-repeat center center`,
                    backgroundSize: 'cover',
                  }}
                />
              </a>
            </article>
          ))}
      </div>

      //   <Fragment>{this.props.movies && this.props.movies.map(m => <img key={m.title} src={m.image_url} />)}</Fragment>
    )
  }
}

export default MovieList
