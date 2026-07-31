// config.js
const CONFIG = {
    whatsappNumber: "6287881413779",
    toppingLevels: [
        { id: "normal", name: "Normal", price: 0 },
        { id: "reffine", name: "Reffine", price: 1000 },
        { id: "deborant", name: "Deborant", price: 2000 }
    ],
    categories: [
        {
            name: "Regular Donut's",
            price: 3000,
            items: [
                { id: "reg-1", name: "Coklat", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80", toppings: ["Coklat", "Strawberry", "Kacang", "Keju", "Sprinkle"] },
                { id: "reg-2", name: "Vanilla", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80", toppings: ["Vanilla", "Coklat", "Kacang", "Caramel", "Sprinkle"] }
            ]
        },
        {
            name: "Medium Donut",
            price: 5000,
            items: [
                { id: "med-1", name: "Matcha", img: "https://images.unsplash.com/photo-1588643806968-3e4bce584749?auto=format&fit=crop&w=400&q=80", toppings: ["Matcha", "Coklat", "Kacang", "Caramel", "Sprinkle"] },
                { id: "med-2", name: "Caramel", img: "https://images.unsplash.com/photo-1636248983944-f875b25f82ac?auto=format&fit=crop&w=400&q=80", toppings: ["Caramel", "Coklat", "Kacang", "Keju", "Sprinkle"] }
            ]
        },
        {
            name: "Royale Donut's",
            price: 8000,
            items: [
                { id: "roy-1", name: "Red Velvet", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80", toppings: ["Cream Cheese", "Coklat", "Strawberry", "Kacang", "Sprinkle"] },
                { id: "roy-2", name: "Tiramisu", img: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e?auto=format&fit=crop&w=400&q=80", toppings: ["Tiramisu", "Coklat", "Kacang", "Caramel", "Sprinkle"] }
            ]
        }
    ]
};