import { FC } from 'react';

interface NavBarProps {
  onClickCategory: () => void;
  onClickTeams: () => void;
  isCategoryActive: boolean;
  isTeamsActive: boolean;
  isAuctionList: boolean;
  onClickSoldPlayers: () => void;
}

const NavBar: FC<NavBarProps> = ({
  onClickCategory,
  onClickTeams,
  isCategoryActive,
  isTeamsActive,
  isAuctionList,
  onClickSoldPlayers,
}) => {
  return (
    <div className="fixed flex top-0 w-full bg-white z-[100] h-[70px] justify-between px-10 py-4 text-lg font-semibold items-center shadow">
      <div>
        <img src="svg/kvlogo.svg" alt="logo" className='w-[140px] h-[60px]' />
      </div>
      <div className="flex">
        <div
          className={`${
            isCategoryActive ? 'border-b-2 border-black' : 'text-gray-500'
          } p-2 cursor-pointer`}
          onClick={onClickCategory}
          role="presentation"
        >
          CATEGORY
        </div>
        <div
          className={`${
            isTeamsActive ? 'border-b-2 border-black' : 'text-gray-500'
          } p-2 cursor-pointer`}
          onClick={onClickTeams}
          role="presentation"
        >
          TEAMS
        </div>
        {/* <div
          className={`${
            isAuctionList ? 'border-b-2 border-black' : 'text-gray-500'
          } p-2 cursor-pointer`}
          onClick={onClickSoldPlayers}
          role="presentation"
        >
          Unsold Players
        </div> */}
      </div>
      <div className="text-[#F40F0F] cursor-pointer">EXIT</div>
    </div>
  );
};

export default NavBar;
