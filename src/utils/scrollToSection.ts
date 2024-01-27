export const scrollIntoSection = (section: HTMLElement | null) => {
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
