import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, MapPin, Goal, Play, Pause, Volume2, VolumeX, Download, Music } from 'lucide-react';
import { generateAnthemLyricsPDF } from '../utils/pdfGenerator';

const About: React.FC = () => {
  // Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary-700">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Our School</h1>
            <p className="text-xl opacity-90">
              Discover the story, mission, and values that make Positive Image Schools a leader in education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-heading font-bold text-primary-700 mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Positive Image Schools was founded in 2003 with a vision to provide quality education 
                to children in and around Ibadan. What started as a divine idea
                has grown into a respected educational institution serving hundreds of students.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Over the years, we have built a reputation for academic excellence and character 
                development. Our graduates have gone on to excel in various fields, carrying with 
                them the values and knowledge instilled during their time at Positive Image Schools.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue to evolve and improve our educational offerings while staying true 
                to our founding principles of excellence, integrity, and community service.
              </p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="./public/fullstaff.jpg" 
                alt="School building" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-primary-700 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-lg">
              Guiding principles that drive everything we do at Positive Image Schools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Book className="text-primary-700" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary-700">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To offer standard and qualitative education to all <br/>
               To contribute to the transformation of societies through qualitative teaching <br/>
                To make all children, stars in their fields of learning, careers and gifts.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Goal className="text-primary-700" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary-700">Our Vision</h3>
              </div>
              <p className="text-gray-700  text-lg leading-relaxed">
                To be a world class center for excellence  <br/>
                To produce Graduates who are worthy in character.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Anthem Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-4">
              Our School Anthem
            </h2>
            <p className="text-gray-600 text-lg">
              The song that unites us all and embodies our school spirit and values.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Anthem Lyrics */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">
                  Positive Image"
                </h3>
                <p className="text-gray-600 italic">Official School Anthem</p>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="text-center">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 1:</h4>
                  <p className="italic">
                   Positive! Positive!! Positive Image There I go, there you go<br/>
                   Go to learn for life, May the God of Universe, Make me reach my goal,<br/> In future to become a future leader.
                  </p>
                </div>

                <div className="text-center bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 2.</h4>
                  <p className="italic font-medium">
                    No matter what situation, I will still be there.<br/>
                      Because I want to become Success in my life.<br/>
                        No matter what devil say, No controversy,<br/>
                          Positive! Positive!! Positive Image.

                  </p>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 3.</h4>
                  <p className="italic">
                    Proprietor, our teachers and our Parents Let us reason together,<br/>
                    To make a progress. Payment of our School levies is our concern.<br/>
                    Divided we fall, United we stand.

                  </p>
                </div>

                <div className="text-center bg-secondary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-600 mb-3">Bridge:</h4>
                  <p className="italic">
                    Glory! Glory! Glory! Positive Image<br/>
                      Wisdom embassy, Positive Image, No matter what devil say,<br/>
                        We will overcome
                          Overcome, Overcome, Positive Image.
                  </p>
                </div>

              
              </div>
            </motion.div>

            {/* Media Player Section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h3 className="text-2xl font-heading font-bold text-primary-700">
                    Listen to Our Anthem
                  </h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    OFFICIAL RECORDING
                  </span>
                </div>
                <p className="text-gray-600">Experience the inspiring official recording of Positive Image Schools Anthem</p>
              </div>

              {/* Custom Audio Player */}
              <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-indigo-900 rounded-2xl p-6 text-white mb-6 shadow-lg border border-primary-600/30">
                {/* Audio Element */}
                <audio 
                  ref={audioRef}
                  src="/anthem.mp3"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  preload="metadata"
                />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Music className="text-secondary-300 animate-bounce" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg leading-tight text-white">Positive Image Anthem</h4>
                      <p className="text-primary-200 text-xs mt-1 flex items-center gap-1">
                        <span>Official Anthem Recording</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-primary-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Slider */}
                <div className="mb-6">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-primary-900/80 rounded-lg appearance-none cursor-pointer accent-secondary-400 hover:accent-secondary-300 transition-all"
                  />
                  <div className="flex justify-between text-xs text-primary-200 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-secondary-500 hover:bg-secondary-400 text-primary-950 font-bold flex items-center justify-center shadow-lg transition-transform transform active:scale-95"
                      title={isPlaying ? "Pause Anthem" : "Play Anthem"}
                    >
                      {isPlaying ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-0.5" />}
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {isPlaying ? "Playing Anthem..." : "Click to Play"}
                      </p>
                      <p className="text-[11px] text-primary-200">Positive Image Schools</p>
                    </div>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm flex items-center gap-2">
                    <Music size={16} className="text-primary-600" />
                    School Anthem Information
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    This official audio recording represents the spirit, faith, and dedication of Positive Image Schools. 
                    Listen and sing along with the lyrics provided on the left.
                  </p>
                </div>

                {/* Download Options */}
                <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="/anthem.mp3"
                    download="Positive_Image_Schools_Anthem.mp3"
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Download size={14} />
                    Download Anthem Audio (MP3)
                  </a>
                  
                  <button 
                    onClick={generateAnthemLyricsPDF}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Download size={14} />
                    Download Anthem Lyrics (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Anthem Performance Schedule */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-primary-100"
          >
            <h3 className="text-2xl font-heading font-bold text-primary-700 mb-6 text-center">
              When We Sing Our Anthem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl mb-2">🌅</div>
                <h4 className="font-semibold text-primary-700">Morning Assembly</h4>
                <p className="text-gray-600 text-sm">Every school day at 7:45 AM</p>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-semibold text-secondary-700">Special Events</h4>
                <p className="text-gray-600 text-sm">Graduations, Sports Day, Cultural Day</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-green-700">Achievements</h4>
                <p className="text-gray-600 text-sm">Award ceremonies and celebrations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-primary-700 mb-4">
              School Information
            </h2>
            <p className="text-gray-600 text-lg">
              Key details about our educational offerings and operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                Academic Programs
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early Childhood Education (Age 3-5)</li>
                <li>• Primary Education (Primary 1-6)</li>
                <li>• Junior Secondary (JSS 1-3)</li>
                <li>• Senior Secondary (SSS 1-3)</li>
              </ul>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                School Hours
              </h3>
              <div className="flex items-start mb-4">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-gray-700">7:30 AM - 3:30 PM</p>
                </div>
              </div>
              {/* <div className="flex items-start mb-4">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Saturday (Tutorial)</p>
                  <p className="text-gray-700">8:00 AM - 12:00 PM</p>
                </div>
              </div> */}
              <div className="flex items-start">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Administrative Office</p>
                  <p className="text-gray-700">8:00 AM - 4:00 PM (Mon-Fri)</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                Location
              </h3>
              <div className="flex items-start flex-col">
                <MapPin size={24} className="text-primary-700 mr-2 mt-1 " />
                <div className='w-full p-4 '>
                  <p className="font-medium text-lg">Our Address</p>
                  <p className="text-gray-700">13 Sangogade Street</p>
                  <p className="text-gray-700">Akoyoyo Area</p>
                  <p className="text-gray-700"> Amuloko, Ibadan, Oyo State</p>
                  <p className="text-gray-700">Nigeria</p>
                </div>
                 <div className='w-full p-4 '>
                  <p className="font-medium text-lg">Our Address 2</p>
                  <p className="text-gray-700">Elebolo Junction,</p>
                                        <p className="text-gray-700">Opposite Petrocam Gas Station Odeyale</p>
                                        <p className="text-gray-700"> Ajia, Ibadan, Oyo State</p>
                                        <p className="text-gray-700">Nigeria</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;