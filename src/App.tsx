import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Code-split every page — only the current route's JS is loaded
const Index         = lazy(() => import('./pages/Index'));
const SobreNos      = lazy(() => import('./pages/SobreNos'));
const Produtos      = lazy(() => import('./pages/Produtos'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Revendedor    = lazy(() => import('./pages/Revendedor'));
const Assistencia   = lazy(() => import('./pages/Assistencia'));
const Contato       = lazy(() => import('./pages/Contato'));
const NotFound      = lazy(() => import('./pages/NotFound'));
const AdminLogin    = lazy(() => import('./pages/admin/Login'));
const AdminLeads    = lazy(() => import('./pages/admin/Leads'));

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"              element={<Index />} />
            <Route path="/sobre"         element={<SobreNos />} />
            <Route path="/produtos"      element={<Produtos />} />
            <Route path="/produto/:slug" element={<ProductDetail />} />
            <Route path="/revendedor"    element={<Revendedor />} />
            <Route path="/assistencia"   element={<Assistencia />} />
            <Route path="/contato"       element={<Contato />} />
            <Route path="/admin/login"   element={<AdminLogin />} />
            <Route path="/admin/leads"   element={<AdminProtectedRoute><AdminLeads /></AdminProtectedRoute>} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
