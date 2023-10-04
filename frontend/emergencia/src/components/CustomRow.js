import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Emociones from "./Emociones";
import Status from "./Status";
import NivelRiesgo from "./NivelRiesgo";
import Maps from "./Mapa.js";
import Transcript from './Transcript';

function CustomRow(props){
    return(
        <TableRow>
            <TableCell align="center">Nombre: Juan Lopez Sexo: Masculino</TableCell>
            <TableCell align="center">Mujer herida por atropello, requiere asistencia medica inmediata.</TableCell>
            <TableCell align="center"><Maps/></TableCell>
            <TableCell align="center"><Emociones emociones={['tristeza', 'enojo', 'miedo']} /></TableCell>
            <TableCell align="center"><NivelRiesgo nivel = {0.5}/></TableCell>
            <TableCell align="center"><Status action='Accion inmediata'/></TableCell>
            <TableCell align="center"><Transcript transcript='Hola me llamo Juan Lopez. Acaban de atropller a una mujer por avenida calzada y se escaparon, ella parece estar viva pero por favor manden una ambulancia ya'/></TableCell>
        </TableRow>
    );
}


export default CustomRow;