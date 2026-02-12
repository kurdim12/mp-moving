import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import PortfolioProject from "./pages/PortfolioProject";
import PortfolioSection from "./pages/PortfolioSection";
import NotFound from "./pages/NotFound";
import BrandSystems from "./pages/BrandSystems";
import ProductPlatforms from "./pages/ProductPlatforms";
import AIAutomation from "./pages/AIAutomation";
import CoBuild from "./pages/CoBuild";
import WhatWeBuild from "./pages/WhatWeBuild";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioProject />} />
            <Route path="/portfolio/:slug/:section" element={<PortfolioSection />} />
            <Route path="/what-we-build" element={<WhatWeBuild />} />
            <Route path="/what-we-build/brand-systems" element={<BrandSystems />} />
            <Route path="/what-we-build/product-platforms" element={<ProductPlatforms />} />
            <Route path="/what-we-build/ai-automation" element={<AIAutomation />} />
            <Route path="/what-we-build/co-build" element={<CoBuild />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
