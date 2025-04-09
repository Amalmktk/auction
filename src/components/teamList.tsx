import { Grid } from '@mui/material';
import { FC } from 'react';
import { playerList } from '../constants/playerList';
import { teamList } from '../constants/teamList';
import { DropDownValueProps } from '../types';
import DropDown from './dropDown';
import PlayerCard from './playerCard';

interface TeamListProps {
  playerIds: number[];
  teamName: string;
  handleClickTeam: (arg: number) => void;
  bidBalance: number;
}

const TeamList: FC<TeamListProps> = ({
  playerIds,
  teamName,
  handleClickTeam,
  bidBalance,
}) => {
  const players = playerList.filter((item) => playerIds.includes(item.id));

  const getTeamListArray = () => {
    const teamListArray: DropDownValueProps[] = [];
    teamList.map((item) => {
      teamListArray.push({ id: item.teamId, value: item.teamName });
      return null;
    });
    return teamListArray;
  };

  return (
    <div className="mt-24 mx-12">
      <div className="flex justify-between items-center">
        <DropDown
          label={teamList[0].teamName}
          values={getTeamListArray()}
          onSelect={(value: number) => {
            handleClickTeam(value);
          }}
          className="mr-4"
        />
        <div className="bg-[#F5E6D3] bg-opacity-50 px-4 py-2 rounded-lg text-center">
          <span className="mr-12 text-lg font-bold">
            TOTAL PLAYERS
            <span className="text-[#5E5E5E] ml-2">{playerIds.length}</span>
          </span>
          <span className="text-lg font-bold">
            BID AMOUNT BALANCE
            <span className="text-[#5E5E5E] ml-2">${bidBalance} M</span>
          </span>
        </div>
      </div>
      <Grid container className="mt-4">
        {players.map((item) => (
          <PlayerCard player={item} key={item.id} />
        ))}
      </Grid>
    </div>
  );

  return (
    <div className="fixed w-screen h-screen bg-white z-20 top-12 left-0 mt-10">
      <div className="flex justify-center text-5xl">{teamName}</div>
      <Grid container className="mt-20">
        {players.map((item) => (
          <PlayerCard player={item} key={item.id} />
        ))}
      </Grid>
    </div>
  );
};

export default TeamList;
