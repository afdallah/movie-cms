//import axios from 'axios'
//const token = process.env.REACT_APP_TOKEN
//const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY

class Api {
  static getMovieImage(path) {
    return `https://image.tmdb.org/t/p/original/${path}`
  }
}

export default Api
