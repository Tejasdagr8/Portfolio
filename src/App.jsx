import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import profile from "./assets/profile.jpeg";

function App() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 flex justify-between items-center px-8 py-4 bg-black/70 backdrop-blur z-50">
        <h1 className="text-xl font-bold">Tejas</h1>
        <div className="flex gap-5 text-gray-300 text-sm">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img
          src={profile}
          alt="Tejas"
          className="w-40 h-40 rounded-full mb-6 border-4 border-gray-700 object-cover"
        />

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Tejas Melkote
        </h1>

        <p className="text-gray-400 text-lg mb-4">
          AI/ML Engineer • Full Stack Developer • SDE Intern @ SuperAGI
        </p>

        <p className="text-gray-500 max-w-xl">
          B.Tech Computer Science student specializing in Artificial Intelligence with strong foundation in Machine Learning and Data Science.
        </p>
      </motion.section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl mb-6">About Me</h2>
        <p className="text-gray-400 leading-7">
          B.Tech Computer Science student specializing in Artificial Intelligence, with a strong foundation in Machine Learning and Data Science.
          Demonstrates adaptability and leadership across various roles, consistently enhancing technical skills through hands-on projects and internships.
          Aims to make a meaningful impact in the tech industry through innovation and collaboration.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl mb-10">Experience</h2>

        <div className="space-y-6">

          <div className="p-6 border rounded-2xl">
            <h3 className="text-xl font-bold">SuperAGI — SDE Intern (Marketing)</h3>
            <p className="text-gray-400 mt-2">
              Jan 2026 – Jun 2026 • Bangalore, India <br /><br />
              Worked in a full-stack production environment using Golang, Ruby on Rails, and Vue.js to develop marketing campaign features (Email and WhatsApp).
              Used Jenkins for staging and deployed multiple PRs to production.<br /><br />
              Developed features and fixed critical bugs, worked with Jenkins, ArgoCD, Redis, Kafka, database migrations, and CRM systems.
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3 className="text-xl font-bold">CirrusLabs Pvt Ltd — AI Intern</h3>
            <p className="text-gray-400 mt-2">
              May 2025 – Jul 2025 • Bengaluru, India <br /><br />
              Built advanced LLM chatbots, AI agents, and ML pipelines using Streamlit and FastAPI.
            </p>
          </div>

        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl mb-10">Education</h2>

        <div className="space-y-6">
          <div className="p-6 border rounded-2xl">
            <h3>B.Tech Computer Science Engineering (AI)</h3>
            <p className="text-gray-400">
              Manipal Institute of Technology • 2022 – 2026 • CGPA: 8.26
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3>12th Grade</h3>
            <p className="text-gray-400">
              Narayana PU College • 90.33%
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3>10th Grade</h3>
            <p className="text-gray-400">
              Frank Anthony Public School • 95%
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl mb-10">Projects</h2>

        <ul className="text-gray-400 space-y-3">
          <li>• PDF summarizing chatbot & medical image analysis tool</li>
          <li>• Speech-to-text system using NLP & OpenAI</li>
          <li>• AI trip planner with 7 APIs (LangGraph, FastAPI)</li>
          <li>• Crop yield prediction using CNN-RNN-LSTM</li>
          <li>• Car price prediction ML pipeline (99% accuracy)</li>
          <li>• RAG systems, web scraping & PowerBI analytics</li>
        </ul>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 text-center">
        <h2 className="text-4xl mb-6">Skills</h2>
        <p className="text-gray-400 max-w-4xl mx-auto">
          Python • ML • DL • NLP • Computer Vision • RAG • LLM • AI Agents • LangChain • FastAPI • React • Node • SQL • Docker • Cloud
        </p>
      </section>

      {/* LANGUAGES */}
      <section className="py-20 text-center">
        <h2 className="text-4xl mb-6">Languages</h2>
        <p className="text-gray-400">
          English (Native) • Hindi (Proficient) • Kannada (Advanced)
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 text-center">
        <h2 className="text-4xl mb-6">Contact</h2>

        <div className="flex flex-col items-center gap-3 text-gray-400">

          <a href="mailto:coooltejasdagr@gmail.com" className="flex items-center gap-2 hover:text-white">
            <FaEnvelope /> coooltejasdagr@gmail.com
          </a>

          <p className="text-sm text-gray-500">
            tejas2.mitblr2022@learner.manipal.edu
          </p>

          <p>+91 7019280175</p>

        </div>

        <div className="flex justify-center gap-8 mt-6 text-xl">

          <a href="https://github.com/Tejasdagr8" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>

          <a href="https://www.linkedin.com/in/tejas-melkote-390545309/" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Tejas Melkote. All rights reserved.
      </footer>

    </div>
  );
}

export default App;