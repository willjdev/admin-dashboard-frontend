import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Dashboard } from './scenes/dashboard/index';
import Sidebar from './scenes/global/Sidebar';
import { Team } from './scenes/team/index';
import { Invoices } from './scenes/invoices/index';
import { Contacts } from './scenes/contacts/index';
import { Bar } from './scenes/bar/index';
import { Form } from './scenes/form/index';
import { Line } from './scenes/line/index';
import { Pie } from './scenes/pie/index';
import { FAQ } from './scenes/faq/index';
import { Geography } from './scenes/geography/index';
import { Calendar } from './scenes/calendar/index';
import { Route, Routes } from "react-router-dom";
import { useState } from "react";



function App() {
  const [ theme, colorMode ] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const variable = process.env.REACT_APP_API_URL;

  return (
    <ColorModeContext.Provider value={ colorMode }>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={ isSidebar } />
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
