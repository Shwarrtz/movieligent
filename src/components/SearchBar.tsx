import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button  from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSelector, RootStateOrAny } from 'react-redux';
  

export default function CustomizedInputBase({ errorHandler, setErrorHandler, startSearch, setStartSearch, setUrl } : {
    errorHandler: {hasError: boolean, messages: {}}
    setErrorHandler: ({}: any) => void
    startSearch: boolean
    setStartSearch: (startSearch: boolean) => void
    setUrl: (url: string) => void
}) {
    const [searchValue, setSearchValue] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [wordEntered, setWordEntered] = useState("");
    const [sendSubmit, setSendSubmit] = useState<boolean>(false);
    const filters = useSelector((state: RootStateOrAny) => state.filters);

    const validate = (index: string) => {
        const el = document.getElementById(index) as HTMLInputElement | null;
        let error = null;
    
        if (el != null){
            const pattern = el.pattern;
            if (pattern.length > 0 && !el.checkValidity()) {
                error = " requires the following pattern: /" + pattern+"/";
                //error = {[index]:index+ " requires the following pattern: /" + pattern+"/"};
                //setFormErrors(formErrors => ({...formErrors, [index]:index+ " requires the following pattern: /" + pattern+"/"}));
            } 
        }

        return error;
    }

    useEffect(() => {
            if (errorHandler.hasError === true){
                setStartSearch(false);
            } else if (sendSubmit === true){
                setStartSearch(true);
            }

        return () => {
            setSendSubmit(false);
        }
    }, [errorHandler])

    useEffect(() => {
        if (sendSubmit === true){
            let url = "https://api.themoviedb.org/3/search/movie?api_key=4799cb87ff54c6b2ca123c55a2b9f10a&query="+searchValue;
            let errors = {};
            setStartSearch(false);

            Object.keys(filters).forEach(key => {
                if (filters[key] !== null && filters[key] !== ""){
                    url += "&"+key+"="+filters[key];

                    var error = validate(key);
                    if (error != null){
                        errors = ({...errors, [key]:key+ error});
                    }
                }
            });

            setErrorHandler({hasError : Object.keys(errors).length > 0, messages: errors});
            setUrl(url);
        }
        
        return () => {
            //setSendSubmit(false);
        }
    }, [sendSubmit])

    useEffect(() => {        
        setWordEntered(searchValue);
        if (searchValue === '' && !buttonDisabled){
            setButtonDisabled(true);
        } else if (searchValue !== '' && buttonDisabled){
            setButtonDisabled(false);
        }

        const timeOutId = setTimeout(() => {
            if (searchValue.length > 2){
                setSendSubmit(true);
            }
            
        }, 1000);
        return () => clearTimeout(timeOutId);

    }, [searchValue])

    const clearInput = () => {
        setButtonDisabled(true);
        setWordEntered("");
        setStartSearch(false);
        setSearchValue("");
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (event.type === 'submit') {
            setSendSubmit(true);
        }
      }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
                p: '2px 0px', 
                display: 'flex', 
                alignItems: 'center',
                width: 780,
                height: 'fit-content',
                marginTop: '20px;',
                marginBottom: '10px'
            }}
            >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search'}}
                value={wordEntered}
                onChange={(e) => setSearchValue(e.target.value)}
                />
            <Button disabled={buttonDisabled} onClick={clearInput}>Clear</Button>
            <IconButton 
                type="submit" 
                sx={{ p: '10px'}}
                aria-label="search"
                >
                <SearchIcon />
            </IconButton>
        </Paper>
    )

}