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
            <TableCell align="center">Nombre: Juan Lopez Sexo: Masculino Edad: 47 años</TableCell>
            <TableCell align="center">Persona herida por atropello, parece respirar pero requier asitencia medica inmediata. La persona atropellada parece tener aproximadamente unos 30 años.</TableCell>
            <TableCell align="center"><Maps/></TableCell>
            <TableCell align="center"><Emociones emociones={['tristeza', 'enojo', 'miedo']} /></TableCell>
            <TableCell align="center"><NivelRiesgo nivel = {0.5}/></TableCell>
            <TableCell align="center"><Status action='Accion inmediata'/></TableCell>
            <TableCell align="center"><Transcript transcript='hola hola xomo estas'/></TableCell>
        </TableRow>
    );
}


export default CustomRow;