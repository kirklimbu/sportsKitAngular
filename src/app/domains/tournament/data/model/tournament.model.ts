import { IPlace1Dto } from 'src/app/domains/famous-places/data/model/famous-places';

export interface ITeamRegistrationFormDtoWrapper {
  form: ITournament2Dto;
  placeList: IPlace1Dto[];
  genderList: IReference1Dto[];
}

export interface IReference1Dto {
  id: number;
  type: string;
  name: string;
}

export interface ITournament2Dto {
  teamId: number;
  tournamentId: number;
  teamName: string;
  playerOneId: number;
  playerOneGenderId: number;
  playerOneName: string;
  playerOneMobile: string;
  playerOnePlaceId: number;
  playerOneDobBs: string;
  playerTwoId: number;
  playerTwoName: string;
  playerTwoGenderId: number;
  playerTwoMobile: string;
  playerTwoPlaceId: number;
  playerTwoDobBs: string;
  address: string;
  hasPaid: boolean;
}
export interface ITournament {
  tournamentId: number;
  tournamentType: string;
  title: string;
  entryFee: number;
  fromDate: string;
  toDate: string;
  location: string;
  gameCount: number;
}

export interface IGame2DTO {
  gameId: number;
  tournamentId: number;
  gameName: string;
  teamOneId: number;
  teamOnePlayerOneId: number;
  teamOnePlayerTwoId: number;
  teamOnePlayerOne: string;
  teamOnePlayerTwo: string;
  teamTwoId: number;
  teamTwoPlayerOneId: number;
  teamTwoPlayerTwoId: number;
  teamTwoPlayerOne: string;
  teamTwoPlayerTwo: string;
  winnerTeamId: number;
  round: number;
  status: string;
  umpireId: number;
  umpireName: string;
}

export interface ITeam {
  tournamentId: number;
  playerOneId: number;
  playerOneName: string;
  playerTwoId: number;
  playerTwoName: string;
  address: string;
  hasPaid: boolean;
}
export interface ITeam3Dto {
  teamId: number;
  tournamentId: number;
  playerOneId: number;
  playerOne: string;
  playerOneGender: string;
  playerTwoId: number;
  playerTwo: string;
  playerTwoGender: string;
  address: string;
  seed: string;
  name: string;
  status: string;
}


export const genderMap: Record<string, string> = {
  Male: 'M',
  Female: 'F',
  'Non-binary': 'NB',
  'Prefer not to say': 'N/A',
  'Other': 'O'
};