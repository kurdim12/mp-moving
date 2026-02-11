export interface Project {
  id: string;
  name: string;
  descriptor: string;
  image: string;
  size: "large" | "medium" | "small";
  intro: string;
  role: string;
  tools: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: "urbanflow",
    name: "UrbanFlow",
    descriptor: "Mobility Web Platform",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    size: "large",
    intro: "A comprehensive mobility platform connecting urban commuters with real-time transit data across multiple networks.",
    role: "Strategy / Design / Development",
    tools: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    outcome: "Reduced average commute planning time by 40% across three pilot cities.",
  },
  {
    id: "vaultline",
    name: "Vaultline",
    descriptor: "Fintech Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    size: "medium",
    intro: "Real-time financial analytics dashboard for institutional clients managing complex portfolios.",
    role: "Design / Development",
    tools: ["TypeScript", "D3.js", "WebSocket", "AWS"],
    outcome: "Processing 2M+ data points daily with sub-second visualization updates.",
  },
  {
    id: "terravox",
    name: "Terravox",
    descriptor: "Climate Intelligence",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80",
    size: "medium",
    intro: "Environmental monitoring system aggregating satellite and IoT sensor data for agricultural decision-making.",
    role: "Strategy / Design / Development",
    tools: ["Python", "React", "TensorFlow", "GCP"],
    outcome: "Enabled 200+ farms to reduce water usage by 25% through predictive insights.",
  },
  {
    id: "nomad",
    name: "Nomad",
    descriptor: "Travel Operations Platform",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    size: "large",
    intro: "End-to-end operations platform for boutique travel companies managing custom itineraries at scale.",
    role: "Product Strategy / Development",
    tools: ["Next.js", "Prisma", "Stripe", "Vercel"],
    outcome: "Automated 60% of manual booking workflows, tripling operator capacity.",
  },
  {
    id: "pulseware",
    name: "Pulseware",
    descriptor: "Health Tech Interface",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    size: "small",
    intro: "Patient monitoring interface for clinical teams requiring real-time vital sign tracking.",
    role: "Interface Design",
    tools: ["React", "WebSocket", "FHIR API"],
    outcome: "Deployed across 12 clinical sites with zero critical UI incidents.",
  },
  {
    id: "arcstudio",
    name: "ArcStudio",
    descriptor: "Creative Collaboration Tool",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    size: "small",
    intro: "Real-time collaborative workspace for design teams working across distributed environments.",
    role: "Design / Development",
    tools: ["Canvas API", "WebRTC", "Redis", "React"],
    outcome: "Adopted by 50+ design teams with 4.8/5 satisfaction rating.",
  },
  {
    id: "meridian",
    name: "Meridian",
    descriptor: "Logistics Intelligence",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=800&q=80",
    size: "medium",
    intro: "Supply chain visibility platform providing real-time tracking and predictive delay analysis.",
    role: "Strategy / Development",
    tools: ["Go", "React", "PostgreSQL", "Kubernetes"],
    outcome: "Reduced shipment delays by 35% through ML-powered route optimization.",
  },
  {
    id: "lumiere",
    name: "Lumière",
    descriptor: "E-Commerce Experience",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    size: "medium",
    intro: "Premium e-commerce platform for a luxury goods brand requiring editorial-quality product experiences.",
    role: "Design / Development",
    tools: ["Shopify Plus", "React", "Three.js", "Contentful"],
    outcome: "Increased conversion rate by 28% and average session duration by 45%.",
  },
];
