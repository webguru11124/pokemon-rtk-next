import { useState, useEffect } from 'react';
import { ALL_POKEMON } from '@/constants/pokemonSpecies';

const useFindPokemonSuggestions = (slug: string) => {
    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        if (slug.length > 0) {
            setLoading(true);
            const findSuggestions = async (query: string) => {
                const matchingPokemons = ALL_POKEMON.filter(({ name }) =>
                    name.includes(query.toLowerCase())
                ).map(({ name }) => name);
                // Artificial timeout for demonstration purposes
                await new Promise((resolve) => setTimeout(resolve, 200));
                if (isMounted) {
                    setData(matchingPokemons);
                    setLoading(false);
                }
            };

            findSuggestions(slug);
        } else {
            // Clear the data if the slug is empty
            setData([]);
        }

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { data, loading };
};

export default useFindPokemonSuggestions;
