import { AccountAccess } from "@/components/AccountAccess";

export const metadata = {
  title: "ONVIBE Account Access",
};

export default function LoginPage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <p>ONVIBE Access</p>
        <h1>Register or Login</h1>
        <span>Models, vendors, creators, and attendees can register, view upcoming events, and track event updates.</span>
      </section>
      <AccountAccess />
    </main>
  );
}
