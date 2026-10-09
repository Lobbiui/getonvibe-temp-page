import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Heart,
  MessageCircle,
  RotateCcw,
  Send,
  Share2,
  UserPlus,
  X,
} from "lucide-react";

const pulseFilters = ["All", "Posts", "Videos", "Pictures", "Events"];
const swipeFilters = ["All", "Products", "Creators", "Stores", "Events", "Posts", "Live Vibes", "Around The Web"];

export function PlatformExperienceShowcase() {
  return (
    <section id="product-experience" className="gateway-experience-showcase" aria-labelledby="experience-showcase-title">
      <div className="gateway-experience-heading">
        <p>Inside GetOnVibe</p>
        <h2 id="experience-showcase-title">Discovery that feels alive.</h2>
        <span>
          These product previews are based on the current GetOnVibe beta design. Pulse lets people move through creator activity as a full-screen feed. Swipe turns discovery into a focused roulette-style deck. Profiles bring the complete creator presence together.
        </span>
      </div>

      <article className="gateway-experience-row gateway-experience-pulse">
        <div className="gateway-experience-copy">
          <span>01 / Pulse</span>
          <h3>The stream you choose.</h3>
          <p>Pulse is a full-screen, media-first feed for posts, video, pictures, and events. Follow the story, react, save, share, or open the creator without leaving the flow.</p>
          <ul>
            <li>Filter by posts, video, pictures, or events</li>
            <li>Creator details stay readable over the media</li>
            <li>Actions remain within reach on mobile and desktop</li>
          </ul>
        </div>
        <div className="gateway-pulse-demo" aria-label="Illustrative preview based on the current GetOnVibe Pulse design">
          <div className="gateway-demo-topline"><strong>Pulse</strong><span>Product preview</span></div>
          <div className="gateway-demo-filters">
            {pulseFilters.map((filter, index) => <span className={index === 0 ? "is-active" : ""} key={filter}>{filter}</span>)}
          </div>
          <div className="gateway-pulse-media" role="img" aria-label="Creator working in a colorful studio">
            <div className="gateway-pulse-status">Live Pulse</div>
            <div className="gateway-pulse-meta">
              <div><span>VC</span><strong>Vibe Creator</strong><button type="button"><UserPlus size={13} /> Follow</button></div>
              <p>New work, live moments, and the places the full story continues.</p>
              <small>#originalwork #creators #live</small>
            </div>
            <div className="gateway-pulse-actions" aria-label="Pulse actions">
              <span><Heart size={18} /> <small>Like</small></span>
              <span><MessageCircle size={18} /> <small>Chat</small></span>
              <span><Bookmark size={18} /> <small>Save</small></span>
              <span><Send size={18} /> <small>Send</small></span>
            </div>
          </div>
          <nav className="gateway-demo-bottomnav" aria-label="Illustrative app navigation"><strong>Pulse</strong><span>Swipe</span><span>Momentum</span><span>Events</span><span>Profile</span></nav>
        </div>
      </article>

      <article className="gateway-experience-row gateway-experience-swipe">
        <div className="gateway-experience-copy">
          <span>02 / Swipe</span>
          <h3>Move by instinct.</h3>
          <p>Swipe is the roulette-style discovery engine. Each card puts one creator, post, event, store, product, or Live Vibe in focus, then lets the viewer decide what deserves the next look.</p>
          <ul>
            <li>Choose a discovery lane or keep everything in the mix</li>
            <li>Heart to show interest, Pass to advance, Back to rewind</li>
            <li>Open the source profile without losing the discovery context</li>
          </ul>
        </div>
        <div className="gateway-swipe-demo" aria-label="Illustrative preview based on the current GetOnVibe Swipe design">
          <div className="gateway-swipe-stack gateway-swipe-stack-back" aria-hidden="true" />
          <div className="gateway-swipe-stack gateway-swipe-stack-mid" aria-hidden="true" />
          <div className="gateway-swipe-card">
            <div className="gateway-demo-topline"><strong>Vibe Swipe</strong><span>Product preview</span></div>
            <div className="gateway-demo-filters gateway-swipe-filters">
              {swipeFilters.map((filter, index) => <span className={index === 0 ? "is-active" : ""} key={filter}>{filter}</span>)}
            </div>
            <div className="gateway-swipe-badges"><span>Creator</span><span>Rising</span><span>1 / 12</span></div>
            <div className="gateway-swipe-meta"><span>VC</span><div><strong>Vibe Creator</strong><small>@vibecreator</small><p>Original work, upcoming moments, and every official place to follow next.</p></div></div>
            <div className="gateway-swipe-actions" aria-label="Swipe actions">
              <span><RotateCcw size={19} /><small>Back</small></span>
              <span><X size={20} /><small>Pass</small></span>
              <span className="is-heart"><Heart size={21} fill="currentColor" /><small>Heart</small></span>
              <span><Share2 size={18} /><small>Share</small></span>
            </div>
          </div>
        </div>
      </article>

      <article className="gateway-experience-row gateway-experience-profile">
        <div className="gateway-experience-copy">
          <span>03 / Profile</span>
          <h3>Your whole presence.</h3>
          <p>A GetOnVibe profile is more than a stack of links. It is the creator identity layer, connecting native work, Around The Web, events, Live Vibes, messages, audience growth, and official destinations.</p>
          <ul>
            <li>One identity across original work and official links</li>
            <li>Creator Studio tools for content and audience growth</li>
            <li>Clear paths to events, collaborations, and brand opportunities</li>
          </ul>
          <Link href="/creators">Explore the creator experience <ArrowUpRight size={18} /></Link>
        </div>
        <div className="gateway-profile-product" aria-label="Illustrative preview based on the current GetOnVibe profile design">
          <div className="gateway-profile-product-banner"><span>GetOnVibe Profile</span><strong>Vibe Creator</strong></div>
          <div className="gateway-profile-product-identity">
            <span>VC</span>
            <div><strong>Vibe Creator</strong><small>@vibecreator / Nashville, TN</small><p>Original stories, live sessions, culture, and the work behind the work.</p></div>
            <button type="button">Follow</button>
          </div>
          <div className="gateway-profile-product-stats"><span><strong>Audience</strong>Follower growth</span><span><strong>Content</strong>Views and saves</span><span><strong>Momentum</strong>Engagement signals</span></div>
          <div className="gateway-profile-product-manage"><p>Creator Studio</p><div><span>Content</span><span>Around The Web</span><span>Events</span><span>Messages</span></div></div>
          <div className="gateway-profile-product-grid"><span>Original posts</span><span>Live Vibes</span><span>Events</span><span>Official links</span></div>
        </div>
      </article>

      <p className="gateway-experience-note">Product previews reflect the current beta direction. Final content, accounts, and availability will grow through the phased launch.</p>
    </section>
  );
}
