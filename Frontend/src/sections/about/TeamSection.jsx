// src/sections/about/TeamSection.jsx
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import SectionHeading from '@components/ui/SectionHeading';

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Principal Architect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    linkedin: '#',
    email: 'arjun@buildcare.in',
  },
  {
    name: 'Meera Joshi',
    role: 'Head of Interior Design',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    linkedin: '#',
    email: 'meera@buildcare.in',
  },
  {
    name: 'Rohit Verma',
    role: 'Lead Commercial Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    linkedin: '#',
    email: 'rohit@buildcare.in',
  },
  {
    name: 'Priya Nair',
    role: 'Senior Design Consultant',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    linkedin: '#',
    email: 'priya@buildcare.in',
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden" aria-label="Our team">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary-400/3 rounded-full blur-3xl" />
      
      <div className="container-custom">
        <SectionHeading
          subtitle="Our Team"
          title="Meet the Minds Behind the Magic"
          description="Our talented team of designers, architects, and project managers work together to bring your vision to life."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[3/4]">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} at Buildcare`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onLoad={(e) => e.target.classList.add('loaded')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Social overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary-400 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary-400 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                {/* Border accent */}
                <div className="absolute inset-0 rounded-2xl border border-primary-400/0 group-hover:border-primary-400/20 transition-colors duration-500" />
              </div>
              
              <h3 className="font-heading text-lg font-semibold text-dark-50 group-hover:text-primary-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-primary-400/70 text-sm font-accent mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}