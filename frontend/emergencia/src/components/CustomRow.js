import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Emociones from "./Emociones";
import Status from "./Status";
import Box from '@mui/material/Box';
import NivelRiesgo from "./NivelRiesgo";
import Maps from "./Mapa.js";
import Transcript from './Transcript';

const cellCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function CustomRow(props){
    return(
        <TableRow>
            <TableCell align="center">Nombre: Juan Lopez Sexo: Masculino Edad: 47 años</TableCell>
            <TableCell align="center">Persona herida por atropello, parece respirar pero requier asitencia medica inmediata. La persona atropellada parece tener aproximadamente unos 30 años.</TableCell>
            <TableCell align="center"><Maps/></TableCell>
            <TableCell align="center"><Emociones/></TableCell>
            <TableCell align="center"><NivelRiesgo nivel = {0.5}/></TableCell>
            <TableCell align="center"><Status/></TableCell>
            {/* Arreglar la imagen */}
            <TableCell align="center"><Transcript/></TableCell>
        </TableRow>
    );
}

export default CustomRow;