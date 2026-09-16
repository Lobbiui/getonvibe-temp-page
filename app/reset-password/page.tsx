import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export const metadata = {
  title: "Reset ONVIBE Password",
};

export default function ResetPasswordPage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <p>ONVIBE Access</p>
        <h1>Reset Password</h1>
        <span>Create a new password so you can log in, view events, and sign required forms.</span>
      </section>
      <Suspense fallback={<p className="dashboard-status mx-auto max-w-xl">Loading reset form.</p>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
