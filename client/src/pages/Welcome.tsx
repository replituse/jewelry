import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const [, setLocation] = useLocation();

  const handleExploreCatalog = () => {
    setLocation("/catalog");
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="welcome-video"
        >
          <source src="/VID.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Welcome Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-between z-10 px-4 py-12"
      >
        <div className="text-center mt-12">
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-4 text-white tracking-wide text-shadow-lg"
            data-testid="text-welcome-title"
          >
            <span className="text-primary">Jewelry</span> Catalog
          </h1>
          <p
            className="font-display text-xl md:text-2xl text-white text-center max-w-2xl text-shadow-md"
            data-testid="text-welcome-subtitle"
          >
            Discover Timeless Elegance and Exquisite Craftsmanship
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-12"
        >
          <Button
            onClick={handleExploreCatalog}
            size="lg"
            className="group relative px-10 py-6 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-full shadow-2xl hover:bg-white/10 hover:shadow-white/50 transition-all duration-300 flex items-center justify-center"
            data-testid="button-explore-catalog"
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              Explore Catalog
            </span>
            <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
