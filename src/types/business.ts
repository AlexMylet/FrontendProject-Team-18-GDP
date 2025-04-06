export interface Position {
  year: string;
  sales: number;
  grossProfit: number;
  netProfit: number;
  color: string;
  isCurrent?: boolean;
}

export interface ComparativeBusiness {
  name: string;
  positions: Position[];
}

export interface BusinessPositionMapProps {
  positions: Position[];
  comparativeBusinesses: ComparativeBusiness[];
}
