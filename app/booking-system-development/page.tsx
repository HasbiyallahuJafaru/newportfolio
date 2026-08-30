import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { getServicePage } from "@/lib/servicePages";
import { serviceMetadata, serviceJsonLd } from "@/lib/serviceSeo";

const page = getServicePage("booking-system-development");

export const metadata: Metadata = page
  ? serviceMetadata(page)
  : { title: "Not found" };

export default function Page() {
  if (!page) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page)) }}
      />
      <ServicePage page={page} />
    </>
  );
}
