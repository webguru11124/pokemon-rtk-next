import PokemonList, { GenericItem } from "@/lib/types";
import mapListResults from "@/utils/mapPokemonPaginatedResults";
import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  Pokemon,
  PokemonDetails,
  PokemonResponse,
  PokemonSpiecesResponse,
} from "./pokemon.types";
const FETCH_LIMIT = 9;
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "/pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2",
  }),
  tagTypes: ["Pokemons"],
  endpoints: (builder) => ({
    getAllPokemons: builder.query<GenericItem[], number>({
      query(page) {
        return `pokemon?offset=${page}&limit=${FETCH_LIMIT}`;
      },
      providesTags: ["Pokemons"],
      transformResponse: (
        response: { results: PokemonResponse },
        meta,
        arg
      ): GenericItem[] => {
        const extendedResponse = mapListResults(response.results);

        return extendedResponse;
      },
    }),
    getPokemonByName: builder.query<PokemonDetails, string>({
      query: (name) => {
        return `pokemon/${name}`;
      },
      async onQueryStarted(name: string, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }): Promise<void> {
        try {
          const { data: pokemonDetails } = await queryFulfilled;
          const patchResult = dispatch(
            pokemonApi.util.updateQueryData("getAllPokemons", 0, (draft) => {
              const results = draft.filter(
                (entry) => entry.name === pokemonDetails?.name
              );
              const type = {
                types: pokemonDetails.types,
              };
              Object.assign(results[0], type);
            })
          );
        } catch { }
      },
    }),
    getPokemonSpieces: builder.query<PokemonSpiecesResponse, string>({
      query: (name) => {
        return `pokemon-species/${name}`;
      },
    }),
  }),
});

export const {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpiecesQuery,
} = pokemonApi;
