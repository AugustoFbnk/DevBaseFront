import './App.css';
import { DesenvolvedorProvider } from '../src/contexts/desenvolvedor-context';
import { LoadingProvider } from '../src/contexts/loading-context';
import LoadingComponent from '../src/components/loading-component/loading-component';
import Routes from './routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <LoadingProvider>
      <DesenvolvedorProvider >
      <LoadingComponent></LoadingComponent>
        <Router>
           <Routes></Routes>
        </Router>
      </DesenvolvedorProvider>
    </LoadingProvider>
  );
}

export default App;
