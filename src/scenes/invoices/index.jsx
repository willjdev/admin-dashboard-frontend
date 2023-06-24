import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";

import { Header } from "../../components/Header";
import { useEffect } from "react";
import dataApi from "../../api/dataApi";
import { useState } from "react";
 
export const Invoices = () => {
  const theme = useTheme();
  const colors = tokens( theme.palette.mode );
  const [data, setData] = useState( "" );
  const [loaded, setLoaded] = useState( false );

  useEffect( () => {
    
    const fetchData = async () => {
      try {

        const { data } = await dataApi.get('/data/invoices');
        setData( data.invoice[0].mockDataInvoices );
        setLoaded( true );

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  //console.log(data)
  
  const columns = [
    { field: "id", headerName: "ID" },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, 
      cellClassName: "name-column-cell" 
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
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: ( params ) => (
            <Typography color={ colors.greenAccent[500] }>
                ${params.row.cost}
            </Typography>
        )
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1
    },
  ];

  if ( !loaded ) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Box m="10px 20px">
      <Header title="Invoices" subtitle="List of Invoice Balances" />
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
      }}>
        <DataGrid 
          checkboxSelection
          rows={ data }
          columns={ columns }
        />
      </Box>
    </Box>
  )
}