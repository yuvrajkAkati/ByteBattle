'use client';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { GridBackground } from "./components/ui/grid-background";

export default function Home() {
  return (

      <>
        <GridBackground />
        <Navbar/>
        <Hero/>
        <Footer/>
      </>
   
    
  );
}
