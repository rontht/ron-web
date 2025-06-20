export interface AppInfo {
  id: string;
  icon: string;
  label: string;
  pinned: boolean;
  status: "off" | "running" | "minimized" | "focused";
  position?: { x: number; y: number };
  order?: number;
}

export const initialApps: AppInfo[] = [
  {
    id: "computer",
    icon: "/icons/my_computer.png",
    label: "Computer",
    pinned: false,
    status: "off",
  },
  {
    id: "explorer",
    icon: "/icons/internet_explorer.png",
    label: "Internet Explorer",
    pinned: true,
    status: "off",
  },
  {
    id: "user",
    icon: "/icons/user.png",
    label: "User Account",
    pinned: true,
    status: "off",
  },
  {
    id: "help",
    icon: "/icons/help.png",
    label: "Help",
    pinned: false,
    status: "off",
  },
  {
    id: "projects",
    icon: "/icons/folder_open.png",
    label: "Projects",
    pinned: true,
    status: "off",
  },
  {
    id: "game_1",
    icon: "/icons/camera.png",
    label: "Blast You",
    pinned: false,
    status: "off",
  },
    {
    id: "game_2",
    icon: "/icons/camera.png",
    label: "Very Cool Pirate Game",
    pinned: false,
    status: "off",
  },
];
