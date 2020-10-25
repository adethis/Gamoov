import axios from 'axios'

const url = 'https://backendexample.sanbersy.com/api/data-game'

export const getGames = params => params ? axios.get(`${url}/${params}`) : axios.get(url)

export const postGames = (token, params) => 
  axios.post(url, (params), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const putGames = (token, params) => 
  axios.put(`${url}/${params.id}`, (params), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const deleteGames = (token, params) =>
  axios.delete(
    `${url}/${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );