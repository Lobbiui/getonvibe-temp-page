import { redirect } from "next/navigation";
import { getAccountSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalDashboard } from "@/components/PortalDashboard";

export const metadata = {
  title: "ONVIBE Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getAccountSession();

  if (!session) {
    redirect("/login");
  }

  const account = await prisma.account.findUnique({
    where: { id: session.accountId },
  });

  if (!account || account.status === "SUSPENDED") {
    redirect("/login");
  }

  const events = await prisma.event.findMany({
    where: { isPublished: true },
    include: {
      interests: {
        where: { accountId: account.id },
        take: 1,
      },
    },
    orderBy: { startsAt: "asc" },
  });

  return (
    <PortalDashboard
      account={{
        id: account.id,
        role: account.role,
        status: account.status,
        name: account.name,
        email: account.email,
        vendorType: account.vendorType,
      }}
      events={events.map((event) => ({
        id: event.id,
        title: event.title,
        venue: event.venue,
        address: event.address,
        city: event.city,
        startsAt: event.startsAt.toISOString(),
        description: event.description,
        interest: event.interests[0]
          ? {
              id: event.interests[0].id,
              status: event.interests[0].status,
              note: event.interests[0].note,
            }
          : null,
      }))}
    />
  );
}
