import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Header } from "../../components/Header";
import { useTheme } from '@mui/material';
import { useState } from "react";
import { useEffect } from "react";
import dataApi from "../../api/dataApi";
 
export const Contacts = () => {
  const [data, setData] = useState("");
  const [loaded, setLoaded] = useState( false );

  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  useEffect( () => {
    const fetchData = async () => {
      try {
      
        const { data } = await dataApi.get('/data/contacts');
        setData( data.contact[0].mockDataContacts );
        setLoaded( true );
  
      } catch (error) {
          console.log( error );
      }
    }

    fetchData();

  }, []);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Register ID" },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, 
      cellClassName: "name-column-cell" 
    }, 
    { 
      field: "age", 
      headerName: "Age",
      type: "number",
      headerAlign: "left", 
      align: "left"
    },
    { 
      field: "phone", 
      headerName: "Phone Number", 
      flex: 1, 
    },
    { 
      field: "email", 
      headerName: "Email", 
      flex: 1, 
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1
    },
    {
        field: "city",
        headerName: "City",
        flex: 1
    },
    {
        field: "zipCode",
        headerName: "zipCode",
        flex: 1
    },
  ];

  if ( !loaded ) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Box m="10px 20px">
      <Header title="CONTACTS" subtitle="List of Contacts for future Reference" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none"
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300]
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400]
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          borderRadius: "0px 0px 4px 4px",
          backgroundColor: colors.blueAccent[700]
        },
        "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${ colors.gray[100] } !important`
        }
      }}>
        <DataGrid 
          rows={ data }
          columns={ columns }
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}