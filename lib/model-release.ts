import type { Account, ModelRelease } from "@prisma/client";

export const modelReleaseVersion = "2026-09-09";

export const modelReleaseAgreementText = `MODEL AND PROMOTIONAL CONTENT RELEASE
Master Agreement for Participating Events

Companies. This Model and Promotional Content Release (the "Agreement") is given to ShopLobbi Inc. and Vape Shop Maps Inc., together with their respective parents, subsidiaries, affiliates, brands, successors, assigns, licensees, clients, event partners, sponsors, advertising agencies, contractors, and representatives (collectively, the "Companies").

1 Grant of Rights
I authorize the Companies to photograph, film, record, livestream, and otherwise capture my name, image, likeness, appearance, voice, performance, statements, and biographical information at or in connection with any Covered Event. I grant the Companies the unrestricted, worldwide, royalty-free, transferable, sublicensable, and perpetual right to use, reproduce, edit, adapt, crop, combine, publish, display, distribute, advertise, promote, and otherwise exploit those materials, in whole or in part, in any media or format now known or later developed. Permitted uses include websites, social media, digital and print advertising, flyers, posters, email, press materials, event recaps, portfolios, sales materials, broadcasts, and future promotions for the Companies, their brands, services, and events.

2 Covered Events and Website Activation
This is a master agreement. A "Covered Event" is each event for which I apply through a Company website or other Company-approved electronic application process and the Companies accept, confirm, schedule, or engage me to participate. By submitting an application for a later event after signing this Agreement, I reaffirm this Agreement and agree that it applies to that event without requiring another signature. An application alone does not guarantee selection, work, compensation, or participation. Event-specific written terms concerning schedule, duties, pay, dress, or conduct supplement this Agreement; if they conflict on image or promotional-use rights, this Agreement controls unless the Companies expressly agree otherwise in writing.

3 Ownership and Editing
The Companies will own all photographs, video, audio, recordings, and other content they or their agents create under this Agreement. I understand that content may be edited, retouched, altered, captioned, reformatted, combined with other material, or used without identifying me. The Companies have no obligation to use any content or to submit content or final materials to me for inspection or approval.

4 Compensation
I acknowledge that any event compensation will be governed only by the separate event-specific terms communicated to me. Unless those terms expressly state otherwise, I will not receive royalties, residuals, usage fees, or additional compensation for the capture or use of content authorized by this Agreement.

5 Release and Waiver
To the fullest extent permitted by law, I release and discharge the Companies from claims and liabilities arising from authorized capture, editing, publication, distribution, or use of the content, including claims for invasion of privacy, violation of publicity rights, defamation arising solely from lawful editing or context, false light, copyright, or additional compensation. This release does not waive claims that cannot lawfully be waived and does not authorize a knowingly false endorsement attributed to me.

6 Participant Representations
I represent that I am at least 18 years old, have authority to sign this Agreement, and understand its terms. I will not bring third-party materials to a Covered Event for promotional use unless I have permission to do so. I understand that this Agreement does not create an employment relationship, partnership, joint venture, or guarantee of future engagement; the legal nature of any paid event work is determined by the applicable law and the actual event arrangement.

7 Duration and Future Events
This Agreement remains effective for future Covered Events unless I give written notice that I will not participate in future events. Such notice applies only prospectively and does not cancel an already accepted event unless the Companies agree in writing. It does not revoke rights in content already captured or affect materials already created, published, scheduled, printed, licensed, or distributed.

8 General Terms
This Agreement is the complete agreement concerning the rights granted here and may be amended only in a writing agreed to by the participant and an authorized Company representative. If any provision is found unenforceable, it will be limited or severed to the minimum extent necessary and the remaining provisions will remain effective. This Agreement is governed by Tennessee law, without regard to conflict-of-law rules. Electronic signatures and electronically stored copies are effective as originals, and the Companies may retain and rely upon this signed Agreement in connection with future Covered Events.

BY SIGNING, I CONFIRM THAT I HAVE READ AND UNDERSTAND THIS AGREEMENT, I AM AT LEAST 18 YEARS OLD, AND I VOLUNTARILY AGREE TO ITS TERMS.`;

type ReleaseWithAccount = ModelRelease & {
  account?: Pick<Account, "name" | "role" | "email"> | null;
};

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(value: string, maxLength: number) {
  const lines: string[] = [];

  value.split("\n").forEach((paragraph) => {
    if (!paragraph.trim()) {
      lines.push("");
      return;
    }

    const words = paragraph.split(/\s+/);
    let current = "";

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;

      if (next.length > maxLength && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });

    if (current) {
      lines.push(current);
    }
  });

  return lines;
}

function buildPageContent(lines: string[]) {
  const commands = ["BT", "/F1 10 Tf", "14 TL", "50 742 Td"];

  lines.forEach((line, index) => {
    if (index > 0) {
      commands.push("T*");
    }

    if (line) {
      commands.push(`(${pdfEscape(line)}) Tj`);
    }
  });

  commands.push("ET");
  return commands.join("\n");
}

export function buildModelReleasePdf(release: ReleaseWithAccount) {
  const signedAt = release.signedAt.toLocaleString("en-US", { timeZone: "America/Chicago" });
  const heading = [
    "ONVIBE EVENTS SIGNED MODEL RELEASE",
    `Agreement Version: ${release.agreementVersion}`,
    `Signed At: ${signedAt} Central Time`,
    "",
    `Account Name: ${release.account?.name || release.legalName}`,
    `Account Email: ${release.account?.email || release.email}`,
    `Legal Name: ${release.legalName}`,
    `Date Of Birth: ${release.dateOfBirth}`,
    `Email: ${release.email}`,
    `Phone: ${release.phone}`,
    `Address: ${release.streetAddress}, ${release.city}, ${release.state} ${release.zip}`,
    `Digital Signature: ${release.signature}`,
    `IP Address: ${release.ipAddress || "Not captured"}`,
    `User Agent: ${release.userAgent || "Not captured"}`,
    "",
    "SIGNED AGREEMENT TEXT",
    "",
  ];
  const lines = [...heading, ...wrapText(release.agreementText, 92)];
  const pages: string[][] = [];

  for (let index = 0; index < lines.length; index += 49) {
    pages.push(lines.slice(index, index + 49));
  }

  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(`<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`);

  pages.forEach((pageLines, index) => {
    const pageObjectNumber = 3 + index * 2;
    const contentObjectNumber = pageObjectNumber + 1;
    const content = buildPageContent(pageLines);

    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
    objects.push(`<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`);
  });

  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
}
