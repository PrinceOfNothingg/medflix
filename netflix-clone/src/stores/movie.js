import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: null,
    showFullVideo: false,
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    videoUrl: null,
  }),
  actions: {
    async fetchMovies() {
      try {
        const popularResponse = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '3ce788b8d91731192cb0a610b7f2a89d',
            language: 'en-US',
            page: 1
          }
        })
        this.popularMovies = popularResponse.data.results

        const topRatedResponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
          params: {
            api_key: '3ce788b8d91731192cb0a610b7f2a89d',
            language: 'en-US',
            page: 1
          }
        })
        this.topRatedMovies = topRatedResponse.data.results

        const upcomingResponse = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          params: {
            api_key: '3ce788b8d91731192cb0a610b7f2a89d',
            language: 'en-US',
            page: 1
          }
        })
        this.upcomingMovies = upcomingResponse.data.results

      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
    async fetchMovieDetails(movieId) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: '3ce788b8d91731192cb0a610b7f2a89d',
            language: 'en-US'
          }
        })
        this.movie = response.data

        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          params: {
            api_key: '3ce788b8d91731192cb0a610b7f2a89d',
            language: 'en-US'
          }
        })
        const video = videoResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
        this.videoUrl = video ? `https://www.youtube.com/embed/${video.key}` : null
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }
  }
})
