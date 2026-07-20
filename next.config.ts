import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Permanent redirects for feature-menu URLs that were publicly linked before the
    // navigation fix (and may be indexed). Each destination is a semantically verified
    // existing page. Unresolved product concepts deliberately have NO redirect.
    return [
      { source: "/features/channel-management", destination: "/features/channel-manager", permanent: true },
      { source: "/features/unified-calendar", destination: "/features/availability-calendar", permanent: true },
      { source: "/features/website-builder", destination: "/features/direct-booking-website", permanent: true },
      { source: "/features/pay-link", destination: "/features/payment-collection", permanent: true },
      { source: "/features/ttlock-integration", destination: "/integrations/ttlock", permanent: true },
      { source: "/features/tuya-integration", destination: "/integrations/tuya", permanent: true },
      { source: "/features/whatsapp-sms", destination: "/integrations/whatsapp", permanent: true },
      { source: "/features/sms-notifications", destination: "/integrations/vfirst-sms", permanent: true },
    ];
  },
};

export default nextConfig;
