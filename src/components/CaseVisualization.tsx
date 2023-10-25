import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Dialog, DialogTitle, Grid, List, ListItem, Modal, Paper, Stack, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    marginTop: 1,
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

interface CaseDataProps {
    caseData: any[],
}

function Bar(item: any) {
    const {state, casesPer100k, setSelectedItem} = item;
    const progressValue = (casesPer100k / 1000);
    return (
        <Grid key={"bar-item-" + item.id} container>
            <Grid item xs={2} textAlign={"right"}>
                <Typography variant="body1">{state}</Typography>
            </Grid>
            <Grid item xs={8} alignItems="center" padding={1}>
                <BorderLinearProgress onClick={() => {setSelectedItem(item)}} variant="determinate" value={progressValue} />
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1">{casesPer100k}</Typography>
            </Grid>
        </Grid>
        
    );
}

function BarChart(props: CaseDataProps) {
    const [selectedItem, setSelectedItem] = React.useState<any>();

    return (
        <div>
            <Stack>
                {props.caseData.map(item => Bar({...item, setSelectedItem}))}
            </Stack>

            <Dialog onClose={() => {setSelectedItem(undefined)}} open={!!selectedItem}>
                <DialogTitle textAlign={"center"}>{selectedItem?.state}</DialogTitle>
                <Box padding={2}>
                    <List sx={{ pt: 0 }}>
                        <ListItem disableGutters key={"population"}>
                            <Typography>
                                Population: {selectedItem?.population}
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Dialog>
        </div>
    );
}

export default function CaseVisualization(props: CaseDataProps) {
    const {caseData} = props;

    return (
        <Paper elevation={24} sx={{padding: 2, marginBottom: 3}}>
            <Typography variant="h4" mb={1}>
                Covid Case Data
            </Typography>
            <Typography variant="h6" mb={1}>
                Positive Cases per 100k
            </Typography>
            
            <BarChart caseData={caseData} />
        </Paper>
    );
}
