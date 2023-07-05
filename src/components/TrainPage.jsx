import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const TrainSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrainSearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const TrainSearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const TrainSearchResult = styled.div`
  margin-top: 10px;
`;

const TrainSearch = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleTrainNumberChange = (e) => {
    setTrainNumber(e.target.value);
  };

  const searchTrain = async () => {
    try {
      const response = await axios.get(
        `http://104.211.219.98/train/trains/${trainNumber}`,
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODg1NDQ5NTMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNmRiNGQ0YzMtOGU2Yy00MDNjLWFjNDUtODY1ZTM5NGU3YTg1Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwQkFEMDU2In0.xIxAIY4fEbA9vG65MeyFg_L-W8rbxEtojIUEYMwDKTU"}`,
          },

        }
      );

      // Process the response data and update the searchResult state
      setSearchResult(`Train number ${trainNumber} found!`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setSearchResult('An error occurred during the search.');
    }
  };

  return (
    <TrainSearchContainer>
      <TrainSearchInput
        type="text"
        placeholder="Enter train number"
        value={trainNumber}
        onChange={handleTrainNumberChange}
      />
      <TrainSearchButton onClick={searchTrain}>Search</TrainSearchButton>
      {searchResult && <TrainSearchResult>{searchResult}</TrainSearchResult>}
      
    </TrainSearchContainer>

  );
};

export default TrainSearch;



