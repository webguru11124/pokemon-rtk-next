import React, { FC } from 'react';
// import { useFetchPokemonWithInfinityScroll } from '../hooks/usePokemon';
import HomePage from '@/components/pages/HomePage';
import MyBeatLoader from '@/components/UI/molecules/BeatLoader';
import useFetchNextPage from '../hooks/useFetchNextPage';
import Container from '@/components/UI/atoms/Container';
import { useGetAllPokemonsQuery } from '@/api';
import PokemonList, { GenericItem } from '@/lib/types';

const IndexPage: FC = (): JSX.Element => {
  const { data, isLoading, isSuccess, isFetching, } = useGetAllPokemonsQuery(0);

  // useFetchNextPage(hasNextPage, fetchNextPage);

  if (isLoading) {
    return (
      <Container page="spinner">
        <MyBeatLoader loading={isLoading} />
      </Container>
    );
  }

  if (isSuccess) {
    return <HomePage pokemonList={data as GenericItem[]} />;
  }

  return <></>;
};

export default IndexPage;
