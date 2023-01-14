import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Description from './Description';
import SectorIndustryOverview from './SectorIndustryOverview'
import axios from 'axios'

interface ComponentProps {
  symbol: any;
  stockData: any;
}


const QuoteCompanyProfile: React.FunctionComponent<ComponentProps> = ({symbol, stockData}) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    border-radius: 0 0 20px 20px;
    background-color: #393945;
    color: lightgrey;
  `;

  const [companyProfile, setCompanyProfile] = useState()
  useEffect(() => {
    const IEX_API_KEY = 'pk_3256652724eb490abdfd234401050f50';


    const fetchStockData = async () => {
      const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${IEX_API_KEY}`)
      setCompanyProfile(response.data)
    }


    fetchStockData()

  }, [])
  console.log(companyProfile)


  return (
    <Container>
      { companyProfile ? <Description companyProfile={companyProfile} /> : <></>}
      { companyProfile ? <SectorIndustryOverview stockData={stockData} companyProfile={companyProfile} /> : <></>}
    </Container>
  );
}

export default QuoteCompanyProfile;