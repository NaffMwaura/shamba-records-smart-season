import { Navbar, Hero, Features, Footer } from './components/landing/landing';

function App() {
  const handleAuthClick = () => {
    console.log("Opening login modal...");
    // We will implement the Auth Modal in the next step
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Sticky Navigation */}
      <Navbar onAuthClick={handleAuthClick} />

      {/* 2. Impactful Hero Section */}
      <Hero onGetStarted={handleAuthClick} />

      {/* 3. Detailed Features */}
      <Features />

      {/* 4. Simple Footer */}
      <Footer />
    </div>
  );
}

export default App;