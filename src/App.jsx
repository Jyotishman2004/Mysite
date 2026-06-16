import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AnimatedRoutes from './components/AnimatedRoutes';
import { NavigationDirectionProvider } from './context/NavigationDirectionContext';

function App() {
  return (
    <Router>
      <NavigationDirectionProvider>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route path="*" element={<AnimatedRoutes />} />
          </Route>
        </Routes>
      </NavigationDirectionProvider>
    </Router>
  );
}

export default App;
