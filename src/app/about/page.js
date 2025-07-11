import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Fixed Burgundy + Subtle Animation */}
      <header className="burgundy-fixed-with-gradient text-white shadow-lg overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
              YallaOuting
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 drop-shadow-md animate-slide-up">
              Where Friends Come Together
            </p>
            <div className="mt-8 w-32 h-1 bg-white/80 mx-auto rounded-full animate-expand"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#660033] mb-6 animate-fade-in-up">
              About YallaOuting
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#660033] to-transparent mx-auto mb-8 animate-expand"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <p className="text-xl text-gray-700 leading-relaxed">
                YallaOuting is your ultimate companion for organizing memorable hangouts with friends. 
                We understand that coordinating group activities can be challenging, so we've created 
                a platform that makes planning effortless and fun.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Whether you're planning a casual coffee meetup, an adventure-packed weekend, or a 
                special celebration, YallaOuting helps you bring your friend group together with 
                ease and excitement.
              </p>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#660033] to-[#800040] rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-gradient-to-b from-[#660033] to-[#800040]">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#660033] to-[#800040] rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#660033] to-[#800040] bg-clip-text text-transparent">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To strengthen friendships by making group hangouts seamless, enjoyable, and 
                  unforgettable. We believe that the best memories are made when friends come 
                  together, and we're here to make that happen more often.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#660033] mb-6 animate-fade-in-up">
              What We Offer
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#660033] to-transparent mx-auto mb-8 animate-expand"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#660033] to-[#800040] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-[#660033] to-[#800040] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <span className="text-white text-3xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold text-[#660033] mb-4">Smart Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Coordinate schedules effortlessly with our intelligent scheduling system that 
                  finds the perfect time for everyone.
                </p>
              </div>
            </div>
            
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#660033] to-[#800040] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-[#660033] to-[#800040] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <span className="text-white text-3xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-[#660033] mb-4">Group Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easily manage your friend groups, track who's coming, and keep everyone 
                  in the loop with real-time updates.
                </p>
              </div>
            </div>
            
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#660033] to-[#800040] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-[#660033] to-[#800040] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <span className="text-white text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-[#660033] mb-4">Activity Planning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover and plan amazing activities with built-in suggestions and 
                  customizable options for every type of hangout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="burgundy-fixed-complex rounded-3xl overflow-hidden">
            <div className="relative p-12 md:p-16 text-white z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Our Values</h2>
                <p className="text-2xl opacity-90 animate-slide-up">What drives us every day</p>
                <div className="mt-6 w-32 h-1 bg-white/80 mx-auto rounded-full animate-expand"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🤝</div>
                  <h3 className="font-bold text-xl mb-3">Friendship</h3>
                  <p className="opacity-90 leading-relaxed">Building stronger bonds between friends</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <h3 className="font-bold text-xl mb-3">Simplicity</h3>
                  <p className="opacity-90 leading-relaxed">Making planning effortless and intuitive</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎉</div>
                  <h3 className="font-bold text-xl mb-3">Fun</h3>
                  <p className="opacity-90 leading-relaxed">Bringing joy to every gathering</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="font-bold text-xl mb-3">Innovation</h3>
                  <p className="opacity-90 leading-relaxed">Constantly improving the experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#660033] to-[#800040] rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-12 md:p-16 border-t-8 border-gradient-to-r from-[#660033] to-[#800040] animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#660033] to-[#800040] bg-clip-text text-transparent mb-8">
                Ready to Start Planning?
              </h2>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of friend groups who are already using YallaOuting to create 
                amazing memories together. Your next great hangout is just a click away!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative bg-gradient-to-r from-[#660033] to-[#800040] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#800040] to-[#660033] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group border-3 border-gradient-to-r from-[#660033] to-[#800040] text-[#660033] px-10 py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-[#660033] hover:to-[#800040] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="burgundy-fixed-with-gradient text-white mt-24 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-12 z-10">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4 animate-fade-in">YallaOuting</h3>
            <p className="text-xl opacity-90 mb-8 animate-slide-up">Making every hangout unforgettable</p>
            <div className="mt-8 pt-8 border-t border-white/30">
              <p className="opacity-75 animate-fade-in">© 2025 YallaOuting. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
