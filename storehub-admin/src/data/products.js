import imgApple from "../assets/images/products/fresh-apples.png";
import imgMilk from "../assets/images/products/milk.png";
import imgBread from "../assets/images/products/bread.png";
import imgBananas from "../assets/images/products/bananas.jpg";
import imgOrange from "../assets/images/products/orange.jpg";
import imgGrapes from "../assets/images/products/grapes.jpg";
import imgMango from "../assets/images/products/mango.jpg";
import imgTomato from "../assets/images/products/tomato.jpg";
import imgPotato from "../assets/images/products/potato.jpg";
import imgOnion from "../assets/images/products/onion.jpg";
import imgSpinach from "../assets/images/products/spinach.jpg";
import imgCarrot from "../assets/images/products/carrot.jpg";
import imgSalt from "../assets/images/products/salt.jpg";
import imgOil from "../assets/images/products/oil.jpg";
import imgSugar from "../assets/images/products/sugar.jpg";
import imgRice from "../assets/images/products/rice.jpg";
import imgFlour from "../assets/images/products/flour.jpg";
import imgDal from "../assets/images/products/dal.jpg";
import imgNotebook from "../assets/images/products/notebook.jpg";
import imgPen from "../assets/images/products/pen.jpg";
import imgHighlighters from "../assets/images/products/highlighters.jpg";
import imgStickyNotes from "../assets/images/products/sticky-notes.jpg";

export const products = [
  // Fruits
  { 
    id: 1, 
    name: "Fresh Apples", 
    price: 120, 
    image: imgApple, 
    category: "Fruits",
    description: "Crisp and juicy organic apples.",
    features: ["Organic", "Fresh", "Healthy"]
  },
  { 
    id: 2, 
    name: "Bananas", 
    price: 60, 
    image: imgBananas, 
    category: "Fruits",
    description: "Sweet and ripe yellow bananas.",
    features: ["Natural", "Potassium Rich"]
  },
  { 
    id: 3, 
    name: "Orange", 
    price: 80, 
    image: imgOrange, 
    category: "Fruits",
    description: "Zesty and vitamin-rich oranges.",
    features: ["Vitamin C", "Juicy"]
  },
  { 
    id: 4, 
    name: "Grapes", 
    price: 150, 
    image: imgGrapes, 
    category: "Fruits",
    description: "Sweet seedless green grapes.",
    features: ["Seedless", "Sweet"]
  },
  { 
    id: 5, 
    name: "Alphonso Mango", 
    price: 450, 
    image: imgMango, 
    category: "Fruits",
    description: "The king of mangoes, rich and sweet.",
    features: ["Premium", "Seasonal"]
  },
  
  // Vegetables
  { 
    id: 6, 
    name: "Tomato", 
    price: 40, 
    image: imgTomato, 
    category: "Vegetables",
    description: "Ripe and firm red tomatoes.",
    features: ["Fresh", "Farm Picked"]
  },
  { 
    id: 7, 
    name: "Potato", 
    price: 30, 
    image: imgPotato, 
    category: "Vegetables",
    description: "Versatile starchy potatoes.",
    features: ["Versatile", "Long Shelf Life"]
  },
  { 
    id: 8, 
    name: "Onion", 
    price: 35, 
    image: imgOnion, 
    category: "Vegetables",
    description: "Sharp and flavor-adding onions.",
    features: ["Essential", "Strong Flavor"]
  },
  { 
    id: 9, 
    name: "Fresh Spinach", 
    price: 20, 
    image: imgSpinach, 
    category: "Vegetables",
    description: "Iron-rich leafy green spinach.",
    features: ["Iron Rich", "Organic"]
  },
  { 
    id: 10, 
    name: "Carrot", 
    price: 50, 
    image: imgCarrot, 
    category: "Vegetables",
    description: "Crunchy and sweet orange carrots.",
    features: ["Vitamin A", "Crunchy"]
  },

  // Dairy
  { 
    id: 11, 
    name: "Fresh Milk", 
    price: 60, 
    image: imgMilk, 
    category: "Dairy",
    description: "Pure farm fresh milk.",
    features: ["Calcium Rich", "Pasteurized"]
  },
  { 
    id: 12, 
    name: "Brown Bread", 
    price: 40, 
    image: imgBread, 
    category: "Dairy",
    description: "Healthy whole wheat brown bread.",
    features: ["High Fiber", "Whole Wheat"]
  },

  // Grocery
  { 
    id: 13, 
    name: "Tata Salt", 
    price: 25, 
    image: imgSalt, 
    category: "Grocery",
    description: "Iodized salt for a healthy life.",
    features: ["Iodized", "Pure"]
  },
  { 
    id: 14, 
    name: "Cooking Oil", 
    price: 180, 
    image: imgOil, 
    category: "Grocery",
    description: "Refined sunflower cooking oil.",
    features: ["Light", "Healthy"]
  },
  { 
    id: 15, 
    name: "Sugar (1kg)", 
    price: 45, 
    image: imgSugar, 
    category: "Grocery",
    description: "Fine grain white sugar.",
    features: ["Fine Quality"]
  },

  // Flour & Rice
  { 
    id: 16, 
    name: "Basmati Rice (5kg)", 
    price: 650, 
    image: imgRice, 
    category: "Flour & Rice",
    description: "Long grain aromatic Basmati rice.",
    features: ["Aromatic", "Long Grain"]
  },
  { 
    id: 17, 
    name: "Wheat Flour (10kg)", 
    price: 420, 
    image: imgFlour, 
    category: "Flour & Rice",
    description: "Premium quality wheat flour (Atta).",
    features: ["Whole Wheat", "Premium"]
  },
  { 
    id: 18, 
    name: "Moong Dal (1kg)", 
    price: 140, 
    image: imgDal, 
    category: "Grocery",
    description: "Protein-rich yellow moong dal.",
    features: ["Protein Rich", "Easy to Cook"]
  },

  // Stationery
  { 
    id: 19, 
    name: "A4 Notebook", 
    price: 60, 
    image: imgNotebook, 
    category: "Stationery",
    description: "Ruled A4 size notebook.",
    features: ["Ruled", "Good Quality Paper"]
  },
  { 
    id: 20, 
    name: "Ball Pen Set", 
    price: 50, 
    image: imgPen, 
    category: "Stationery",
    description: "Smooth writing blue ball pens.",
    features: ["Smooth Grip", "Long Lasting"]
  },
  { 
    id: 21, 
    name: "Highlighters", 
    price: 120, 
    image: imgHighlighters, 
    category: "Stationery",
    description: "Bright neon highlighters.",
    features: ["Vibrant Colors", "Chisel Tip"]
  },
  { 
    id: 22, 
    name: "Sticky Notes", 
    price: 40, 
    image: imgStickyNotes, 
    category: "Stationery",
    description: "Colorful sticky notes for reminders.",
    features: ["Good Adhesive", "Bright Colors"]
  },
];
