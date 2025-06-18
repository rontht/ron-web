import ComputerApp from "./ComputerApp";
import ProjectsApp from "./ProjectsApp";
import NetworkApp from "./NetworkApp";

const componentMap: Record<string, React.FC> = {
  computer: ComputerApp,
  projects: ProjectsApp,
  network: NetworkApp,
};

export function renderAppComponent(id: string): React.FC | null {
  return componentMap[id] ?? null;
}