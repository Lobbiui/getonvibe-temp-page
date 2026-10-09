import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Compass,
  ExternalLink,
  Eye,
  Heart,
  Link2,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const platformSteps = [
  { icon: Link2, label: "Connect", copy: "Bring official profiles, work, events, streams, releases, websites, and shops into one creator or business presence." },
  { icon: Radio, label: "Share", copy: "Publish original work on GetOnVibe and highlight approved content from the places where you already create." },
  { icon: Compass, label: "Get discovered", copy: "Pulse, Swipe, Search, Events, and profiles create more ways for new people to find you." },
  { icon: ExternalLink, label: "Continue at the source", copy: "Send people to the official stream, release, website, shop, event, or destination you choose." },
];

const availability = [
  { status: "Core beta", title: "The discovery foundation", copy: "Pulse, Swipe, profiles, Around The Web, follows, events, and connected official destinations lead the first experience." },
  { status: "Launching in phases", title: "Insights and opportunities", copy: "Creator insights, business matching, campaign support, advertising, and deeper audience tools expand through controlled releases." },
  { status: "Later phase", title: "Momentum and Commerce", copy: "Momentum grows from real GetOnVibe activity. Paid memberships and transactions remain part of the separate Commerce plan." },
];

export function PlatformStory() {
  return (
    <>
      <section className="gateway-clarity-intro" aria-labelledby="platform-definition-title">
        <p>The discovery and amplification layer</p>
        <h2 id="platform-definition-title">Not another place to start over.</h2>
        <div>
          <strong>GetOnVibe turns a scattered online presence into one identity people can actively discover.</strong>
          <span>Creators and businesses keep the platforms, audiences, websites, and destinations they already have. GetOnVibe connects the trail, gives it context, and creates new ways for people to find the full picture.</span>
        </div>
      </section>

      <section className="gateway-how-it-works" aria-labelledby="platform-how-title">
        <div className="gateway-section-heading">
          <p>How GetOnVibe works</p>
          <h2 id="platform-how-title">From scattered presence to active discovery.</h2>
        </div>
        <ol>
          {platformSteps.map(({ icon: Icon, label, copy }, index) => (
            <li key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon aria-hidden="true" size={22} />
              <h3>{label}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gateway-linkpage-comparison" aria-labelledby="comparison-title">
        <div>
          <p>More than a link page</p>
          <h2 id="comparison-title">A list waits.<br />GetOnVibe introduces.</h2>
        </div>
        <div className="gateway-comparison-columns">
          <article>
            <span>Traditional link page</span>
            <h3>A destination people must already know to visit.</h3>
            <ul><li>Displays a list of links</li><li>Depends on an audience arriving first</li><li>Offers limited context around the work</li></ul>
          </article>
          <article className="is-getonvibe">
            <span>GetOnVibe</span>
            <h3>An active presence designed to help new people find you.</h3>
            <ul><li>Connects work, identity, events, and official destinations</li><li>Creates discovery through Pulse and Swipe</li><li>Gives audiences a reason to explore the whole story</li></ul>
          </article>
        </div>
      </section>
    </>
  );
}

export function PlatformTrustAndLaunch() {
  return (
    <>
      <section className="gateway-three-audiences" aria-labelledby="audiences-title">
        <div className="gateway-section-heading">
          <p>Built for the full discovery loop</p>
          <h2 id="audiences-title">Everyone has a reason to return.</h2>
        </div>
        <div>
          <article><Sparkles size={22} /><h3>Creators</h3><p>Bring the whole creative presence together, reach beyond the current audience, and open clearer paths to collaboration.</p><Link href="/creators">Creator benefits <ArrowRight size={16} /></Link></article>
          <article><BarChart3 size={22} /><h3>Businesses</h3><p>Become easier to discover, find creators with the right fit, and build campaigns that can travel beyond one platform.</p><Link href="/businesses">Business benefits <ArrowRight size={16} /></Link></article>
          <article><Heart size={22} /><h3>Fans and community</h3><p>Find creators outside the usual feed, explore their complete world, and continue to every official destination.</p><Link href="/early-access">Join as a fan <ArrowRight size={16} /></Link></article>
        </div>
      </section>

      <section className="gateway-originality-principles" aria-labelledby="originality-title">
        <div>
          <p>Original people. Clear sources.</p>
          <h2 id="originality-title">Discovery built around trust.</h2>
          <span>GetOnVibe is being designed to amplify original work without pretending to own the places where that work began.</span>
        </div>
        <ul>
          <li><BadgeCheck size={20} /><span><strong>Clear attribution</strong>Native posts and external destinations remain visibly distinct.</span></li>
          <li><ShieldCheck size={20} /><span><strong>Creator control</strong>Creators choose the official links and work represented on their presence.</span></li>
          <li><Search size={20} /><span><strong>No unauthorized scraping</strong>External work is connected through approved links and future official integrations.</span></li>
          <li><Eye size={20} /><span><strong>Honest engagement</strong>GetOnVibe activity is not presented as imported social-platform performance.</span></li>
        </ul>
      </section>

      <section className="gateway-release-map" aria-labelledby="release-map-title">
        <div className="gateway-section-heading"><p>Built in phases</p><h2 id="release-map-title">What arrives when.</h2><span>Every major capability is presented according to its actual release stage.</span></div>
        <div>{availability.map((item) => <article key={item.status}><span>{item.status}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>
    </>
  );
}

const discoveryPoints = [
  { icon: Radio, title: "Pulse", copy: "Original posts, video, pictures, and events move through a full-screen creator feed." },
  { icon: Compass, title: "Swipe", copy: "Creator cards and work can reach people beyond the audiences who already know what to search for." },
  { icon: Search, title: "Search and profiles", copy: "Categories, interests, locations, official destinations, and complete profiles make discovery intentional." },
  { icon: CalendarDays, title: "Events", copy: "Appearances, performances, pop-ups, launches, and activations create another path into the complete creator presence." },
];

export function CreatorCoreValue() {
  return (
    <>
      <section className="gateway-clarity-intro is-creator" aria-labelledby="creator-core-title">
        <p>The everyday creator benefit</p>
        <h2 id="creator-core-title">Keep creating where you create.</h2>
        <div><strong>GetOnVibe helps new people discover the full picture.</strong><span>Your profile can connect original work, social posts, streams, releases, events, stores, memberships, and official links without asking you to rebuild your audience from zero.</span></div>
      </section>

      <section className="gateway-creator-proof" aria-labelledby="creator-profile-proof-title">
        <div className="gateway-creator-proof-copy">
          <p>Illustrative creator profile</p>
          <h2 id="creator-profile-proof-title">One creator.<br />The whole world.</h2>
          <span>A creator presence is designed to show more than links. It gives the work context and gives every visitor a next step.</span>
          <ul><li>Original GetOnVibe posts</li><li>Around The Web highlights</li><li>Streams, releases, events, and appearances</li><li>Official website, store, and support destinations</li><li>Business contact and collaboration paths</li></ul>
        </div>
        <div className="gateway-creator-profile-demo" aria-label="Illustrative GetOnVibe creator profile">
          <div className="gateway-creator-profile-cover"><span>Illustrative profile</span><strong>Studio Relay</strong></div>
          <div className="gateway-creator-profile-identity"><i>SR</i><div><h3>Studio Relay</h3><p>@studiorelay / Independent music and visual stories</p></div><button type="button">Follow</button></div>
          <nav aria-label="Illustrative creator profile sections"><span>Posts</span><span>Around The Web</span><span>Events</span><span>Official Links</span></nav>
          <div className="gateway-creator-profile-content"><article><small>Original post</small><strong>Behind the session</strong><span>Created here and connected to the artist.</span></article><article><small>Around The Web</small><strong>New release</strong><span>Official link to the creator destination.</span></article><article><small>Upcoming</small><strong>Live set</strong><span>Appearance details and event connection.</span></article></div>
        </div>
      </section>

      <section className="gateway-discovery-paths" aria-labelledby="creator-discovery-title">
        <div className="gateway-section-heading"><p>How discovery happens</p><h2 id="creator-discovery-title">More doors into your work.</h2><span>Each surface creates a different reason for someone new to stop, understand, and follow.</span></div>
        <div>{discoveryPoints.map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={21} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="gateway-insight-strip" aria-label="Planned creator insights">
        <div><p>Creator insights / Launching in phases</p><h2>Understand what connects.</h2></div>
        <ul><li>Profile views</li><li>Content views</li><li>Saves and shares</li><li>Followers gained</li><li>Swipe hearts</li><li>Engagement rate</li></ul>
        <span>Insights will use GetOnVibe activity. External platform metrics will not be claimed without an authorized source.</span>
      </section>
    </>
  );
}

const businessWorkflow = [
  "Create a business presence and connect the official destinations you control.",
  "Share announcements, events, launches, and approved Around The Web highlights.",
  "Tell GetOnVibe about the audience, creator, event, or campaign need.",
  "Review creator-fit context, responsibilities, compensation, and content terms.",
  "Launch the relationship directly or with GetOnVibe campaign support when available.",
];

export function BusinessCoreValue() {
  return (
    <>
      <section className="gateway-clarity-intro is-business" aria-labelledby="business-core-title">
        <p>Visibility plus creator connection</p>
        <h2 id="business-core-title">Be easier to find. Know who fits.</h2>
        <div><strong>GetOnVibe helps businesses become part of the discovery experience, not only the transaction.</strong><span>Build a connected presence, bring campaigns and events into view, find relevant creators, and send interested people to the official website or shop you already control.</span></div>
      </section>

      <section className="gateway-business-fit" aria-labelledby="business-fit-title">
        <div className="gateway-section-heading"><p>Built for businesses of many sizes</p><h2 id="business-fit-title">If community matters, there is a place here.</h2></div>
        <div>{["Local businesses", "Restaurants and food trucks", "Venues and event organizers", "Apparel and lifestyle brands", "Festival vendors", "Wellness businesses", "Alternative-product businesses", "Manufacturers and associations"].map((name) => <span key={name}>{name}</span>)}</div>
      </section>

      <section className="gateway-business-workflow" aria-labelledby="business-workflow-title">
        <div><p>A practical path</p><h2 id="business-workflow-title">From visibility to the right conversation.</h2><span>Businesses can begin with discovery, then choose self-directed relationships or hands-on campaign support as those services launch.</span></div>
        <ol>{businessWorkflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="gateway-report-preview" aria-labelledby="report-preview-title">
        <div className="gateway-report-copy"><p>Creator report concept / Launching in phases</p><h2 id="report-preview-title">Context beyond follower count.</h2><span>Creator reports are intended to help businesses understand fit using authorized information and real GetOnVibe activity.</span></div>
        <div className="gateway-report-sheet">
          <div><span>Creator fit overview</span><strong>Studio Relay</strong><small>Illustrative report</small></div>
          <dl><div><dt>Creative style</dt><dd>Live music and visual storytelling</dd></div><div><dt>Community response</dt><dd>Saves, shares, profile interest</dd></div><div><dt>Location relevance</dt><dd>Regional events and audiences</dd></div><div><dt>Campaign alignment</dt><dd>Launches, experiences, culture</dd></div></dl>
          <p><BadgeCheck size={18} /> Recommendations consider work, audience response, geography, values, category, and campaign goals. The business makes the final partnership decision.</p>
        </div>
      </section>
    </>
  );
}

export function InformationFAQ({ audience }: { audience: "platform" | "creator" | "business" }) {
  const questions = audience === "creator" ? [
    ["Do I have to stop using my current platforms?", "No. GetOnVibe is designed to connect and amplify your existing presence, not replace the places where you already create."],
    ["Does early access guarantee paid work?", "No. Joining expresses interest. Every paid assignment requires separate selection, a clear brief, agreed compensation, deliverables, and usage terms."],
    ["Who controls my destinations?", "You choose the official websites, streams, stores, releases, events, and approved links represented on your profile."],
  ] : audience === "business" ? [
    ["Does GetOnVibe replace my website or shop?", "No. GetOnVibe creates discovery and sends people to the connected websites and commerce destinations you control."],
    ["How will creator recommendations work?", "Planned recommendations consider creative style, category, geography, audience response, values, and campaign goals. Follower count is not the only measure."],
    ["Can GetOnVibe run a campaign for us?", "Hands-on campaign support, creator reports, content planning, and advertising are planned to launch in phases with clear scopes and terms."],
  ] : [
    ["Is GetOnVibe another social network?", "It is a discovery and amplification platform. Native activity and profiles work alongside official destinations from across the web."],
    ["Does GetOnVibe import social metrics?", "GetOnVibe does not claim external likes, views, comments, or follower counts without an authorized source."],
    ["Does early access create an account?", "No. It joins the interest list so GetOnVibe can share launch and onboarding updates for the paths you select."],
  ];

  return <section className="gateway-information-faq" aria-labelledby={`${audience}-faq-title`}><div><p>Clear answers</p><h2 id={`${audience}-faq-title`}>Before you join.</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>;
}
