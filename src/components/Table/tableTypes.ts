export interface IColumn {
  name: string;
  label: string;
}

export interface IRow {
  id: number;
  full_name: string;
  city: string;
  abbreviation: string;
  conference: string;
  division: string;
  name: string;
}

export interface IMatch {
  date: string;
  home_team: IRow;
  home_team_score: number;
  id: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: IRow;
  visitor_team_score: number;
}
