import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { addToFavourites, removeFromFavourites } from "../actions/actions";
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import Button  from "@mui/material/Button";
import { useQuery } from "react-query";
import Axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Box from "@mui/material/Box";
import { ConstructionOutlined } from "@mui/icons-material";

interface DataTableProps {
    url: string
    setErrorHandler: ({}: any) => void
}

export const DataTable: React.FC<DataTableProps> = ({ url, setErrorHandler }) => {
    //base
    const dispatch = useDispatch();
    const favourites = useSelector((state: RootStateOrAny) => state.favourites);
      
    const columns = [
        { id: "id", type: "number", label: "Id", visible: true, array: false},
        { id: "title", type: "string", label: "Title", visible: true, array: false},
        { id: "adult", type: "boolean", label: "Adult", visible: true, array: false},
        { id: "backdrop_path", type: "string", label: "Backdrop path", visible: false, array: false},
        { id: "genre_ids", type: "array", label: "Genre Ids", visible: true, array: true},
        { id: "original_language", type: "string", label: "Original Language", visible: true, array: false},
        { id: "original_title", type: "string", label: "Original Title", visible: true, array: false},
        { id: "overview", type: "string", label: "Overview", visible: true, array: false},
        { id: "popularity", type: "number", label: "Popularity", visible: true, array: false},
        { id: "poster_path", type: "string", label: "Poster Path", visible: false, array: false},
        { id: "release_date", type: "number", label: "Release Date", visible: true, array: false},
        { id: "video", type: "boolean", label: "Video", visible: true, array: false},
        { id: "vote_average", type: "number", label: "Vote Average", visible: true, array: false},
        { id: "vote_count", type: "number", label: "Vote Count", visible: true, array: false},
        { id: "favourite", type: "boolean", label: "Favourite", visible: true, array: false}
    ];
    
    //favourite
    const handleClick = (rowId: number, vendorName: string) => {
        const index = favourites.findIndex((favourite: { id: number; }) => favourite.id === rowId);
        if (index < 0){
            dispatch(addToFavourites({id: rowId, name: vendorName}));
        } else {
            dispatch(removeFromFavourites({id: rowId, name: vendorName}));
        }
    }
    
    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sendRequest = () => {
        return Axios.get(url)
    }

    const { isLoading, data, isError, error, isFetching } = useQuery(
        url,
        sendRequest,
        {
            cacheTime: 10000,
        }
    )

    if (isLoading) {
        return (
            <Box
                sx={{
                    alignItems: 'center',
                    width: '50px',
                    margin: 'auto',
                    marginBottom: '100px',
                    height: '50px'
                }}
            >
            <ClimbingBoxLoader 
                size={30} 
                color={'#F37A24'} 
                loading={isLoading}/>
            </Box>
        )
    }

    if (isError) {
        let tmp: any;
        tmp = error;
        setErrorHandler({hasError : isError, messages: {'query': tmp.message}});
        //return <h2>{error?.message}</h2>
        //return <h2>{error['message' as keyof AxiosError]}</h2>
    }

    return (
        <TableContainer component={Paper}>
            <Table 
            sx= {{ minWidth: 650}} 
            aria-label="table"
        >
                <TableHead sx={{ backgroundColor: "#A9A9A9" }}>
                    <TableRow>
                    {
                        columns.map((column: Header) => {
                            return(
                                ( column.visible ?
                                (
                                <TableCell
                                    key={column.id}
                                >{column.label}</TableCell>
                                ) : "")
                            )
                        })
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.data.results
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: Movie) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': {border: 0} }}
                                >
                                    {
                                        columns.map((column: Header) => {
                                            let value = row[column.id as keyof Movie];
                                            return(
                                                
                                                ( column.visible && column.id != 'favourite' ?
                                                (
                                                <TableCell
                                                    key={column.id+"_"+row.id}
                                                    align={(column.type == 'boolean'  ? "center" : "left")}
                                                >
                                                    {(() => {
                                                        switch(column.type) {
                                                            case "array": return value.toString();
                                                            case "boolean": return (value ? <CheckIcon /> : <BlockIcon /> );
                                                            default: return value
                                                        }
                                                    })()}
                                                </TableCell>
                                                ) : "")
                                            )
                                        })
                                    }
                                    <TableCell key={'fav_'+row.id} align="center">
                                        <Button 
                                            onClick={() => handleClick(row.id, row.title)}>
                                                {favourites.findIndex((favourite: { id: number; }) => favourite.id === row.id) < 0 ? <FavoriteBorder /> : <Favorite />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                        )})
                    }
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={data?.data.results.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </TableContainer>
    )
}