import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Header } from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import dataApi from "../../api/dataApi";

export const Team = () => {
  const [data, setData] = useState("");
  const [loaded, setLoaded] = useState( false );

  const theme = useTheme();
  const colors = tokens( theme.palette.mode );

  useEffect( () => {
    const fetchData = async () => {
      try {
      
        const { data } = await dataApi.get('/data/team');
        setData( data.team[0].mockDataTeam );
        setLoaded( true );
  
      } catch (error) {
          console.log( error );
      }
    }

    fetchData();

  }, []);

  if ( !loaded ) {
    return <div className="loading">Loading...</div>
  }

  const columns = [
    { field: "id", headerName: "ID" },
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
      field: "accessLevel", 
      headerName: "Access Level", 
      flex: 1, 
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
              ? colors.greenAccent[600]
              : access === "manager"
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            { access === "admin" && <AdminPanelSettingsOutlinedIcon/> }
            { access === "manager" && <SecurityOutlinedIcon/> }
            { access === "user" && <LockOpenOutlinedIcon/> }
            <Typography
              color={ colors.gray[100] }
              sx={{ ml: "5px" }}
            >
              { access }
            </Typography>
          </Box>
        )
      }
    },
  ];

  return (
    <Box m="10px 20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        "& .MuiDataGrid-root": {
          border: "transparent",
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