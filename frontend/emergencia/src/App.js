import Header from "./components/Header";
import NivelRiesgo from "./components/NivelRiesgo";
import Emociones from "./components/Emociones";
import Status from "./components/Status";
import Box from '@mui/material/Box';


function App() {
  return (
    <>
        <Header/>
        <Box sx={{display:'flex',}}>
          <NivelRiesgo nivel = {0.4}/>
          <Emociones/>
          <Status/>
        </Box>
    </>

  );
}

export default App;
