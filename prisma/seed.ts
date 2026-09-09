import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES: Record<string, string[]> = {
  Men: ["photo-1596755094514-f87e34085b2c","photo-1551537482-f2075a1d41f2","photo-1594938298603-c8148c4dae35","photo-1521572163474-6864f9cf17ab","photo-1556821840-3a63f95609a7","photo-1594633312681-425c7b97ccd1","photo-1551028719-00167b16eac5","photo-1591195853828-11db59a44f6b"],
  Women: ["photo-1595777457583-95e059d581b8","photo-1583496661160-fb5886a0aaaa","photo-1598550476439-6845435fcea5","photo-1490481651871-ab68de25d43d","photo-1591369822096-ffd140ec948f","photo-1434389677669-e08b4cac3105","photo-1541099649105-f69ad21f3246","photo-1581044777550-4cfa60707c03"],
  Unisex: ["photo-1521572163474-6864f9cf17ab","photo-1544923246-77307dd654cb","photo-1594633312681-425c7b97ccd1","photo-1556821840-3a63f95609a7","photo-1591195853828-11db59a44f6b","photo-1596755094514-f87e34085b2c"],
  Sports: ["photo-1571902943202-507ec2618e8f","photo-1517438476312-10d79c077509","photo-1556742049-0cfed4f6a45d","photo-1551537482-f2075a1d41f2","photo-1591195853828-11db59a44f6b","photo-1556821840-3a63f95609a7"],
};

const NAMES = ["Silk 100% Limited Collection","Classic Shirt","Denim Jacket","Cargo Pants","Hoodie","Blazer","Minimal Dress","Cotton Tee","Wool Coat","Pleated Skirt"];

function makeSection(section: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: `${section} ${NAMES[i % NAMES.length]} ${i + 1}`,
    description: "Premium cloth - 100% cotton, perfect fit. Delivered countrywide. Haven Brand.",
    price: 35000 + i * 5500,
    image: `https://images.unsplash.com/${IMAGES[section][i % IMAGES[section].length]}?w=600&q=80&auto=format&fit=crop`,
    section,
  }));
}

async function main() {
  const products = [
    ...makeSection("Men", 24),
    ...makeSection("Women", 24),
    ...makeSection("Unisex", 24),
    ...makeSection("Sports", 24),
  ];

  await prisma.product.createMany({ data: products });
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
