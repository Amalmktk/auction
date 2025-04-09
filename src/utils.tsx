import { teamList } from './constants/teamList';
import { AuctionListProps } from './types';

const maxBidLimit = 80;
const minPlayerBidAmount = 2;
const minPlayerCount = 11;

export const getTeamBidLimit = (completeAuctionList: AuctionListProps[]) => {
  const totalBidObj: { [key: string]: number } = {};
  const totalPlayerObj: { [key: string]: number } = {};
  const totalBudget: { [key: string]: number } = {};
  completeAuctionList.map((item) => {
    if (totalBidObj[item.teamId]) totalBidObj[item.teamId] += item.price;
    else totalBidObj[item.teamId] = item.price;
    if (totalPlayerObj[item.teamId]) totalPlayerObj[item.teamId] += 1;
    else totalPlayerObj[item.teamId] = 1;
    return null;
  });
  const auctionBalObj: { [key: string]: number } = {};
  teamList.map((item) => {
    // total budget
    const tempTotal =
      maxBidLimit - totalBidObj[item.teamId] > 0
        ? maxBidLimit - totalBidObj[item.teamId]
        : 0;
    totalBudget[item.teamId] = parseFloat(tempTotal.toFixed(2));

    if (totalPlayerObj[item.teamId] >= minPlayerCount) {
      const tempValue =
        maxBidLimit - totalBidObj[item.teamId] > 0
          ? maxBidLimit - totalBidObj[item.teamId]
          : 0;
      auctionBalObj[item.teamId] = parseFloat(tempValue.toFixed(2));
    } else {
      const tempValue =
        maxBidLimit -
        (totalBidObj[item.teamId] +
          (minPlayerCount - 1 - totalPlayerObj[item.teamId]) *
            minPlayerBidAmount);
      auctionBalObj[item.teamId] = parseFloat(tempValue.toFixed(2));
    }
    return null;
  });

  return {
    auctionBal: auctionBalObj,
    playerCount: totalPlayerObj,
    totalBudget: totalBudget,
  };
};

export const getTeamName = (teamId: number) => {
  return teamList.filter((item) => item.teamId === teamId)[0].teamName;
};

export const getTeamBGColor = (teamId: number) => {
  if (teamId === 1) return 'bg-[#FB2E01]';
  if (teamId === 2) return 'bg-[#33B0F6]';
  if (teamId === 3) return 'bg-[#4B31E8]';
  if (teamId === 4) return 'bg-[#FFE28A]';
  // if (teamId === 5) return 'bg-[#78BEA2]';
  // if (teamId === 6) return 'bg-[#2E2F32]';
};

export const getTeamLabel = (teamId: number) => {
  if (teamId === 1) return 'Duckouts';
  if (teamId === 2) return 'Whikings';
  if (teamId === 3) return 'Titans';
  if (teamId === 4) return 'Cobras';
  // if (teamId === 5) return 'Mustangs';
  // if (teamId === 6) return 'Mavericks';
};
