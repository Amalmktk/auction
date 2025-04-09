import { FC } from 'react';

interface HomePageProps {
  handleClick: () => void;
}
const HomePage: FC<HomePageProps> = ({ handleClick }) => {
  return (
    <div className="fixed w-screen h-screen bg-white z-50 top-0 left-0">
      <img
        src="main/home.svg"
        alt=""
        className="w-full h-full right-0 absolute object-cover"
      />
      <div className="flex flex-col items-center justify-center w-1/2 relative h-full ">
        <img src="svg/kvlogo.svg" alt="logo" className="w-[294px] h-[110px]" />
        <div className="text-[102px] my-8">AUCTION</div>
        <div
          className="bg-[#F5E6D3] cursor-pointer border-2 border-black px-20 py-4 text-[52px] shadow-lg start-button"
          onClick={handleClick}
          role="presentation"
        >
          START
        </div>
      </div>
    </div>
  );
};

export default HomePage;
