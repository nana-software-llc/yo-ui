import { Suspense } from "react";
import type { Metadata } from "next";

import PageHeader from "@/components/page-header";

import ComponentsContainer from "./components-container";
import { SiteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Search a ${SiteConfig.name} component`,
  description: `Search for components in the ${SiteConfig.name} library.`,
};

export default function Page() {
  return (
    <>
      <PageHeader title={`Search ${SiteConfig.name}`} className="mb-10">
        Use this page to quickly find a component (e.g., multiselect, vertical
        slider, etc.)
      </PageHeader>
      <Suspense>
        <ComponentsContainer />
      </Suspense>
    </>
  );
}
