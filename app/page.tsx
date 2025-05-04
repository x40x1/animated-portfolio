"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown, ExternalLink, Github, Linkedin, Mail, Menu, X, Twitter, Instagram, Dribbble } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import ProjectCard from "@/components/project-card"
import ThreeDModel from "@/components/three-d-model"
import { useMobile } from "@/hooks/use-mobile"

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMobile()
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100])
  const [activeSection, setActiveSection] = useState("home")
  const sections = ["home", "about", "projects", "skills", "contact"]

  const projects = [
    {
      id: 1,
      title: "Immersive 3D Experience",
      description: "An award-winning interactive 3D web experience for a luxury brand",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Three.js", "WebGL", "GSAP"],
      link: "#",
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A high-performance e-commerce platform with advanced animations",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Framer Motion", "Stripe"],
      link: "#",
    },
    {
      id: 3,
      title: "AI-Powered Dashboard",
      description: "Real-time data visualization with AI-driven insights",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "D3.js", "TensorFlow.js"],
      link: "#",
    },
    {
      id: 4,
      title: "Mobile AR Application",
      description: "Augmented reality experience for iOS and Android",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "ARKit", "ARCore"],
      link: "#",
    },
  ]

  const skills = [
    { name: "Frontend Development", level: 95 },
    { name: "3D & WebGL", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "Animation", level: 92 },
    { name: "Backend Development", level: 80 },
    { name: "Mobile Development", level: 75 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.body.offsetHeight

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <CustomCursor />

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/20"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Portfolio
          </motion.div>

          {isMobile ? (
            <div className="relative z-50">
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                {menuOpen ? <X /> : <Menu />}
              </Button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-black/80 backdrop-blur-lg rounded-lg shadow-xl"
                  >
                    {sections.map((section) => (
                      <Link
                        key={section}
                        href={`#${section}`}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm capitalize hover:bg-white/10 transition-colors",
                          activeSection === section ? "text-purple-400" : "text-white",
                        )}
                      >
                        {section}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <nav className="flex space-x-8">
              {sections.map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className={cn(
                    "relative text-sm uppercase tracking-wider hover:text-purple-400 transition-colors",
                    activeSection === section ? "text-purple-400" : "text-white",
                  )}
                >
                  {activeSection === section && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                    />
                  )}
                  {section}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              <span className="block">Creative</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Digital Artist
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Crafting immersive digital experiences that push the boundaries of web technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-6 rounded-full"
              >
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full"
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square w-full max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl transform -rotate-3"></div>
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-600/20">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-white">
                I create <span className="text-purple-400">digital experiences</span> that leave lasting impressions
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With over a decade of experience in digital design and development, I specialize in creating immersive
                web experiences that combine cutting-edge technology with stunning visuals. My work spans from
                interactive 3D websites to complex web applications, always with a focus on performance and user
                experience.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I believe that great digital products should not only look beautiful but also provide meaningful
                interactions that engage users on multiple levels. My approach combines technical expertise with
                creative vision to deliver results that exceed expectations.
              </p>

              <div className="flex flex-wrap gap-4">
                {["Creative Direction", "3D Development", "UI/UX Design", "Frontend Architecture"].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              A selection of my most innovative and challenging projects that showcase my skills and creativity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full"
            >
              <Link href="#">
                View All Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-black to-purple-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Skills & Expertise</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-white">Technical Proficiency</h3>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">My Approach</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-400">Research & Strategy</h4>
                  <p className="text-gray-300">
                    Every project begins with thorough research and strategic planning to ensure we're solving the right
                    problems.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-400">Design & Prototyping</h4>
                  <p className="text-gray-300">
                    Creating visually stunning designs and interactive prototypes that communicate the core experience.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-400">Development & Optimization</h4>
                  <p className="text-gray-300">
                    Building with clean, efficient code and optimizing for performance across all devices and platforms.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-400">Testing & Refinement</h4>
                  <p className="text-gray-300">
                    Rigorous testing and iterative refinement to ensure the final product exceeds expectations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              Interested in working together? Let's discuss your project and see how I can help bring your vision to
              life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/5 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Email</h4>
                    <a
                      href="mailto:hello@example.com"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/5 p-3 rounded-full">
                    <Linkedin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">LinkedIn</h4>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/5 p-3 rounded-full">
                    <Github className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">GitHub</h4>
                    <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                      github.com/yourusername
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-white">Let's Connect</h3>
                <p className="text-gray-300 mb-6">Follow me on social media to see my latest work and updates.</p>

                <div className="flex space-x-4">
                  {/* Social icons */}
                  <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full transition-colors" aria-label="Twitter">
                    <Twitter className="h-6 w-6 text-purple-400" />
                  </a>
                  <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full transition-colors" aria-label="Instagram">
                    <Instagram className="h-6 w-6 text-purple-400" />
                  </a>
                  <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full transition-colors" aria-label="Dribbble">
                    <Dribbble className="h-6 w-6 text-purple-400" />
                  </a>
                  {/* <a href="#" className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full transition-colors" aria-label="Behance">
                    <Behance className="h-6 w-6 text-purple-400" />
                  </a> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Portfolio
              </div>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} All rights reserved.</p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {sections.map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors capitalize"
                >
                  {section}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
