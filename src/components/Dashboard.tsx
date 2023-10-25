import { Grid } from '@mui/material';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import DataSelection, { DATA_STORAGE_KEY } from './DataSelection';
import CaseVisualization from './CaseVisualization';

enum TabsEnum {
    Visualization = 0,
    Map = 1,
    Data = 2,
}

// Clear cache for testing
// localStorage.clear();

// Fetch states data if already imported
let defaultCaseResults: any[] = [];
try {
    const rawStoredData: any = localStorage.getItem(DATA_STORAGE_KEY);
    if (rawStoredData) {
        defaultCaseResults = JSON.parse(rawStoredData);
    }
}
catch (e) {
    console.log(e);
    localStorage.clear();
    defaultCaseResults = [];
}

export default function Dashboard() {
    const [caseData, setCaseData] = React.useState<any[]>(defaultCaseResults);
    const [tabValue, setTabValue] = React.useState(caseData.length > 0 ? TabsEnum.Visualization : TabsEnum.Data);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Grid container height={"100%"}>
            <Grid item xs={2} sx={{backgroundColor: "#282c34"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tabValue}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ 
                    color: 'white',
                    borderRight: 1, 
                    borderColor: 'divider' 
                }}
            >
                <Tab disabled={caseData.length === 0} value={TabsEnum.Visualization} label="Visualization" sx={{color: 'gray'}} />
                <Tab disabled={caseData.length === 0} value={TabsEnum.Map} label="Map" sx={{color: 'gray'}} />
                <Tab value={TabsEnum.Data} label="Data" sx={{color: 'gray'}} />
            </Tabs>
            </Box>
            </Grid>
            <Grid item xs={10}>
                <TabPanel value={tabValue} index={0}>
                <CaseVisualization caseData={caseData}  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    Coming Soon!
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <DataSelection caseData={caseData} setCaseData={setCaseData}  />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    About
                </TabPanel>
            </Grid>
        </Grid>
    );
}