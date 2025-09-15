const matches = import.meta.glob("../../../assets/icons/alerts/*.png", { eager: true }) as Record<string, any>;

const icons: Record<string, string> = {};

for (const path in matches) {
  const fileName = path.split("/").pop()?.replace(".png", "");
  if (fileName) {
    icons[fileName] = matches[path].default || matches[path];
  }
}

export function getAlertIcon(type: string): string | undefined {
  return icons[type.toLowerCase()];
}

const alertColors: Record<string, string> = {
  accident: "border-l-4 border-red-500",
  roadwork: "border-l-4 border-yellow-500",
  heavy_traffic: "border-l-4 border-orange-500",
  police: "border-l-4 border-blue-500",
  default: "border-l-4 border-gray-300",
};

export function getAlertBorderClass(type: string): string {
  return alertColors[type.toLowerCase()] || alertColors.default;
}
