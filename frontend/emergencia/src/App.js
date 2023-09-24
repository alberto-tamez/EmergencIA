import Header from "./components/Header";
import NivelRiesgo from "./components/NivelRiesgo";


function App() {
  return (
    <>
        <Header/>
        <div style={{height: 50}}/>
        <NivelRiesgo nivel = {0.1}/>
    </>

  );
}

export default App;
