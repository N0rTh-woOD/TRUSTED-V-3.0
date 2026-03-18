import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    // Row 1 - Leadership
    {
      name: "Yashwanth Singh M",
      role: "Founder",
      image: "/team/yashwanth.jpg",
      category: "Leadership",
    },
    {
      name: "Sriram Varma",
      role: "Business Development",
      image: "/team/sriram.jpg",
      category: "Leadership",
    },
    {
      name: "Abhishek Dhamale",
      role: "Co-Founder",
      image: "/team/abhishek.jpg",
      category: "Leadership",
    },
    // Row 2 - Management
    {
      name: "Ipsita",
      role: "Marketing Head",
      image: "/team/ipsita.jpg",
      category: "Management",
    },
    {
      name: "Brian",
      role: "Chief Architect",
      image: "/team/brian.jpg",
      category: "Management",
    },
    {
      name: "Imran",
      role: "Chief Engineer",
      image: "/team/imran.jpg",
      category: "Management",
    },
    // Row 3 - Architecture
    {
      name: "Karthik",
      role: "Embedded Architect",
      image: "/team/karthik.jpg",
      category: "Architecture",
    },
    {
      name: "Praveen",
      role: "Software Architect",
      image: "/team/praveen.jpg",
      category: "Architecture",
    },
    {
      name: "Shrinivas",
      role: "AI Architect",
      image: "/team/shrinivas.jpg",
      category: "Architecture",
    },
    // Row 4 - Engineering (Crypto & AI)
    {
      name: "Harika",
      role: "Crypto Engineer",
      image: "/team/harika.jpg",
      category: "Engineering",
    },
    {
      name: "Shivam",
      role: "Crypto Engineer",
      image: "/team/shivam.jpg",
      category: "Engineering",
    },
    {
      name: "Chandana",
      role: "AI Engineer",
      image: "/team/chandana.jpg",
      category: "Engineering",
    },
    // Row 5 - Engineering (Cloud, Security, QA)
    {
      name: "Pavan",
      role: "Cloud Engineer",
      image: "/team/pavan.jpg",
      category: "Engineering",
    },
    {
      name: "Reshma",
      role: "Security Manager",
      image: "/team/reshma.jpg",
      category: "Engineering",
    },
    {
      name: "Nishant",
      role: "Quality Gates",
      image: "/team/nishant.jpg",
      category: "Engineering",
    },
  ];

  // Get initials for placeholder
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get gradient based on role
  const getRoleGradient = (role) => {
    if (role.includes("Founder") || role.includes("Co-Founder")) {
      return "from-primary to-blue-600";
    }
    if (role.includes("Chief") || role.includes("Head")) {
      return "from-purple-500 to-indigo-600";
    }
    if (role.includes("Architect")) {
      return "from-orange-500 to-red-500";
    }
    if (role.includes("Crypto")) {
      return "from-green-500 to-emerald-600";
    }
    if (role.includes("AI")) {
      return "from-pink-500 to-rose-500";
    }
    if (role.includes("Cloud")) {
      return "from-cyan-500 to-blue-500";
    }
    if (role.includes("Security")) {
      return "from-red-500 to-orange-500";
    }
    if (role.includes("Quality")) {
      return "from-teal-500 to-green-500";
    }
    return "from-slate-500 to-slate-600";
  };

  // Profile Image Component with fallback
  const ProfileImage = ({ member, index }) => {
    const [imageError, setImageError] = useState(false);
    const isHovered = hoveredMember === index;

    return (
      <div 
        className={`
          relative w-32 h-32 mx-auto rounded-full overflow-hidden
          transition-all duration-500 ease-out
          ${isHovered ? "scale-110 shadow-2xl" : "shadow-lg"}
        `}
      >
        {/* Animated border ring */}
        <div 
          className={`
            absolute -inset-1 rounded-full bg-gradient-to-r ${getRoleGradient(member.role)}
            transition-all duration-500
            ${isHovered ? "opacity-100 animate-spin-slow" : "opacity-50"}
          `}
          style={{ animationDuration: "8s" }}
        />
        
        {/* Inner container */}
        <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white">
          {imageError ? (
            // Placeholder with initials
            <div 
              className={`
                w-full h-full flex items-center justify-center
                bg-gradient-to-br ${getRoleGradient(member.role)}
                text-white text-2xl font-bold
              `}
            >
              {getInitials(member.name)}
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        {/* Shine effect on hover */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0
            transition-all duration-700 ease-out
            ${isHovered ? "translate-x-full" : "-translate-x-full"}
          `}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet the People Behind{" "}
              <span className="text-primary">TrusteD-V</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A passionate team of engineers, architects, and innovators building India's 
              premier RISC-V development platform with Rust.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row Labels and Members */}
          {[
            { label: "Leadership", start: 0, end: 3 },
            { label: "Management", start: 3, end: 6 },
            { label: "Architecture", start: 6, end: 9 },
            { label: "Engineering", start: 9, end: 12 },
            { label: "Security & Quality", start: 12, end: 15 },
          ].map((section, sectionIndex) => (
            <div key={section.label} className="mb-16 last:mb-0">
              {/* Section Label */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-4">
                  {section.label}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              
              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {teamMembers.slice(section.start, section.end).map((member, index) => {
                  const globalIndex = section.start + index;
                  return (
                    <Card
                      key={member.name}
                      data-testid={`team-member-${globalIndex}`}
                      className={`
                        w-full max-w-xs bg-white border border-border
                        transition-all duration-500 ease-out cursor-pointer
                        hover:shadow-xl hover:-translate-y-2 hover:border-primary/30
                        group
                      `}
                      onMouseEnter={() => setHoveredMember(globalIndex)}
                      onMouseLeave={() => setHoveredMember(null)}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <CardContent className="p-8 text-center">
                        {/* Profile Image */}
                        <ProfileImage member={member} index={globalIndex} />
                        
                        {/* Name */}
                        <h3 
                          className={`
                            mt-6 text-lg font-semibold text-foreground
                            transition-all duration-300
                            group-hover:text-primary
                          `}
                        >
                          {member.name}
                        </h3>
                        
                        {/* Role Badge */}
                        <div className="mt-2">
                          <span 
                            className={`
                              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                              bg-gradient-to-r ${getRoleGradient(member.role)} text-white
                              transition-all duration-300
                              group-hover:shadow-md group-hover:scale-105
                            `}
                          >
                            {member.role}
                          </span>
                        </div>
                        
                        {/* Social Links (placeholder) */}
                        <div 
                          className={`
                            flex items-center justify-center gap-3 mt-5
                            transition-all duration-500
                            ${hoveredMember === globalIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                          `}
                        >
                          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
