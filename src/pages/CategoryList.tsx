import { Grid } from '@mui/material';
import { FC } from 'react';
import DropDown from '../components/dropDown';
import PlayerCard from '../components/playerCard';
import { Categories, CategoryList } from '../constants/categoryList';
import { DropDownValueProps, PlayerCategoryProps } from '../types';

interface CategoryListProps {
  handleClickCategory: (arg1: Categories) => void;
  getRandomItem: () => void;
  playerList: PlayerCategoryProps[];
  getSinglePlayer?: (arg: number) => void;
}

const CategoryListPage: FC<CategoryListProps> = ({
  handleClickCategory,
  getRandomItem,
  playerList,
  getSinglePlayer,
}) => {
  const getCategoryListArray = () => {
    const tempList: DropDownValueProps[] = [];
    CategoryList.map((item) =>
      tempList.push({ id: item, value: `Category ${item}` })
    );
    return tempList;
  };

  return (
    <>
      <div className="mt-24 flex justify-between items-center">
        <DropDown
          label="Category"
          values={getCategoryListArray()}
          onSelect={(value: Categories) => {
            handleClickCategory(value);
          }}
          className="mr-4"
        />
        <div
          className="bg-[#F5E6D3] z-2 cursor-pointer border-2 border-black px-10 py-2 text-lg shadow-lg start-button"
          onClick={getRandomItem}
          role="presentation"
        >
          Choose A Player
        </div>
      </div>
      <Grid container className="mt-4">
        {playerList.map((item) => (
          <PlayerCard
            player={item}
            key={item.id}
            getSinglePlayer={() => getSinglePlayer && getSinglePlayer(item.id)}
          />
        ))}
      </Grid>
    </>
  );
};

export default CategoryListPage;
