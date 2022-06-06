import React, {useState} from 'react';


// import components;
import Header from './components/Header';
import Query from './components/Query';
import Footer from './components/Footer';
import Result from './components/Result';



function App() {
const [submit, setSubmit] = useState(false)

function checkSubmitted(val){
    setSubmit(val)
}

function goBackHome(val){
  setSubmit(val)
}


  return (
    <div className='bg-white relative min-h-screen'>
    <Header />
     {!submit && <Query submitted={checkSubmitted} />}
     {submit && <Result goBack={goBackHome} />}
      <Footer />
    </div>
  );
};

export default App;
