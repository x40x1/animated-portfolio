"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-purple-300">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-6">{project.description}</p>

        <Link
          href={project.link}
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          View Project <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <motion.div
        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
      >
        <Link href={project.link} className="text-white">
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
