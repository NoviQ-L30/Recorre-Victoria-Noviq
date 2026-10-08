// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Content from "./content";
import Comments from "./comments";

// prisma
import { prisma } from "@/lib/prisma";

export default async function Campaign() {
  const images = await prisma.carousel3DImage.findMany({
    orderBy: {
      name: "asc",
    },
    distinct: ["imageId"],
  });

  const secondaryImages = await prisma.secondaryCarouselImage.findMany({
    orderBy: { order: "asc" },
  });

  const curiousFacts = await prisma.curiousFact.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <Hero />
      <Content
        images={images}
        secondaryImages={secondaryImages}
        curiousFacts={curiousFacts}
      />
      <Footer />
    </>
  );
}
