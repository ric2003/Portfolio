import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { getProjectStudy } from "@/lib/project-studies";
import { ProjectCaseStudy } from "@/components/project-case-study";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const { title, description } = getProjectStudy(project, "en");
  return {
    title: `${title} | Ricardo Gonçalves`,
    description,
    openGraph: { title: `${title} | Ricardo Gonçalves`, description, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  return <ProjectCaseStudy project={projects[index]} nextProject={projects[(index + 1) % projects.length]} />;
}
