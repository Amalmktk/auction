import { FC } from 'react';

interface PositionCardProps {
  position: string;
  size: string;
}

const getIcon = (position: string) => {
  switch (position) {
    case 'Batter':
      return <img src="svg/batter.svg" alt="logo" className="h-6 w-6" />;
    case 'Bowler':
      return <img src="svg/baller.svg" alt="logo" className="h-6 w-6" />;
    case 'Batter, Bowler':
      return <img src="svg/allrounder.svg" alt="logo" className="h-6 w-6" />;
    default:
      <div></div>;
  }
};

const PositionCard: FC<PositionCardProps> = ({ position, size }) => {
  const positionList = position.replaceAll(' ', '').split(',');
  return (
    <div className="mt-4 mb-2 flex gap-2">
      {getIcon(position)}
      {positionList.map((item: string) => {
        return (
          <div key={item}>
            {item === 'Batter' && (
              <div
                className={`bg-[#FFBF00] ${
                  size === 'large' ? 'px-5 py-2.5' : 'p-1'
                } rounded-md text-[#CC5500]`}
              >
                BATTER
              </div>
            )}
            {item === 'Bowler' && (
              <div
                className={`bg-[#D8BFD8] ${
                  size === 'large' ? 'px-5 py-2.5' : 'p-1'
                } rounded-md text-[#6A0DAD]`}
              >
                BOWLER
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PositionCard;
