import React from 'react'
import { List, Button, Table, Pagination } from 'antd';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Box, { BoxProps } from "@mui/material/Box";
import Clear from '@mui/icons-material/Clear';
import styles from '../../styles/Favourites.module.css';
import { removeFromFavourites } from "../actions/actions";
import "antd/dist/antd.css";


interface FavouriteListProps {
  favs: Array<Favourite>
}

export const FavouriteList: React.FC<FavouriteListProps> = ( {favs} ) => {
  const dispatch = useDispatch();

  const handleRemove = (record: any) => {
        dispatch(removeFromFavourites(record));
  }

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'remove',
      title: 'Remove',
      render:(record: any) => {
        return<>
           <Button
              shape="round"
              icon={<Clear />}
              onClick={() =>handleRemove(record)}
            />
        </>
      }
    }
  ];

  return (
    <Box className={styles.favourite}
      sx={{
        width: '300px',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: '1px',
        justifyContent: 'space-between',
        paddingTop: '15px',
        paddingBottom: '5px',
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        marginLeft: "75%",
        marginTop: "2%",
        position: "absolute",
      }}
    >
        <Table 
            dataSource={favs} 
            columns={columns} 
            pagination={{ pageSize: 3}}
        />
    </Box>
  )
}