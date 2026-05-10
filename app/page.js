import { getAllBlogs, getAllLogs, getAllProjects } from "@/lib/content";
import PortfolioLayout from "./components/PortfolioLayout";

export default function Home() {
  const blogs = getAllBlogs();
  const logs = getAllLogs();
  const projects = getAllProjects();

  return (
    <PortfolioLayout
      projects={projects}
      logs={logs}
      blogs={blogs}
    />
  );
}
