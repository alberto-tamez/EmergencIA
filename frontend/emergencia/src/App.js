import Header from "./components/Header";
import NivelRiesgo from "./components/NivelRiesgo";
import Emociones from "./components/Emociones";
import Box from '@mui/material/Box';


function App() {
  return (
    <>
        <Header/>
        <Box sx={{display:'flex',}}>
          <NivelRiesgo nivel = {0.1}/>
          <Emociones/>
        </Box>
    </>

  );
}

export default App;
