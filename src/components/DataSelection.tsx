import React, { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import { FileUpload } from '@mui/icons-material';
import { Paper, Typography } from "@mui/material";
import CaseDataGrid from "./CaseDataGrid";
import { formatData } from "../utils/dataUtils";

export const DATA_STORAGE_KEY = "covidCaseData";

interface CaseDataGridProps {
    caseData: any[],
    setCaseData: React.Dispatch<React.SetStateAction<any[]>>
}

export default function DataSelection(dataSelectionProps: CaseDataGridProps) {
    const {caseData, setCaseData} = dataSelectionProps;

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file!);
        reader.onload = function() {
            console.log(reader.result);
            const { convertCSVToArray } = require('convert-csv-to-array');
            const dataResult = convertCSVToArray(reader.result, {header: false, type: 'object'});
            const formattedResult = formatData(dataResult);
            console.log("Formatted Data Result*****");
            console.log(formattedResult);
            localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(formattedResult));
            setCaseData(formattedResult);
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    const handleClearDataClick = () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure you'd like to clear the dashboard data?")){
            localStorage.clear();
            setCaseData([]);
        }
    };

    return (
        <div>
            {caseData && 
                <Paper elevation={24} sx={{padding: 2, marginBottom: 3}}>
                    <Typography variant="h4" mb={1}>
                        Data Grid
                    </Typography>
                    <CaseDataGrid caseData={caseData} />
                </Paper>
            }

            <Paper elevation={24} sx={{padding: 2}}>
                <Typography variant="h4" mb={1}>
                    Data Source
                </Typography>
  
                <Button
                    variant="contained"
                    component="label"
                    sx={{marginRight: "15px"}}
                    endIcon={<FileUpload />}
                >
                    Import Custom Data
                <input
                    type="file"
                    onChange={handleFileChange}
                    hidden />
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClearDataClick}
                >
                    Clear Data
                </Button>
            </Paper>
        </div>
    );
}
