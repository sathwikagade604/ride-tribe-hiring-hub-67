
import React from 'react';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import LandingHero from '@/components/access/LandingHero';
import QuickAccessGrid from '@/components/access/QuickAccessGrid';
import FeatureHighlights from '@/components/access/FeatureHighlights';

const Access = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <LandingHero isAuthenticated={!!user} />
        <QuickAccessGrid isAuthenticated={!!user} />
        <FeatureHighlights />
      </div>
    </PageLayout>
  );
};

export default Access;
