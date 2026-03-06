import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './components/layout/About';
import Vision from './components/layout/Vision';
import Mission from './components/layout/Mission';
import Leadership from './components/layout/Leadership';
import Programs from './components/community/Programs';
import Events from './components/community/Events';
import PrayerWall from './components/community/PrayerWall';
import Discipleship from './components/community/Discipleship';
import Blogs from './components/community/Blog';
import BlogDetails from './components/community/BlogDetails';
import Give from './components/community/Give';
import Contact from './components/community/Contact';
import Join from './components/community/Join';
import PrivacyPolicy from './components/others/PolCy';
import Terms from './components/others/Terms';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow pt-0">
          <Routes>
            {/* Define routes here */}
            
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/give" element={<Give />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<Join />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/vision" element={<Vision />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/prayer" element={<PrayerWall />} />
            <Route path="/discipleship" element={<Discipleship />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;