export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function formatWeaponClass(value: string): string {
  return value === "smg" || value === "lmg"
    ? value.toUpperCase()
    : value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatArchiveDate(value?: string): string {
  if (!value) return "Date pending";

  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function countConfiguredAttachments(
  attachments: Record<string, string | undefined>,
): number {
  return Object.values(attachments).filter(
    (attachment): attachment is string => Boolean(attachment?.trim()),
  ).length;
}
