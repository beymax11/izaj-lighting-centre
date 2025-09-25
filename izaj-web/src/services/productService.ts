export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  colors?: string[];
}

export const getAllProducts = (): Product[] => {
  return [
    {
      id: 1,
      name: "Abednego | Chandelier/Large",
      price: "₱32,995",
      image: "/abed.webp",
      colors: ["black", "gold", "silver"]
    },
    {
      id: 2,
      name: "Aberdeen | Modern LED Chandelier",
      price: "₱25,464",
      image: "/aber.webp",
      colors: ["black", "gold"]
    },
    {
      id: 3,
      name: "Acadia | Table Lamp",
      price: "₱12,234",
      image: "/acad.webp",
      colors: ["black"]
    },
    {
      id: 4,
      name: "Ademar | Modern Chandelier",
      price: "₱11,237",
      image: "/mar.webp",
      colors: ["black"]
    },
    {
      id: 5,
      name: "Aeris | Modern Pendant Light",
      price: "₱9,435",
      image: "/aeris.webp",
      colors: ["black"]
    },
    {
      id: 6,
      name: "Aina | Modern LED Chandelier",
      price: "₱29,995",
      image: "/aina.webp",
      colors: ["black"]
    },
    {
      id: 7,
      name: "Alabama | Table Lamp",
      price: "₱27,995",
      image: "/alab.webp",
      colors: ["black"]
    },
    {
      id: 8,
      name: "Alphius | Surface Mounted Downlight",
      price: "₱25,995",
      image: "/alph.webp",
      colors: ["black"]
    },
    {
      id: 9,
      name: "Altair | Modern LED Chandelier",
      price: "₱23,995",
      image: "/alta.jpg",
      colors: ["black"]
    },
    {
      id: 10,
      name: "Amalfi | Boho Rattan Soliya Pendant Lamp",
      price: "₱21,995",
      image: "/ama.webp",
      colors: ["black"]
    }
  ];
};

export const getProductById = (id: number): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};