import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = {
  title: "ONVIBE Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [accounts, events, interests] = await Promise.all([
    prisma.account.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.event.findMany({ orderBy: { startsAt: "asc" } }),
    prisma.eventInterest.findMany({
      include: {
        account: true,
        event: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <AdminDashboard
      accounts={accounts.map((account) => ({
        id: account.id,
        role: account.role,
        status: account.status,
        name: account.name,
        email: account.email,
        phone: account.phone,
        city: account.city,
        instagram: account.instagram,
        businessName: account.businessName,
        vendorType: account.vendorType,
        createdAt: account.createdAt.toISOString(),
      }))}
      events={events.map((event) => ({
        id: event.id,
        title: event.title,
        city: event.city,
        venue: event.venue,
        address: event.address,
        startsAt: event.startsAt.toISOString(),
      }))}
      interests={interests.map((interest) => ({
        id: interest.id,
        status: interest.status,
        note: interest.note,
        account: {
          id: interest.account.id,
          role: interest.account.role,
          status: interest.account.status,
          name: interest.account.name,
          email: interest.account.email,
          phone: interest.account.phone,
          city: interest.account.city,
          instagram: interest.account.instagram,
          businessName: interest.account.businessName,
          vendorType: interest.account.vendorType,
          createdAt: interest.account.createdAt.toISOString(),
        },
        event: {
          id: interest.event.id,
          title: interest.event.title,
          city: interest.event.city,
          venue: interest.event.venue,
          address: interest.event.address,
          startsAt: interest.event.startsAt.toISOString(),
        },
      }))}
    />
  );
}
