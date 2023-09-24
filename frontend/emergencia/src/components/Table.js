
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import CustomRow from './CustomRow';

const tableHeaders = {
    fontWeight: 600,
    bgColor: '#E6E6E6',
    align: 'center',
}
const cellCenter = {
    textAlign: 'center',
}

function customTable() {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }}>
            <TableHead>
                <TableRow sx={{
                    backgroundColor: '#F4F4F4',
                }}>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Info del llamante</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Descripcion del problema</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Ubicacion</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Emociones</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Riesgo</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Status</Typography></TableCell>
                    <TableCell sx={cellCenter}><Typography style={tableHeaders}>Llamada</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <CustomRow />
            </TableBody>
        </Table>
    </TableContainer>
  );
}

export default customTable;