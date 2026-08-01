// config.js

// Daftar Topping Universal untuk semua varian
const defaultToppings = ["Keju", "Meses", "Kacang", "Crumble", "Marsh"];

// Daftar 7 Varian Rasa Utama
const baseFlavors = [
    { name: "Coklat", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Matcha", img: "https://images.unsplash.com/photo-1588643806968-3e4bce584749?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Strawberry", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Tiramisu", img: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Red Velvet", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Kacang", img: "https://images.unsplash.com/photo-1636248983944-f875b25f82ac?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings },
    { name: "Taro", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80", toppings: defaultToppings }
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
