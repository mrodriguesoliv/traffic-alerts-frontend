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
