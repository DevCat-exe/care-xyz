import ServiceDetailClient from "@/components/ServiceDetailClient";

// Helper to fetch service data on the server
async function getService(id) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/services/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }) {
    const { service_id } = await params;
    const service = await getService(service_id);

    if (!service) {
        return {
            title: "Service Not Found - Care.xyz",
        };
    }

    return {
        title: `${service.name} - Care.xyz`,
        description: service.description || `Premium ${service.name} services provided by Care.xyz. Reliable and trusted care for your family.`,
    };
}

export default async function ServicePage({ params }) {
    const { service_id } = await params;
    const service = await getService(service_id);

    if (!service) return <p className="p-10">Service not found.</p>;

    return <ServiceDetailClient service={service} />;
}