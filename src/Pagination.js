import React from 'react'
import PokemonList from './PokemonList';

export default function Pagination({handlePrevClick, handleNextClick}) {
    return (
        <div className='buttons'>
            {handlePrevClick && <button onClick={handlePrevClick}>Previous</button>}
            {handleNextClick && <button onClick={handleNextClick}>Next</button>}
        </div>
    )
}
