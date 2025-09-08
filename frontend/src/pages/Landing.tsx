import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart3, Users, ArrowRight } from 'lucide-react';

import timer from '../assets/timer.png';
import Button from '../components/ui/Button';

const Landing: React.FC = () => {
  return (
    <div>
      <header className="sticky top-0 bg-white shadow">
        <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
          <div className="flex items-center text-2xl font-bold text-blue-500">
            <div className="w-12 mr-3">
              <Clock className="w-10 h-10 text-blue-500" />
            </div>
            TimeTracker
          </div>

          <div className="hidden md:block">
            <Link to="/signup">
              <Button>
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="text-gray-900">
        <section className="">
          <div className="container mx-auto px-8 lg:flex items-center">
            {/* Texte principal */}
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Boost Your Productivity with TimeTracker
              </h1>
              <p className="text-xl lg:text-2xl mt-6 font-light text-gray-700">
                Track your work sessions, analyze your performance, and stay focused on what really matters.
              </p>
              <p className="mt-8 md:mt-12">
                <Link to="/dashboard">
                  <Button>
                    Get Started <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </p>

            </div>
            <div className="lg:w-1/2">
              <img className="mt-12 lg:mt-0 mx-auto" src={timer} alt="Time tracking illustration" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};



export default Landing;
