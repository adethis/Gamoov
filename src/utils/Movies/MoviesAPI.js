import axios from 'axios'

const url = 'https://backendexample.sanbersy.com/api/data-movie'

export const getMovies = params => params ? axios.get(`${url}/${params}`) : axios.get(url)

export const postMovies = (token, params) => 
  axios.post(url, (params), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const putMovies = (token, params) => 
  axios.put(`${url}/${params.id}`, (params), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const deleteMovies = (token, params) =>
  axios.delete(
    `${url}/${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );