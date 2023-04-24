import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let cancel
    const allPokemon = []

    const fetchData = (url) => {
      axios.get(url, {
        cancelToken: new axios.CancelToken(c => c = c)
      }).then(res => {
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
        .then(pokemon => {
          allPokemon.push(...pokemon)
          if (res.data.next) {
            fetchData(res.data.next)
          } else {
            setPokemon(allPokemon)
          }
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    }

    fetchData(currentPageUrl)

    return () => cancel
  }, [currentPageUrl]);

  function gotoNextPage() {
    if(nextPageUrl){
      setCurrentPageUrl(nextPageUrl);
    }
  }

  function gotoPrevPage() {
    if(prevPageUrl){
      setCurrentPageUrl(prevPageUrl)
    }
  }

  function handleSearch(event) {
    const searchQuery = event.target.value.toLowerCase()
    if (isNaN(searchQuery)) {
      setSearchQuery(searchQuery)
    } else {
      const filteredPokemon = pokemon.filter(p => p.id === parseInt(searchQuery))
      setPokemon(filteredPokemon)
      setSearchQuery('');
    }
  }

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className='bg'>
      <PokemonList pokemon={filteredPokemon}
      currentIndex={currentIndex} 
      handleNextClick={() => setCurrentIndex(currentIndex + 1)} 
      handlePrevClick={() => setCurrentIndex(currentIndex - 1)} 
      handleSearch={handleSearch} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage: null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
    </div>
  );
}

export default App;
