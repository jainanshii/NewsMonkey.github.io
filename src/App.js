import React, { Component } from 'react';
import Navbar from './components/Navbar'
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppRoutes() {
  const location = useLocation();
  

  return (
    <Routes key={location.pathname}>
      <Route path="/" element={<News pagesize={12}  category="general" />} />
      <Route path="/business" element={<News pagesize={12} category="business" />} />
      <Route path="/entertainment" element={<News pagesize={12}  category="entertainment" />} />
      <Route path="/health" element={<News pagesize={12}  category="health" />} />
      <Route path="/science" element={<News pagesize={12}  category="science" />} />
      <Route path="/sports" element={<News pagesize={12}  category="sports" />} />
      <Route path="/technology" element={<News pagesize={12}  category="technology" />} />
    </Routes>
  );
}

export default class App extends Component {
  state={
    mode:'light'
  }
   toggleMode=()=>{
      if(this.state.mode==='light'){
        this.setState({mode:'dark'})
        document.body.style.backgroundColor="black"
        document.body.style.color="white"
      }
      else{
        this.setState({mode:'light'})
        document.body.style.backgroundColor="white"
        document.body.style.color="black"
      }
    }
  render() {
    return (
      <>
        <Router>
            <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
          <AppRoutes />
        </Router>
      </>
    );
  }
}


