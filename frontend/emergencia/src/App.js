import Header from "./components/Header";
// import NivelRiesgo from "./components/NivelRiesgo";
// import Emociones from "./components/Emociones";
// import Status from "./components/Status";
import Box from '@mui/material/Box';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Table from "./components/Table.js";
// import Maps from "./components/Mapa.js";


function App() {
  return (
    <>
        <Header/>
        {/* <Box sx={{display:'flex',}}>
          <NivelRiesgo nivel = {0.4}/>
          <Emociones/>
          <Status/>
          <Maps/>
        </Box> */}
        <Box sx={{
          display:'flex',
          width:1,
          minHeight: 500,
          justifyContent: 'center',
          paddingTop: 5,
          paddingX: 5,
        }}><Table/></Box>

    </>

  );
}

export default App;
