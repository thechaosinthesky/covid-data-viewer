import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'state',
    headerName: 'State',
    width: 110,
  },
  {
    field: 'population',
    headerName: 'Population',
    width: 110,
  },
  {
    field: 'casesPer100k',
    headerName: 'Cases Per 100k',
    width: 150,
  }
];

interface CaseDataGridProps {
  caseData: Record<string, any>[]
}

export default function CaseDataGrid(props: CaseDataGridProps) {
  const caseData = props.caseData;
  return (
    <Box sx={{ height: ((caseData && caseData.length > 0) ? 400 : 200), width: '100%' }}>
      <DataGrid
        rows={caseData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}