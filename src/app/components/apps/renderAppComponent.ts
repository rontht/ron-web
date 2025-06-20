import ComputerApp from "./ComputerApp";
import ProjectsApp from "./ProjectsApp";
import ExplorerApp from "./NetworkApp";
import HelpApp from "./HelpApp";
import UserApp from "./UserApp";
import Game_1App from "./Game_1App";
import Game_2App from "./Game_2App";

const componentMap: Record<
  string,
  { Component: React.FC; width?: number; height?: number }
> = {
  computer: { Component: ComputerApp },
  projects: { Component: ProjectsApp },
  explorer: { Component: ExplorerApp },
  help: { Component: HelpApp },
  user: { Component: UserApp },
  game_1: { Component: Game_1App, width: 1405, height: 850 },
  game_2: { Component: Game_2App, width: 1605, height: 950 },
};

export function renderAppComponent(id: string) {
  return componentMap[id] ?? null;
}
