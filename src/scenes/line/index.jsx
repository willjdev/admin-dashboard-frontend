import { Box } from "@mui/material";
import { Header } from "../../components/Header";
import { LineChart } from "../../components/LineChart";

export const Line = () => {
    return (
        <Box m="10px 20px">
            <Header title="Line Chart" subtitle="Simple Line Chart" />
            <Box height="75vh">
                <LineChart />
            </Box>

        </Box>
    );
};