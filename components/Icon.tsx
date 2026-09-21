export type IconName =
  "spark" | "repeat" | "web" | "link" | "chart" | "chat" | "arrow";
const paths: Record<IconName, string> = {
  spark:
    "M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z M20 3v4 M18 5h4",
  repeat:
    "M4 8a8 8 0 0 1 14-2l2 2 M20 3v5h-5 M20 16a8 8 0 0 1-14 2l-2-2 M4 21v-5h5",
  web: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z M3 9h18 M7 6.5h.01 M10 6.5h.01 M8 13h8 M8 16h5",
  link: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2",
  chart: "M4 3v17h17 M8 16v-5 M13 16V7 M18 16V4",
  chat: "M21 11a8 8 0 0 1-8 8H8l-5 3V11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z M7 11h.01 M12 11h.01 M17 11h.01",
  arrow: "M4 12h15 M13 6l6 6-6 6",
};
export default function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
