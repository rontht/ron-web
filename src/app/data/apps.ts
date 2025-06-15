export type AppType = "off" | "running";

export interface AppInfo {
  id: string;
  icon: string;
  label: string;
  pinned: boolean;
  type: AppType;
}

export const initialApps: AppInfo[] = [
  {
    id: "computer",
    icon: "/icons/my_computer.png",
    label: "Computer",
    pinned: true,
    type: "off",
  },
  {
    id: "projects",
    icon: "/icons/folder_open.png",
    label: "Projects",
    pinned: true,
    type: "off",
  },
  {
    id: "network",
    icon: "/icons/my_network.png",
    label: "Network",
    pinned: false,
    type: "off",
  },
];
