import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";

const Main = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div> {<Main />}</div>
    </BrowserRouter>
  );
};

export default App;
