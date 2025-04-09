import { Categories } from './constants/categoryList';

export interface AuctionListProps {
  playerId: number;
  teamId: number;
  price: number;
}

export interface DropDownValueProps {
  id: string | number;
  value: string;
}

export interface PlayerCategoryProps {
  id: number;
  name: string;
  category: string;
  position: string;
}
