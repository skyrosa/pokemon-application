import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => c = c)
    }).then(res => {
      setLoading(false)
      setPrevPageUrl(res.data.previous)
      setNextPageUrl(res.data.next)

      const pokePromise = res.data.results.map(result =>
        axios.get(result.url, {
          cancelToken: new axios.CancelToken(c => c = c)
        })
        .then(res => ({
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default
      }))
    );

      Promise.all(pokePromise)
      .then(pokemon => setPokemon(pokemon))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

    return () => cancel
  }, [currentPageUrl]);

  if (loading) return "Loading..."

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <>
      <img src={require('./pokedex.png')} className="pokedex"/>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage: null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
    </>
  );
}

export default App;
