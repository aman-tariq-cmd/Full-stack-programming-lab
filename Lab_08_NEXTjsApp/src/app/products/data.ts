export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Ceramic Pour-Over Set",
    description:
      "A hand-thrown stoneware dripper and carafe glazed in warm sand. The wide-mouth opening supports standard filters for a clean, even extraction. Includes a matching tray. Elevate your morning ritual.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    category: "Kitchen",
  },
  {
    id: 2,
    title: "Merino Wool Throw",
    description:
      "100% extra-fine merino woven in a classic herringbone pattern. Naturally temperature-regulating — warm in winter, breathable in summer. Machine washable on a wool cycle. Comes in a reusable cotton dust bag.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=80",
    category: "Home Textiles",
  },
  {
    id: 3,
    title: "Obsidian Desk Lamp",
    description:
      "A sculpted matte-black lamp with a warm LED and adjustable arm. Precision-weighted base keeps it stable on any surface. Pairs beautifully with natural wood or concrete desktops.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    category: "Lighting",
  },
  {
    id: 4,
    title: "Linen Canvas Tote",
    description:
      "Heavyweight natural linen with a reinforced base and inner zip pocket. Waxed cotton handles age beautifully with use. Sized to hold a 15-inch laptop, notebooks, and daily essentials without bulk.",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: 5,
    title: "Solid Oak Bookends",
    description:
      "Turned from a single piece of white oak, finished with food-safe oil. Each bookend weighs 680g — heavy enough to hold a full shelf without anchors. Grain pattern varies naturally, making every pair one-of-a-kind.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&auto=format&fit=crop&q=80",
    category: "Decor",
  },
  {
    id: 6,
    title: "Leather Field Notes Cover",
    description:
      "Full-grain vegetable-tanned leather that develops a rich patina over years of use. Fits the standard Field Notes 3-pack. Includes a rear card slot and elastic pen loop. Monogramming available on request.",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    category: "Stationery",
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
