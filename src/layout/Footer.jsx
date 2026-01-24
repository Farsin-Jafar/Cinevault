import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* App name */}
          <div className="text-lg font-semibold text-white">
            Cinevault
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/favorites" className="hover:text-white transition">
              Favorites
            </a>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              TMDB
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 my-6" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs gap-2">
          <p>
            © {new Date().getFullYear()} Cinevault. Created by FARSIN JAFAR.
          </p>

          <p>
            Powered by The Movie Database (TMDB)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
