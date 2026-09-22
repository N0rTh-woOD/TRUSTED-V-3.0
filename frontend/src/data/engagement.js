/** Engagement models — source: website_updates_models.pdf */
export const ENGAGEMENT_MODELS = [
  {
    id: "saas",
    code: "SaaS",
    label: "Software as a Service",
    tagline: "Let's build it for you.",
    hook: "Hand us the blueprint. We turn your specs into shipped hardware and firmware.",
    fit: "You have a product idea or specification, and want a delivered, ready-to-deploy system.",
    cta: { label: "Start a build", to: "/contact?plan=saas" },
    steps: [
      { title: "Board sourcing", desc: "Quality circuit boards from a trusted manufacturer network." },
      { title: "Component selection", desc: "Chips and components matched to your application." },
      { title: "Custom PCB design", desc: "Optimised for performance, reliability and scale." },
      { title: "Software testing", desc: "Embedded firmware developed and validated for stability." },
      { title: "End-to-end delivery", desc: "A complete hardware + software solution, ready to deploy." },
    ],
  },
  {
    id: "paas",
    code: "PaaS",
    label: "Platform as a Service",
    tagline: "Your code, our ecosystem.",
    hook: "Code, test and scale on the TRUSTED-V platform with our engineers behind you.",
    fit: "You have an engineering team and want the tooling, marketplace and expert support to move faster.",
    cta: { label: "Subscribe to the platform", to: "/contact?plan=paas" },
    steps: [
      { title: "Platform subscription", desc: "Subscribe and access the complete development ecosystem." },
      { title: "Free feature access", desc: "Start immediately with a curated set of complimentary tools." },
      { title: "Marketplace selection", desc: "Pick the exact boards and chips your project needs." },
      { title: "Build, test & generate code", desc: "Develop in Jarvyn IDE with code generation and testing." },
      { title: "Expert guidance", desc: "Connect directly with our engineers when you hit a roadblock." },
    ],
  },
];
