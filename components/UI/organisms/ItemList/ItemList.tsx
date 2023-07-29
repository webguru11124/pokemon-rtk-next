import React, { FC } from 'react';
// import { InfiniteData } from '@tanstack/react-query';
import Card from '../Card';
import PokemonList, { GenericItem } from '@/lib/types';
import { styled } from '@/stitches.config';

interface Props {
  list: Array<GenericItem>;
  titleKey: keyof GenericItem;
  imgSrcKey: keyof GenericItem;
  imgAltKey: keyof GenericItem;
  linkPathKey: keyof GenericItem;
}

const GridContainer = styled('div', {
  width: '$w100',
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax($cardWidthBp1, $cardWidthBp3))`,
  gap: '$6',
  justifyItems: 'center',
  justifyContent: 'center',
  padding: '0 $4',
});

const ItemList: FC<Props> = ({
  list,
  imgSrcKey,
  titleKey,
  imgAltKey,
  linkPathKey,
}) => {
  return (
    <GridContainer>
      {list.map((item: GenericItem) =>
        <Card
          key={item[titleKey]}
          size={'large'}
          imgSrc={item[imgSrcKey]}
          imgAlt={item[imgAltKey]}
          title={item[titleKey]}
          linkPath={item[linkPathKey]}
        />
      )}
    </GridContainer>
  );
};

export default ItemList;
