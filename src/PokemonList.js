import React, {useState} from 'react'
export default function PokemonList({ pokemon }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextClick = () => {
        if (currentIndex < pokemon.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div>
        {pokemon[currentIndex] && (
            <div key={pokemon[currentIndex].id}>
                <img src={pokemon[currentIndex].image} alt={pokemon[currentIndex].name} />
                {pokemon[currentIndex].id}- {pokemon[currentIndex].name}
            </div>
        )}
            <button onClick={handlePrevClick}>Prev</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
}