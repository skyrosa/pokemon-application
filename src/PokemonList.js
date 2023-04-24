import React, { useState } from 'react'
export default function PokemonList({ pokemon, currentIndex, handleNextClick, handlePrevClick, handleSubmit, handleChange, searchTerm, handleSearch, searchQuery }) {

    return (
        <div className='main'>
            {pokemon.length > 0 && pokemon[currentIndex] && (
                <div className="pokedex-container">
                    <img src={pokemon[currentIndex].image} alt={pokemon[currentIndex].name} className='image' />
                    <div className='data'>{pokemon[currentIndex].id} - {pokemon[currentIndex].name} </div>
                    <form onSubmit={handleSubmit} className='form'>
                        <input type="text" placeholder="Search by name or ID" onChange={handleSearch}/>
                        <button type="submit">OK</button>
                    </form>
                    <div className='buttons'>
                        <button onClick={handlePrevClick} className='p-button'>Prev &lt;</button>
                        <button onClick={handleNextClick} className='n-button'>Next &gt;</button>
                    </div>
                </div>
            )}
        </div>
    );
}