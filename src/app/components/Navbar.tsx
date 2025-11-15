"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ByteBattleLogo from "./ui/ByteBattleLogo";
import { SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "components/spinner";
import { useConvexAuth } from "convex/react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";






const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthenticated,isLoading} = useConvexAuth(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center fixed w-full mt-8 z-[9999]">
      <nav className="flex justify-between items-center w-[80%] w-full mx-8 px-3 py-3 rounded-2xl shadow-lg backdrop-blur-md bg-black/30 border border-red-500/20 text-white z-50 transition-all duration-300 hover:border-red-500/40 hover:shadow-red-500/10">
        {/* Left Logo */}
        <div className="flex items-center space-x-3 group">
          <ByteBattleLogo 
            size={45} 
            className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" 
          />
          <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-100 group-hover:to-white">
            Byte Battle
          </h1>
        </div>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex space-x-8 font-semibold text-sm uppercase">
          <a href="/" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/about" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/events" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Rounds</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/prizes" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Prizes</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/contact" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
        </div>

        {/* Right Buttons - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/register">
              <button className="relative group px-4 py-2 border-2 border-red-500/40 rounded-lg font-bold bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-200 hover:text-white transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 overflow-hidden cursor-pointer">
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            </SignInButton>
        </SignedOut>


         <SignedIn>
            <a href="/register">
              <button className="relative group px-4 py-2 border-2 border-red-500/40 rounded-lg font-bold bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-200 hover:text-white transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 overflow-hidden cursor-pointer">
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            </a>
          </SignedIn>


          {isLoading && <Spinner size="lg" />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                {/* vigo make it good */}
                <button className="relative group px-4 py-2 border-2 border-white/20 rounded-lg font-bold text-white hover:text-red-200 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:scale-105 overflow-hidden cursor-pointer">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
              </SignInButton>
            </>
          )}


          {isAuthenticated && !isLoading && (
            <>
              <SignOutButton>
                <button className="relative group px-4 py-2 border-2 border-white/20 rounded-lg font-bold text-white hover:text-red-200 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:scale-105 overflow-hidden cursor-pointer">
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
              </SignOutButton>
              <UserButton
                afterSwitchSessionUrl="/"
              />
            </>
          )}




        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative group p-2 border border-red-500/40 rounded-lg hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-red-400" />
          ) : (
            <Menu className="w-6 h-6 text-red-400" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={toggleMenu}>
          <div 
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-black/80 backdrop-blur-lg border border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <a 
                href="/" 
                className="block group py-3 px-4 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                onClick={toggleMenu}
              >
                <span className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  Home
                </span>
              </a>
              <a 
                href="/about" 
                className="block group py-3 px-4 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                onClick={toggleMenu}
              >
                <span className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  About
                </span>
              </a>
              <a 
                href="/events" 
                className="block group py-3 px-4 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                onClick={toggleMenu}
              >
                <span className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  Rounds
                </span>
              </a>
              <a 
                href="/prizes" 
                className="block group py-3 px-4 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                onClick={toggleMenu}
              >
                <span className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  Prizes
                </span>
              </a>
              <a 
                href="/contact" 
                className="block group py-3 px-4 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                onClick={toggleMenu}
              >
                <span className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                  Contact
                </span>
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="space-y-4 mt-6 pt-6 border-t border-red-500/20">
              <a href="/register" className="block" onClick={toggleMenu}>
                <button className="w-full py-3 px-4 border-2 border-red-500/40 rounded-lg font-bold bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-200 hover:text-white transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20">
                  Register Now
                </button>
              </a>
              <a href="/login" className="block" onClick={toggleMenu}>
                <button className="w-full py-3 px-4 border-2 border-white/20 rounded-lg font-bold text-white hover:text-red-200 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10">
                  Login
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;