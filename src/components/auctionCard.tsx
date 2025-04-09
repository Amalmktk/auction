import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { teamList } from '../constants/teamList';
import { getTeamBGColor, getTeamLabel, getTeamName } from '../utils';
import Button from './Button';
import PlayerCard from './playerCard';

interface PlayerProps {
  id: number;
  name: string;
  category: string;
  position: string;
}

interface BidListProps {
  teamName: string;
  bidAmount: number;
}

interface AuctionCardProps {
  onClose: () => void;
  auctionPlayer: PlayerProps;
  bidList: BidListProps[];
  addToBidList: (arg1: string, arg2: number) => void;
  onBidEnd: () => void;
  teamBidLimit: { [key: string]: number };
  playerCount: { [key: string]: number };
  totalBudget: { [key: string]: number };
  onClearLastBid: () => void;
  startBidAmount: number;
  removeFromBidList: () => void;
}

const getTeamButtonClass = (team: any) => {
  if (team.color === 'red') return 'bg-red-300 text-red-800';
  if (team.color === 'blue') return 'bg-blue-300 text-blue-800';
  if (team.color === 'purple') return 'bg-fuchsia-300 text-fuchsia-800';
  if (team.color === 'yellow') return 'bg-yellow-300 text-yellow-800';
  if (team.color === 'green') return 'bg-green-300 text-green-800';
  if (team.color === 'black') return 'bg-gray-300 text-black-800';

  return ` bg-${team.color}-300 text-${team.color}-800 `;
};

const AuctionCard: FC<AuctionCardProps> = ({
  onClose,
  auctionPlayer,
  bidList,
  addToBidList,
  onBidEnd,
  teamBidLimit,
  onClearLastBid,
  playerCount,
  totalBudget,
  startBidAmount,
  removeFromBidList,
}) => {
  const lastBid = [...bidList].reverse()[0];

  return (
    <div className=" pt-7 ml-6 mr-10">
      <div className="flex justify-between">
        <PlayerCard player={auctionPlayer} size="large" />
        <div className="w-full ml-4 mt-4">
          <div className="flex justify-between mb-10">
            {lastBid.bidAmount > 0 ? (
              <div className="bg-[#F5E6D3] bg-opacity-50 w-full mr-12 rounded-lg flex flex-col items-center">
                <div className="text-[40px]">LAST BID</div>
                <div className="text-[150px] text-[#11C790]">
                  ${lastBid.bidAmount} M
                </div>
                <div className="text-[40px]">
                  {lastBid.teamName.toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="bg-[#F5E6D3] bg-opacity-50 w-full mr-12 rounded-lg flex flex-col items-center">
                <div className="text-[40px]">Starting Bid Amount</div>
                <div className="text-[150px] text-[#11C790]">
                  ${startBidAmount} M
                </div>
              </div>
            )}

            <div className="border rounded-lg border-black p-6 flex flex-col items-center justify-center w-[800px]">
              <div className="text-xl mb-6 font-bold">AMOUNT BALANCE</div>
              {/* Start */}
              <div className="w-full flex justify-between mb-3">
                <span className="w-[100px] text-base text-center">
                  Team Name
                </span>
                <span className="w-[100px] text-base text-center">
                  Bid Limit
                </span>
                <span className="w-[100px] text-base text-center">
                  Players Count
                </span>
                <span className="w-[100px] text-base text-center">
                  Total Budget Left
                </span>
              </div>
              {/* End */}
              {teamList.map((item) => (
                <div className="w-full flex justify-between mb-3">
                  <span className="w-[100px] text-xl text-center">
                    {item.teamName.toUpperCase()}
                  </span>
                  <span className="w-[100px] text-xl text-center">
                    ${teamBidLimit[item.teamId]} M
                  </span>
                  <span className="w-[100px] text-xl text-center">
                    {playerCount[item.teamId]}
                  </span>
                  <span className="w-[100px] text-xl text-center">
                    ${totalBudget[item.teamId]} M
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex -mx-6 pt-[74px] justify-between">
            {teamList.map((item) => (
              <div
                className={` ${getTeamBGColor(
                  item.teamId
                )} text-white font-semibold text-center text-[20px] py-6 px-10 rounded-lg mx-6 cursor-pointer`}
                onClick={() => addToBidList(item.teamName, item.teamId)}
                role="presentation"
              >
                {getTeamLabel(item.teamId)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="bg-[#FFD1D1] z-2 cursor-pointer border-2 border-black px-20 py-4 text-[32px] shadow-lg start-button w-fit modalXCenter absolute mt-20"
        onClick={() => {
          onBidEnd();
          onClose();
        }}
        role="presentation"
      >
        END BID
      </div>
      <div
        className="bg-[#FFD1D1] z-2 cursor-pointer border-2 border-black text-sm shadow-lg start-button w-fit absolute right-4 bottom-4 px-2 py-1"
        onClick={removeFromBidList}
        role="presentation"
      >
        Remove Last Bid
      </div>
    </div>
  );
};

export default AuctionCard;
