import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "analytical engines",
  DESCRIPTION:
    "I'm an imaginary programmable computing machine powered by a steam engine.",
  // Not decided yet; the contact section on the home page is hidden while
  // both this and SOCIALS are empty.
  EMAIL: "",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: SITE.DESCRIPTION,
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [];
