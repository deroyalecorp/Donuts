// config.js

// Daftar Topping Universal untuk semua varian
const defaultToppings = ["Keju", "Meses", "Kacang", "Crumble", "Marsh"];

// Daftar 7 Varian Rasa Utama
const baseFlavors = [
    { name: "Coklat", img: "images/coklat.jpeg", toppings: defaultToppings },
    { name: "Matcha", img: "images/matcha.jpeg", toppings: defaultToppings },
    { name: "Strawberry", img: "images/strawberry.jpeg", toppings: defaultToppings },
    { name: "Tiramisu", img: "images/tiramisu.jpeg", toppings: defaultToppings },
    { name: "Red Velvet", img: "images/red valvet.jpeg", toppings: defaultToppings },
    { name: "Kacang", img: "images/kacang.jpeg", toppings: defaultToppings },
    { name: "Taro", img: "images/taro.jpeg", toppings: defaultToppings }
];

const generateItems = (prefix) => {
    return baseFlavors.map((item, index) => ({
        ...item,
        id: `${prefix}-${index + 1}`
    }));
};

const CONFIG = {
    whatsappNumber: "6287881413779", // Pastikan nomor WA benar
    categories: [
        {
            name: "Regular Donut's",
            price: 3000,
            status: "available", // Tersedia
            toppingLevels: [
                { id: "normal", name: "Normal", price: 0 },
                { id: "reffine", name: "Reffine", price: 1000 },
                { id: "deborant", name: "Deborant", price: 2000 }
            ],
            items: generateItems('reg')
        },
        {
            name: "Medium Donut",
            price: 5000,
            status: "coming_soon", // Kunci tombol (Coming Soon)
            toppingLevels: [
                { id: "normal", name: "Normal", price: 0 },
                { id: "reffine", name: "Reffine", price: 1000 },
                { id: "deborant", name: "Deborant", price: 2000 }
            ],
            items: generateItems('med')
        },
        {
            name: "Royale Donut's",
            price: 8000,
            status: "coming_soon", // Kunci tombol (Coming Soon)
            toppingLevels: [
                { id: "normal", name: "Normal", price: 0 },
                { id: "reffine", name: "Reffine", price: 2000 }, 
                { id: "deborant", name: "Deborant", price: 3000 } 
            ],
            items: generateItems('roy')
        }
    ]
};
