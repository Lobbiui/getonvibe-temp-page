import Link from "next/link";
import { ArrowUpRight, CalendarDays, Link2, Radio, Users } from "lucide-react";

export function IllustrativeCreatorProfile() {
  return (
    <section className="gateway-profile-example" aria-labelledby="profile-example-title">
      <div className="gateway-profile-example-copy">
        <p>Illustrative creator profile</p>
        <h2 id="profile-example-title">One creator.<br /><strong>The whole world.</strong></h2>
        <span>This example shows how a GetOnVibe profile is intended to connect original work, official destinations, audience activity, and upcoming moments without replacing where the creator already publishes.</span>
        <Link href="/creators">Explore the creator experience <ArrowUpRight size={18} /></Link>
      </div>
      <div className="gateway-profile-preview">
        <div className="gateway-profile-cover" aria-hidden="true"><span>SR</span></div>
        <div className="gateway-profile-identity">
          <div><p>Sample profile</p><h3>Studio Relay</h3><span>Independent music, live sessions, and visual stories</span></div>
          <a href="#early-access">Follow at launch</a>
        </div>
        <div className="gateway-profile-links">
          <span><Radio size={16} /> Latest stream</span>
          <span><Link2 size={16} /> Official website</span>
          <span><CalendarDays size={16} /> Live set • Date TBA</span>
        </div>
        <div className="gateway-profile-feed">
          <article><small>Original post</small><strong>Behind the session</strong><span>Created here and connected to the source.</span></article>
          <article><small>Around The Web</small><strong>New release</strong><span>Official link • Opens at the creator&apos;s destination.</span></article>
          <article><small><Users size={14} /> Community</small><strong>Momentum</strong><span>Coming in a later phase.</span></article>
        </div>
      </div>
    </section>
  );
}
