const carBrand = [
  "Tesla",
  "Lada",
  "BMW",
  "Gaz",
  "Kia",
  "Mersedes",
  "Audi",
  "Porche",
  "Hyundai",
  "Honda",
  "Bentley",
  "Geely",
  "Skoda",
  "Wolksvagen",
  "Toyota",
  "Lexus",
  "Nissan",
  "Infinity",
  "Ferrary",
  "Lamborgini",
];

const carModel = [
  "Model S",
  "Model X",
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "Q5",
  "Q6",
  "Rio",
  "K5",
  "Optima",
  "300",
  "600",
  "Aventador",
  "Cayenne",
  "Cayman",
  "Corolla",
  "Camry",
  "Rav4",
  "Sorento",
  "Solaris",
  "Sonata",
  "Elantra",
  "ix35",
  "Santa Fe",
  "E500",
  "Almera",
  "Quashqai",
  "Priora",
  "Cranta",
  "Civic",
  "Pilot",
  "CR-V",
  "Yeti",
  "Octavia",
  "Golf",
  "Polo",
];

const colorValues = "0123456789abcdef";

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function GenerateCar() {
  const brand = carBrand[getRandomValue(0, carBrand.length)];
  const model = carModel[getRandomValue(0, carModel.length)];
  const color = "#000000".replace(
    /0/g,
    () => colorValues[getRandomValue(0, colorValues.length)],
  );

  return { name: `${brand} ${model}`, color };
}

export default function generate100Cars() {
  return new Array(100).fill({}).map(() => GenerateCar());
}
