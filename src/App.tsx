import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AuctionCard from './components/auctionCard';
import DropDown from './components/dropDown';
import PlayerCard from './components/playerCard';
import TeamList from './components/teamList';
import { AuctionList, UnsoldList } from './constants/auctionList';
import { Categories, CategoryList } from './constants/categoryList';
import { avatarPlayer, playerList } from './constants/playerList';
import { teamList } from './constants/teamList';
import { AuctionListProps, DropDownValueProps } from './types';
import { getTeamBidLimit, getTeamName } from './utils';
import { AiOutlineHome } from 'react-icons/ai';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import CategoryListPage from './pages/CategoryList';

const App = () => {
  const initValue = { id: 0, category: '', name: '', position: '' };
  const initBidList = { teamName: '', bidAmount: 0, teamId: 0 };
  const [category, setCategory] = useState<Categories>();
  const [auctionPlayer, setAuctionPlayer] = useState(initValue);
  const [bidList, setBidList] = useState([initBidList]);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [completeAuctionList, setCompleteAuctionList] = useState<
    AuctionListProps[]
  >([]);
  const [unSoldPlayerIds, setUnsoldPlayerIds] = useState<number[]>(UnsoldList);
  const [currentTeamId, setCurentTeamId] = useState(0);
  const [successBid, setSuccessBid] = useState<AuctionListProps>();
  const [isHomePage, setIsHomePage] = useState(true);
  const [bidStart, setBidStart] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [startRotate, setStartRotate] = useState(false);
  const [showSoldPlayers, setShowSoldPlayers] = useState<boolean>(false);
  const [showMaxBidAlert, setShowMaxBidAlert] = useState<boolean>(false);

  const showStartRotate = () => {
    setStartRotate(true);
    setTimeout(() => {
      setStartRotate(false);
    }, 5000);
  };

  const showGifImage = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
    }, 2000);
  };

  const showBidStart = () => {
    setBidStart(true);
    setTimeout(() => setBidStart(false), 5000);
    setTimeout(() => showStartRotate(), 300);
    setTimeout(() => showGifImage(), 3000);
  };

  const showSuccessModal = (
    playerId: number,
    teamId: number,
    price: number
  ) => {
    setSuccessBid({ playerId, teamId, price });
    setTimeout(() => setSuccessBid(undefined), 5000);
  };

  const getAllSoldPlayerIds = () => {
    const tempIds: number[] = [];
    completeAuctionList.map((item) => {
      tempIds.push(item.playerId);
      return null;
    });
    return tempIds;
  };

  const categoryPlayerList = () => {
    if (category === Categories.UNSOLD) {
      return playerList.filter((item) => {
        return unSoldPlayerIds.includes(item.id);
      });
    }
    const soldPlayers = getAllSoldPlayerIds();
    const allPlayers = soldPlayers.concat(unSoldPlayerIds);
    const playerListData = playerList.filter((item) => {
      return item.category === category && !allPlayers.includes(item.id);
    });
    return playerListData;
  };

  const startBidAmount = () => {
    if (category === Categories.A || category === Categories.WA) return 5;
    if (category === Categories.B || category === Categories.WB) return 3;
    else return 2;
  };

  const getRandomItem = () => {
    showBidStart();
    const player =
      categoryPlayerList()[
        Math.floor(Math.random() * categoryPlayerList().length)
      ];
    setBidAmount(startBidAmount());
    setAuctionPlayer(player);
  };

  const getSinglePlayer = (playerId: number) => {
    showBidStart();
    const player = playerList.filter((p) => p.id === playerId)[0];
    setBidAmount(2);
    setAuctionPlayer(player);
  };

  const getNewBidAmount = (value: number) => {
    if (value >= 5) return Number((value + 0.5).toFixed(2));
    if (value >= 3) return Number((value + 0.25).toFixed(2));
    return Number((value + 0.2).toFixed(2));
  };

  const addToBidList = (item: string, teamId: number) => {
    const lastBid = bidList.slice(-1)[0];
    if (lastBid.teamId === teamId) return;
    const tempList = [...bidList];
    const newBidAmount =
      tempList.length > 1 ? getNewBidAmount(bidAmount) : bidAmount;

    const teamBidLimit = getTeamBidLimit(completeAuctionList).auctionBal;
    if (teamBidLimit[teamId] < newBidAmount) {
      setShowMaxBidAlert(true);
      // alert('Max Bid Reached');
      return;
    }

    tempList.push({ teamName: item, bidAmount: newBidAmount, teamId: teamId });
    setBidAmount(newBidAmount);
    setBidList(tempList);
  };

  useEffect(() => {
    if (showMaxBidAlert) setTimeout(() => setShowMaxBidAlert(false), 2000);
  }, [showMaxBidAlert]);

  const removeFromBidList = () => {
    if (bidList.length <= 2) return;
    const tempBid = [...bidList];
    tempBid.pop();
    const lastBid = tempBid[tempBid.length - 1].bidAmount;
    setBidAmount(lastBid);
    setBidList(tempBid);
  };

  const onCloseAuction = () => {
    setAuctionPlayer(initValue);
    setBidList([initBidList]);
  };

  const onBidEnd = () => {
    const lastBid = bidList.pop();
    if (lastBid?.teamId === 0) {
      const tempList = [...unSoldPlayerIds];
      tempList.push(auctionPlayer?.id);
      setUnsoldPlayerIds(tempList);
      localStorage.setItem('unsoldPlayerList', JSON.stringify(tempList));
    } else {
      const tempList = [...completeAuctionList];
      tempList.push({
        playerId: auctionPlayer?.id,
        teamId: lastBid?.teamId || 0,
        price: lastBid?.bidAmount || 0,
      });
      setCompleteAuctionList(tempList);
      localStorage.setItem('completedAuctions', JSON.stringify(tempList));
      const tempUnsoldList = [...unSoldPlayerIds];
      setUnsoldPlayerIds(
        tempUnsoldList.filter((item) => item !== auctionPlayer?.id)
      );
      localStorage.setItem('unsoldPlayerList', JSON.stringify(tempUnsoldList));
      showSuccessModal(
        auctionPlayer?.id,
        lastBid?.teamId || 0,
        lastBid?.bidAmount || 0
      );
    }
  };

  const playerIdsInATeam = (teamId: number) => {
    const playersList = completeAuctionList.filter(
      (item) => teamId === item.teamId
    );
    const tempList: number[] = [];
    playersList.map((item) => {
      tempList.push(item.playerId);
      return null;
    });
    return tempList;
  };

  const onClearLastBid = () => {
    if (bidList?.length > 1) {
      setBidList((bidList) => bidList.slice(0, -1));
    }
  };

  const getTeamListArray = () => {
    const teamListArray: DropDownValueProps[] = [];
    teamList.map((item) => {
      teamListArray.push({ id: item.teamId, value: item.teamName });
      return null;
    });
    return teamListArray;
  };

  const handleClickCategory = (category: Categories) => {
    setCategory(category);
    setAuctionPlayer(initValue);
    setCurentTeamId(0);
  };

  const getCategoryListArray = () => {
    const tempList: DropDownValueProps[] = [];
    CategoryList.map((item) =>
      tempList.push({ id: item, value: `Category ${item}` })
    );
    return tempList;
  };

  const getPlayerById = (playerId: number) => {
    return playerList.filter((item) => item.id === successBid?.playerId)[0];
  };

  //   const soldPlayers = ()=> {
  //     const tempList = [];
  //     const soldPlayers = AuctionList.map(()=> {
  // tempList.push({player:})
  //     })
  //   }

  useEffect(() => {
    const items = localStorage.getItem('completedAuctions');
    if (items) {
      setCompleteAuctionList(JSON.parse(items));
    } else {
      setCompleteAuctionList(AuctionList);
      localStorage.setItem('completedAuctions', JSON.stringify(AuctionList));
    }

    const unsoldList = localStorage.getItem('unsoldPlayerList');
    if (unsoldList) {
      setUnsoldPlayerIds(JSON.parse(unsoldList));
    }
  }, []);

  return (
    <div className="App">
      {/* Home Page */}
      {isHomePage && (
        <HomePage
          handleClick={() => {
            setCategory(Categories.A);
            setIsHomePage(false);
          }}
        />
      )}
      {/* Nav Bar */}
      {!isHomePage && (
        <NavBar
          onClickCategory={() => {
            setCategory(Categories.A);
            setCurentTeamId(0);
            setShowSoldPlayers(false);
          }}
          onClickTeams={() => {
            setCurentTeamId(1);
            setCategory(undefined);
            setShowSoldPlayers(false);
          }}
          isTeamsActive={currentTeamId !== 0}
          isCategoryActive={!!category}
          isAuctionList={showSoldPlayers}
          onClickSoldPlayers={() => {
            setShowSoldPlayers(true);
            setCurentTeamId(0);
            setCategory(undefined);
          }}
        />
      )}
      {/* CategoryListPage */}
      <div className="mx-10 mt-[70px]">
        {!!category && auctionPlayer?.id === 0 && !successBid?.playerId && (
          <CategoryListPage
            handleClickCategory={(value) => handleClickCategory(value)}
            getRandomItem={getRandomItem}
            playerList={categoryPlayerList()}
            getSinglePlayer={(playerId: number) => getSinglePlayer(playerId)}
          />
        )}
      </div>
      {/* Auction Page */}
      {!bidStart && auctionPlayer?.id > 0 && (
        <AuctionCard
          onClose={onCloseAuction}
          auctionPlayer={auctionPlayer}
          bidList={bidList}
          addToBidList={(value: string, id: number) => {
            addToBidList(value, id);
          }}
          removeFromBidList={removeFromBidList}
          onBidEnd={onBidEnd}
          teamBidLimit={getTeamBidLimit(completeAuctionList).auctionBal}
          playerCount={getTeamBidLimit(completeAuctionList).playerCount}
          totalBudget={getTeamBidLimit(completeAuctionList).totalBudget}
          onClearLastBid={onClearLastBid}
          startBidAmount={startBidAmount()}
        />
      )}
      {/* bid Success Page */}
      {successBid?.playerId && (
        <div className="mt-24 flex items-center w-full justify-center">
          <PlayerCard
            player={getPlayerById(successBid?.playerId)}
            size="large"
            isSold={true}
          />
          <div className="fixed bottom-24 flex justify-center flex-col items-center">
            <div className="text-[50px]">TO</div>
            <div className="text-[50px]">
              {getTeamName(successBid?.teamId).toUpperCase()}
            </div>
          </div>
        </div>
      )}
      {/* Team List Page */}
      {currentTeamId !== 0 && (
        <TeamList
          playerIds={playerIdsInATeam(currentTeamId)}
          teamName={getTeamName(currentTeamId)}
          handleClickTeam={(value: number) => setCurentTeamId(value)}
          bidBalance={
            getTeamBidLimit(completeAuctionList).totalBudget[currentTeamId]
          }
        />
      )}

      {/* Bid Strat UI */}
      {bidStart && (
        <div className="bg-repeat">
          {showGif && (
            <img
              src="main/celeb.gif"
              alt="gif"
              className="absolute w-full h-full z-10"
            />
          )}
          <div className="flip-card flex mt-32">
            <div
              className={`flip-card-inner ${
                startRotate && 'flip-card-inner-rotate'
              } w-full flex justify-center rotate-inner-card`}
            >
              <div className="empty-player-card">
                <PlayerCard player={avatarPlayer} size="large" />
              </div>
              <div className="filled-player-card">
                <PlayerCard player={auctionPlayer} size="large" />
              </div>
            </div>
          </div>
        </div>
      )}
      {showMaxBidAlert && (
        <div className="bg-yellow-400 text-red-600 text-lg font-medium px-8 py-4 rounded-md fixed top-20 w-fit z-20 left-1/2 -translate-x-1/2">
          Max Bid Reached
        </div>
      )}
    </div>
  );
};

export default App;
