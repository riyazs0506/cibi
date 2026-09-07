import { contact, formatAddress } from "@/data/site";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface ContactChannelsProps {
  /** "footer" is compact and light-on-navy; "page" is the roomier card list. */
  variant?: "footer" | "page";
  className?: string;
}

interface Channel {
  icon: IconName;
  label: string;
  /** Rendered value. Multiple lines allowed for address and hours. */
  lines: string[];
  href?: string;
}

/** Builds the list from whatever the client has actually supplied. */
function buildChannels(): Channel[] {
  const channels: Channel[] = [];

  if (contact.phone) {
    channels.push({
      icon: "phone",
      label: "Phone",
      lines: [contact.phone],
      href: contact.phoneHref ? `tel:${contact.phoneHref}` : undefined,
    });
  }

  if (contact.email) {
    channels.push({
      icon: "mail",
      label: "Email",
      lines: [contact.email],
      href: `mailto:${contact.email}`,
    });
  }

  if (contact.address) {
    channels.push({
      icon: "pin",
      label: "Address",
      lines: [formatAddress(contact.address)],
      href: contact.mapUrl ?? undefined,
    });
  }

  if (contact.openingHours.length > 0) {
    channels.push({
      icon: "clock",
      label: "Working Hours",
      lines: contact.openingHours.map((entry) => `${entry.days}: ${entry.hours}`),
    });
  }

  return channels;
}

/**
 * Renders the contact details the client has configured.
 *
 * Anything still unset in data/site.ts is simply not rendered - the site never
 * shows an invented phone number, address or set of opening hours.
 */
export function ContactChannels({
  variant = "page",
  className = "",
}: ContactChannelsProps) {
  const channels = buildChannels();
  const onDark = variant === "footer";

  if (channels.length === 0) {
    return (
      <p
        className={[
          "text-[var(--text-small)] leading-relaxed",
          onDark ? "text-white/60" : "text-slate",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Contact details will be published shortly. In the meantime, please use
        the enquiry form and we will get back to you.
      </p>
    );
  }

  if (onDark) {
    return (
      <ul className={`flex flex-col gap-3.5 ${className}`.trim()}>
        {channels.map((channel) => (
          <li key={channel.label} className="flex gap-3">
            <Icon name={channel.icon} size={17} className="mt-0.5 shrink-0 text-accent" />
            <div className="text-[var(--text-small)] leading-relaxed">
              <span className="sr-only">{channel.label}: </span>
              {channel.href ? (
                <a
                  href={channel.href}
                  className="text-white/70 transition-colors duration-[var(--duration-soft)] hover:text-white"
                  {...(channel.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {channel.lines[0]}
                </a>
              ) : (
                channel.lines.map((line) => (
                  <span key={line} className="block text-white/70">
                    {line}
                  </span>
                ))
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${className}`.trim()}>
      {channels.map((channel) => (
        <li key={channel.label} className="card-surface flex gap-4 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-blue text-accent-deep">
            <Icon name={channel.icon} size={20} />
          </span>

          <div className="min-w-0">
            <p className="font-display text-[var(--text-small)] font-bold text-navy">
              {channel.label}
            </p>

            {channel.href ? (
              <a
                href={channel.href}
                className="mt-1 block break-words text-[var(--text-small)] leading-relaxed text-slate transition-colors duration-[var(--duration-soft)] hover:text-accent-deep"
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {channel.lines[0]}
              </a>
            ) : (
              <div className="mt-1">
                {channel.lines.map((line) => (
                  <span
                    key={line}
                    className="block text-[var(--text-small)] leading-relaxed text-slate"
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
