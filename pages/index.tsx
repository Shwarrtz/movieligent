import type { NextPage } from 'next'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../styles/Home.module.css'
import SearchBar from '../src/components/SearchBar';
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { ApiFilters } from '../src/containers/ApiFilters';
import { DataTable } from "../src/components/DataTable";
import {  updateFilters } from '../src/actions/actions';
import { Divider } from '../src/components/Divider';
import React, { useState } from "react";
import { Provider, useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { rootReducer } from '../src/reducers/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { FavouriteList } from '../src/components/FavouriteList';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ErrorHandler } from "../src/components/ErrorHandler";
import { ReactQueryDevtools } from 'react-query/devtools'



const HomeWrapper = () => {
  const store = configureStore({ reducer: rootReducer });
  const queryClient = new QueryClient();
  //<ReactQueryDevtools initialIsOpen={false} />

  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
    </Provider>
  )
}

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const [errorHandler, setErrorHandler] = useState({hasError: false, messages: {}});
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const [url, setUrl] = useState("");
  const favourites = useSelector((state: RootStateOrAny) => state.favourites);

  // Search Bar Value Update
  const onSearchTextUpdate = (text: string) => {
    dispatch(updateFilters('searchText', text));
  }

  return (
    <div className={styles.container}>
      <ErrorHandler errorHandler={errorHandler}/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          m: 1,
          backgroundColor: blue[900],
          borderRadius: 1,
          width: '100%',
          margin: 'auto',
          marginBottom: '100px',
          height: '400px'
        }}
      >
        <h1 className={styles.searchHeader}>Movieligent</h1>
        <SearchBar 
          errorHandler={errorHandler}
          setErrorHandler={setErrorHandler}
          startSearch={startSearch}
          setStartSearch={setStartSearch}
          setUrl={setUrl}
        />
        <Divider />
        
        <ApiFilters 
        />
        <FavouriteList favs={favourites}/>
      </Box>

      {startSearch 
      ? (
        <DataTable
        url={url}
        setErrorHandler={setErrorHandler}
      />
        )
      : (
        ''
      )}  
    </div>
  )
}

export default HomeWrapper
