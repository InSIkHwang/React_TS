import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const PriceWrapper = styled.div`
  display: grid;
  grid-template-columns: 3, 1fr;
  background-color: ${(props) => props.theme.boxcolor};
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 10px;
  font-weight: bolder;
`;
const PriceHeader = styled.header`
  color: ${(props) => props.theme.accentColor};
  grid-column: 1 / span 3;
  font-weight: bold;
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PriceItem = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  p {
    font-size: 20px;
    padding: 10px;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["pd", coinId],
    () => fetchCoinTickers(coinId),
    {
      /*       refetchInterval: 5000,
       */
    }
  );
  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <PriceWrapper>
          <PriceHeader>PERCENT CHANGE</PriceHeader>
          <PriceItem>
            <span>HOUR</span>
            <p>{data?.quotes.USD.percent_change_1h}%</p>
          </PriceItem>
          <PriceItem>
            <span>DAY</span>
            <p>{data?.quotes.USD.percent_change_24h}%</p>
          </PriceItem>
          <PriceItem>
            <span>WEEK</span>
            <p>{data?.quotes.USD.percent_change_7d}%</p>
          </PriceItem>
          <PriceItem>
            <span>MONTH</span>
            <p>{data?.quotes.USD.percent_change_30d}%</p>
          </PriceItem>
          <PriceItem>
            <span>YEAR</span>
            <p>{data?.quotes.USD.percent_change_1y}%</p>
          </PriceItem>
          <PriceItem>
            <span>ATH</span>
            <p>{data?.quotes.USD.percent_from_price_ath}%</p>
          </PriceItem>
        </PriceWrapper>
      )}
    </>
  );
}

export default Price;
