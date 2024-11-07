const examplePrompts = [
  // Shirts
  "Casual cotton T-shirt with a single chest pocket.",
  "Slim-fit linen button-down in soft pastel.",
  "Oversized plaid flannel with two chest pockets.",
  "Black dress shirt with a hidden button placket.",

  // Pants
  "High-waisted, wide-leg trousers with a tie belt.",
  "Classic straight-leg jeans in faded blue denim.",
  "Fleece joggers with elastic waist and drawstring.",
  "Slim-fit dress pants with crisp pleats.",

  // Coats & Jackets
  // "Charcoal wool coat with double-breasted buttons.",
  // "Down winter jacket with detachable hood.",
  // "Satin bomber jacket with ribbed cuffs.",
  // "Classic trench with belted waist and storm flaps.",

  // Dresses
  // "A-line summer dress with floral print.",
  // "Jersey wrap dress with adjustable waist tie.",
  // "Floor-length evening gown with lace overlay.",
  // "Short shift dress with relaxed fit and pockets.",

  // Skirts
  // "High-waisted pencil skirt in dark navy.",
  // "Bohemian maxi skirt with floral print.",
  // "Tartan pleated mini skirt with side zipper.",
  // "Bright circle skirt with hidden back zipper.",

  // Sweaters
  // "Chunky knit sweater with ribbed turtleneck.",
  // "V-neck cashmere sweater in a neutral tone.",
  // "Cropped cable-knit cardigan with buttons.",
  // "Striped lightweight pullover with crew neck."
];

export default function randomExamplePrompt() {
  const idx = Math.floor(Math.random() * examplePrompts.length);
  return examplePrompts[idx];
}
