import './App.css';
import { useState } from "react";
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navi from './layouts/Navi';

function App() {

  const [curriculumVitae, setcurriculumVitae] = useState({})

  function handleSetCv(cv) {
    setcurriculumVitae(cv)     
  }

  function handleClearData() {
    setcurriculumVitae({})          
  }


  return (
    <div className="App" >
      <Navi clearData={handleClearData}/>
      <Container>
        <Dashboard setCv={(cv) => handleSetCv(cv)} sendCurrentCv={curriculumVitae}/>
      </Container>
    </div>
  );
}

export default App;
