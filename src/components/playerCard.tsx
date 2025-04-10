import { Grid } from '@mui/material';
import React, { FC } from 'react';
import PositionCard from './positionCard';
import Button from './Button';
import BidIcon from '../../public/svg/bid.svg';

interface PlayerProps {
  id: number;
  name: string;
  category: string;
  position: string;
  firstName?: string;
  lastName?: string;
}

interface PlayerCardProps {
  player: PlayerProps;
  size?: string;
  isSold?: boolean;
  getSinglePlayer?: () => void;
}

interface CaptianBadgeProps {
  value: string;
}

const CaptianBadge: FC<CaptianBadgeProps> = ({ value }) => (
  <div
    className={`${
      value === 'C' ? 'bg-[#6F5643]' : 'bg-[#CC6B49]'
    } text-white rounded-md w-6 h-6 flex justify-center items-center absolute bottom-2 right-2`}
  >
    {value}
  </div>
);

const PlayerCard: FC<PlayerCardProps> = ({
  player,
  size = 'small',
  isSold = false,
  getSinglePlayer
}) => {
  return (
    <Grid item xs={2.4} key={player.id}>
      <div
        className={`bg-[#FCF0E6] m-4 py-3 px-7 flex justify-start items-center rounded-lg shadow-lg flex-col relative ${
          size === 'large' ? 'w-[400px] h-[540px]' : 'w-[280px] h-[360px] '
        }`}
      >
        <div className="relative">
          <img
            src={`players/${player.id}.png`}
            alt=""
            className={`rounded-lg ${
              size === 'large' ? 'h-[320px] w-[280px]' : 'h-[210px] w-[180px]'
            } object-cover`}
          />
          {/* {player.id <= 4 && player.id > 0 && <CaptianBadge value="C" />} */}
          {/* {player.id <= 12 && player.id > 6 && <CaptianBadge value="VC" />} */}
        </div>
        {/* <div
          className={`flex text-center font-normal ${
            size === 'large' ? 'text-[32px]' : 'text-[20px]'
          } mt-2 word-break-value`}
        >
          {player.name.toUpperCase()}
        </div> */}
        <div
          className={`flex text-center font-normal ${
            size === 'large' ? 'text-[32px]' : 'text-[20px]'
          } mt-2 word-break-value`}
        >
          {player.firstName?.toUpperCase()}
        </div>
        <div
          className={`flex text-center font-normal ${
            size === 'large' ? 'text-[32px]' : 'text-[20px]'
          } word-break-value`}
        >
          {player?.lastName !== '_' && player.lastName?.toUpperCase()}
        </div>
        <PositionCard position={player.position} size={size} />
        <Button
          onClick={() => getSinglePlayer && getSinglePlayer()}
          className="rounded-lg bg-gray-300 text-amber-800 border-none absolute bottom-0 right-0"
          iconName="svg/bid.svg"
        />
        {isSold && (
          <img
            src="svg/sold.svg"
            alt=""
            className="z-4 absolute w-[240px] h-[180px] top-0 -right-12"
          />
        )}
      </div>
    </Grid>
  );
};

export default PlayerCard;
