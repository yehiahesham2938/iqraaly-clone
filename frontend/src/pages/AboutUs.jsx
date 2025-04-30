import React from 'react';
import { BookOpen, Headphones, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
       
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold text-indigo-800 leading-tight">
            Discover <span className="text-indigo-600">IQRAALY</span>
          </h1>
          <p className="text-lg text-gray-700">
          IQRAALY is your gateway to a world of spoken books — where stories come alive through expressive
            human narration. Think of it as the Spotify for books, but better.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're on the move or unwinding at home, dive into a library that spans genres — from
            classics to modern favorites. We’re here to make reading more immersive and convenient.
          </p>
          <p className="text-lg text-gray-700">
            Books aren't just meant to be read — they’re meant to be heard, felt, and lived.
          </p>
          <p className="text-xl italic text-indigo-700 mt-6">
            📚 "When books speak, the world listens."
          </p>
        </div>

        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Headphones className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Immersive Audio</h3>
              <p className="text-gray-600">Experience books narrated by real voices with emotion and clarity.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Unlimited Library</h3>
              <p className="text-gray-600">Explore thousands of titles from classics to contemporary bestsellers.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Join the Community</h3>
              <p className="text-gray-600">Become part of a passionate community of audio book lovers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
