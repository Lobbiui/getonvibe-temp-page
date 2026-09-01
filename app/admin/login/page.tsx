import { AdminLoginForm } from "@/components/AdminLoginForm";

export const metadata = {
  title: "ONVIBE Admin Login",
};

export default function AdminLoginPage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <p>ONVIBE Admin</p>
        <h1>Dashboard Login</h1>
        <span>Manage accounts, events, selections, interest, and outbound messages.</span>
      </section>
      <AdminLoginForm />
    </main>
  );
}
