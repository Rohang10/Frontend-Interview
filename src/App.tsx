import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/blogs/:id" element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
