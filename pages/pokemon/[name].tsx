import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import PokemonDetailsPage from '@/components/pages/PokemonDetails';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import MyBeatLoader from '@/components/UI/molecules/BeatLoader';
import Title from '@/components/UI/atoms/Title';
import Container from '@/components/UI/atoms/Container';
import Link from 'next/link';
import Text from '@/components/UI/atoms/Text';
import { pokemonApi, useGetPokemonByNameQuery } from '@/api';
import { PokemonData } from '@/lib/types';

const PokemonDetails: FC = (): JSX.Element => {
  const router = useRouter();
  const pokemonName =
    typeof router.query?.name === 'string' ? router.query.name : '';

  const {
    isSuccess: pokemonIsSuccess,
    data: pokemonDetails,
    isLoading,
    isFetching,
    isError: pokemonIsError,
  } = useGetPokemonByNameQuery(pokemonName);

  if (isLoading || isFetching) {
    return (
      <Container page="spinner">
        <MyBeatLoader loading={pokemonIsSuccess} />
      </Container>
    );
  }

  if (pokemonIsError) {
    return (
      <Container page="spinner">
        <Link href={'/'}>
          <Text
            textStyle={'textParagraph'}
            css={{
              color: '$seafoamDark',
              marginTop: '$4',
              marginBottom: '$8',
            }}
          >
            <strong>&lt; Back</strong>
          </Text>
        </Link>
        <Title>We couldn&apos;t find your pokemon </Title>
        <div
          style={{ textAlign: 'center', margin: '0 auto' }}
          role="img"
          aria-label="sad"
        >
          😢
        </div>
      </Container>
    );
  }

  if (pokemonIsSuccess) {
    return <PokemonDetailsPage pokemon={pokemonDetails as unknown as PokemonData} />;
  }

  return <></>;
};

export default PokemonDetails;

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context.params?.name as string;

  // // Fetch the data using RTK Query
  // try {
  //   // Fetch the data using RTK Query and await the result
  //   const { data } = await pokemonApi.endpoints.getPokemonByName.useQuery(name);

  //   return {
  //     props: {
  //       // Pass the fetched data as props to the page component
  //       pokemonData: data,
  //     },
  //   };
  // } catch (error) {
  //   // Handle errors if necessary
  //   console.error('Error fetching data:', error);
  return {
    props: {
      pokemonData: null, // You can handle this error case in your page component
    },
    //   };
  }
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
