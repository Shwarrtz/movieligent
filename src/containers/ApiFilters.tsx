import React from "react";
import Box from "@mui/material/Box";
import Button  from "@mui/material/Button";
import { FilterInput } from "../components/FilterInput";
import { CheckBox } from "../components/CheckBox";
import styles from "../../styles/Filters.module.css";
import { clearFilters, updateFilters} from "../actions/actions";
import { useDispatch } from 'react-redux';

export const ApiFilters = () => {
  const dispatch = useDispatch();


  // update language
  const updateLanguage = (language: string) => {
      dispatch(updateFilters('language', language));
  }

  // update page
  const updatePage = (page: string) => {
    dispatch(updateFilters('page', page));
  }

  // update region
  const updateRegion = (region: string) => {
    dispatch(updateFilters('region', region));
  }

  // update year
  const updateYear = (year: string) => {
    dispatch(updateFilters('year', year));
  }

  // update release
  const updateRelease = (primary_release_year: string) => {
    dispatch(updateFilters('primary_release_year', primary_release_year));
  }

  // update adult
  const updateAdult = (include_adult: boolean) => {
    dispatch(updateFilters('include_adult', include_adult));
  }

  // clear filters
  const clearAll = () => {
    dispatch(clearFilters());

    //clear inputs
    const div = document.getElementById('apiFilters');
    if (div != null){
      const array = Array.from(div.getElementsByTagName('input'));
      array.forEach( function(input) {
        if (input != null){
          switch(input.type) {
            case 'text':
              input.value = "";
            case 'checkbox':
              input.checked = false;
          }
        }
      });
    }
  }

  return (
    <Box display="flex" justifyContent="space-between"
      sx={{
        width: '780px',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: '1px',
        justifyContent: 'space-between',
        paddingTop: '15px',
        paddingBottom: '5px',
        marginTop: '-60px',
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
      }}
    >
      <div className={styles.filesContainer} id="apiFilters">
        <FilterInput 
            type="text"
            id="language"
            placeholder="Language"
            size={115}
            length={5}
            pattern="([a-z]{2})-([A-Z]{2})"
            onInputUpdate={updateLanguage}
          />
          <FilterInput 
            type="number"
            id="page"
            placeholder="Page"
            size={80}
            length={4}
            pattern="^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)$"
            onInputUpdate={updatePage}
          />
          <FilterInput 
            type="text"
            id="region"
            placeholder="Region"
            size={95}
            length={2}
            pattern="^[A-Z]{2}$"
            onInputUpdate={updateRegion}
          />
          <FilterInput 
            type="number"
            id="year"
            placeholder="Year"
            size={80}
            length={4}
            pattern="^(1[7-9]\d{2})||(20\d{2})$"
            onInputUpdate={updateYear}
          />
          <FilterInput 
            type="number"
            id="primary_release_year"
            placeholder="Release"
            size={100}
            length={4}
            pattern="^(1[7-9]\d{2})||(20\d{2})$"
            onInputUpdate={updateRelease}
          />
          <Box 
            sx={{
              display: "flex",
              width: "70px",
              height: "68px",
              justifyContent: 'space-between',
              float: "right",
              alignItems: "center",
              paddingLeft: "15px",
            }}
            >
            <label>18+</label>
            <CheckBox 
              id="include_adult"
              onInputUpdate={updateAdult}
            />
          </Box>    
      </div>
      <Button onClick={clearAll}>Clear Filters</Button>
    </Box>
  )
}
