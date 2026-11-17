export const SERVICE_MODELS = [
  {
    id: "saas",
    code: "SaaS",
    label: "Software as a Service",
    tagline: "Build it with us.",
    hook: "Hand us the blueprint. We turn your specifications into shipped hardware and firmware.",
    fit: "You have a product idea or specification, and want a delivered, ready-to-deploy system.",
    cta: { label: "Start a project", to: "/contact?plan=saas" },
    steps: [
      { title: "Board sourcing", desc: "Quality circuit boards from a trusted manufacturer network." },
      { title: "Component selection", desc: "Chips and components matched to your application." },
      { title: "Custom PCB design", desc: "Optimized for performance, reliability and scale." },
      { title: "Software testing", desc: "Embedded firmware developed and validated for stability." },
      { title: "End-to-end delivery", desc: "A complete hardware and software solution, ready to deploy." },
    ],
  },
  {
    id: "paas",
    code: "PaaS",
    label: "Platform as a Service",
    tagline: "Your code. Our platform.",
    hook: "Develop, test and scale on the TRUSTED-V platform with our engineers behind you.",
    fit: "You have an engineering team and want the tooling, marketplace and expert support to move faster.",
    cta: { label: "Discuss platform access", to: "/contact?plan=paas" },
    steps: [
      { title: "Platform access", desc: "Access the complete development platform." },
      { title: "Development tooling", desc: "Follow planned releases for the development environment." },
      { title: "Marketplace selection", desc: "Pick the exact boards and chips your project needs." },
      { title: "Build & test", desc: "Prepare your build and test workflow with our engineering team." },
      { title: "Expert guidance", desc: "Connect directly with our engineers when you hit a roadblock." },
    ],
  },
];