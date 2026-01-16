import dotenv from "dotenv";
dotenv.config();

import sequelize from "../../src/config/database.js";
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Database reset");

        const hashedPassword1 = await bcrypt.hash("siham", 10);
        const hashedPassword2 = await bcrypt.hash("password123", 10);
        const hashedPassword3 = await bcrypt.hash("laila123", 10);

        // ==== USERS ========

        const users = await User.bulkCreate(
            [
                {
                    name: "Siham",
                    email: "siham@flower.com",
                    password: hashedPassword1,
                    role: "admin",
                    isActive: true,
                },
                {
                    name: "Sophia Alma",
                    email: "sophia@alma.com",
                    password: hashedPassword2,
                    role: "user",
                    isActive: true,
                },
                {
                    name: "Laila Hgad",
                    email: "laila@exemple.com",
                    password: hashedPassword3,
                    role: "user",
                    isActive: true,
                },
            ],
            { returning: true }
        );
        console.log("✅ Users seeded");

        // ====== Products ========
        const products = await Product.bulkCreate(
            [
                {
                    name: "Red Rose Bouquet",
                    description: "Exerience the timeless beauty of the classical red roses bouqquet, a perfect blend of elegence and sophistication, this stuning arrangement features vibant red roses delicately wraapped in sleek balck wrap. creating a striking contrast that adds a touch of luxury to any occasion.",
                    price: 49.99,
                    stock: 30,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768170971/WhatsApp_Image_2026-01-11_at_21.29.32_p36hec.jpg",
                    ],
                },
                {
                    name: "White Lily Elegance",
                    description: "A soft symphony of color and elegance comes alive in this enchanting floral arrangement. Peach roses and pink baby roses express warmth and affection. while light blue delphiniums. and white anthuriums add freshness and grace.",
                    price: 49.99,
                    stock: 20,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768171577/WhatsApp_Image_2026-01-11_at_21.28.14_l0w6ef.jpg",],
                },
                {
                    name: "Elegant Roses Symphony Bouquet",
                    description: "Celebrate any occasion with our Elegant Rose Symphon Bouquet!This exquisite hand-tied bouquet features a harmonious mix of red, pink, light pink, fuchsia, and white Roses, creating a stunning array of color and elegance.",
                    price: 60.45,
                    stock: 10,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768171393/WhatsApp_Image_2026-01-11_at_21.28.56_1_gfrz5b.jpg",
                    ],
                },
                {
                    name: "Magical Flower Bouquet",
                    description: "Celebrate with a bouquet that radiates joy and festivity This stunnig arrangement blends the cheerful charm of pink grebera, the soft elegence of purple and orange roses, and the vibant pop of fuchsia baby roses.",
                    price: 79.99,
                    stock: 15,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768205752/WhatsApp_Image_2026-01-11_at_21.25.59_zsbybn.jpg",
                    ],
                },
                {
                    name: "Yellow Bloom Bouquet",
                    description: "This vibrant bouquet combines the cheerful energy of yellow gerbera and yellow roses, beautifully contrasted with the soft elegance  of purple baby roses and purple eustoma. The bold pops of yellow craspedia and lush green chrysanthemums add a unique texture making this arrangment a stunning visual delight. ",
                    price: 120.00,
                    stock: 20,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768171676/WhatsApp_Image_2026-01-11_at_21.27.39_i5opys.jpg",
                    ],
                },
                {
                    name: "Golden Sunshine Flowers Bouquet",
                    description: "This bright and beautiful bouquet of sunflowers and white roses, wrapped in a chic cream and black wrap, is the perfect way to make someone's day even more special. Whether it's for a birthay, celebration, or simply to brighten up a loved one's home. this arrangement makes for a stunning gift. ",
                    price: 130.99,
                    stock: 19,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768205605/WhatsApp_Image_2026-01-11_at_21.26.36_fgoqzo.jpg",
                    ],
                },
                {
                    name: "Pink Fiesta Flower Bouquet",
                    description: "Delicate, graceful, and full of emotion, this bouquet is designed to speak the language of love in the softest tones. Featuring rasita vendela roses, white and pink chrysanthemums, and green eucalyptus, it captures a perfect balance of purity and tenderness.",
                    price: 150.00,
                    stock: 5,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209045/WhatsApp_Image_2026-01-12_at_10.06.20_hqbonm.jpg",
                    ],
                },
                {
                    name: "Dreamy White Roses Bouquet",
                    description: "Elevate any celebration with our luxury rose bouquet. This exquisite arrangement features pristine white roses wrapped in a sophisticated dark teal wrap, creating a stunning visual contrast. Perfect for celebrations, anniversaries, or as a heartfull gift.",
                    price: 200.00,
                    stock: 8,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209059/WhatsApp_Image_2026-01-12_at_10.06.29_hvtdcz.jpg",
                    ],
                },
                {
                    name: "Pink Baby Rose Bouquet",
                    description: "Surprise your loved one with a stunning luxury bouquet featuring delicate pink baby roses elegantly wrapped in a soft creamy wrap. This charming bouquet is the perfect way to express love, admiration, or appreciation, adding a touch of beauty and sophistication to any occasion.",
                    price: 100.00,
                    stock: 25,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209073/WhatsApp_Image_2026-01-12_at_10.06.49_spxh4v.jpg",
                    ],
                },
                {
                    name: "Pink Dlight Rose Bouquet",
                    description: "Add a touch of elegance to your loved one's day with our Light Pink Roses in Cream Wrapping. This charming small bouquet features delicate light pink roses, beautifully presented in cream wrapping for a sophisticating speacial moments.",
                    price: 70.99,
                    stock: 16,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209088/WhatsApp_Image_2026-01-12_at_10.07.01_tufhde.jpg",
                    ],

                },
                {
                    name: "Passion Flowers Vase",
                    description: "This striking floral arrangement is a vivid celebration of elegance, combining the radiant charm of red anthuriums, the vibrancy of red gerberas, and the delicate touch of fuchsia baby roses. Each bloom is carefully arranged to create a harmonious, display of passion and grace, beautifully wrapped in copper wrap and presented in a sleek fishbowl glass vass.",
                    price: 40.99,
                    stock: 30,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209103/WhatsApp_Image_2026-01-12_at_10.07.18_wybytm.jpg",

                    ],
                },
                {
                    name: "Royal Colorful Flower Bouquet",
                    description: "Celebrate love and togetherness with this stunning pink baby rose, red baby rose, pink rose rosita vendela, red gerbera, and red anthurium bouquet . beautifully wrapped in coppper and cream wraps, this floral masterpiece symbolizes warmath, admiration, and pasion, making in the perfect gift for your loved one.",
                    price: 46.99,
                    stock: 20,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209116/WhatsApp_Image_2026-01-12_at_10.07.31_msr3g2.jpg",

                    ],
                },
                {
                    name: "Striking Crimson Floral Bouquet",
                    description: "Turn any moment into a heartfelt memory with this striking bouquet of red roses, pink baby roses, pink lilies, and fuchsia baby roses all elegantly wrapped in rich copper paper. The vibrant mix of colors creates a warm , romantic feel, while the luxurious wrapping adds a touch of refinement.",
                    price: 50.99,
                    stock: 20,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209167/WhatsApp_Image_2026-01-12_at_10.07.48_xwx7ov.jpg",

                    ],
                },
                {
                    name: "Floral Essence Rose Bouquet",
                    description: "A bold expression of passion and elegance, this elegance and luxury roses bouquet is designed to leave a lasting impression. Featuring red and purple roses paired with green eucalyptus, all beautifully wrapped in sleek black, it exudes sophistication and charm. Every detail reflects refined taste, making it a thoughfull and heartfelt choice for your speacial and loved people.",
                    price: 74.99,
                    stock: 14,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209233/WhatsApp_Image_2026-01-12_at_10.08.09_eeg3ep.jpg",
                    ],
                },
                {
                    name: "Radiant Pink Flower Bouquet",
                    description: "Every flower in this bouquet tells a story. The purple rose whispers enchantment and mystery, while the bold fuchia rose speaks of admiration and confidence. the elegant white orchid quitly adds grace and purity to the arrangement. Wrapped delicately in cream and dark teal wraps, this bouquet is a masterpiece of beauty and meaning",
                    price: 65.99,
                    stock: 10,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209249/WhatsApp_Image_2026-01-12_at_10.08.21_ctv4jf.jpg",
                    ],
                },
                {
                    name: "Royal Colorful Flower Bouquet",
                    description: "Celebrate love and togetherness with stunning pink baby ros, red baby rose, pink rose rosita vendela, redcgerbera, and red anthurium bouquet. Beautifully wrapped in copper and cream wraps, this floral masterpiece symbolizea warmath, admiration, and passion, making it the perfect gift for your loved one.",
                    price: 46.00,
                    stock: 5,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209265/WhatsApp_Image_2026-01-12_at_10.08.34_gdljhh.jpg",
                    ],
                },
                {
                    name: "Uniquely Gorgeous Rose Bouquet",
                    description: "A grand gesture of love and grace, this grand bouquet of white and peach roses embodies timeless beauty in every petal. The serene white roses symbolize purity and admiration, while the peach roses add warmth, gratitude, and gentle affection. Wrapped elegantly in soft cream paper. Perfect for heartfelt celebrations, anniversaries, or simply to express deep emotions.",
                    price: 180.00,
                    stock: 15,
                    image: ["https://res.cloudinary.com/due3ly2d3/image/upload/v1768209279/WhatsApp_Image_2026-01-12_at_10.08.48_ljvcyl.jpg",

                    ],
                },

            ],
            { returning: true }
        );
        console.log("✅ Products seeded");

        // ======== CART=========

        const carts = await Cart.bulkCreate(
            [
                {
                    userId: users[1].id,
                    productId: products[0].id,
                    quantity: 2,
                },
                {
                    userId: users[1].id,
                    productId: products[2].id,
                    quantity: 1,
                },
                {
                    userId: users[2].id,
                    productId: products[3].id,
                    quantity: 1,
                },
            ],
            { returning: true }
        );
        console.log("✅ Cart seeded");

        // ========== ORDERS =======
        const orders = await Order.bulkCreate([
            {
                userId: 2,
                orderNumber: "FLOW-1001",
                status: "confirmed",
                totalAmount: 65.99,
                shippingAddress: {
                    fullName: "Sophia Alma",
                    phone: "+212 645671023",
                    address: "avenue hassan 2",
                    city: "Agadir",
                },
                paymentMethod: "cash",
                paymentStatus: "pending",
                notes: "Please deliver before 6 PM",
                deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            },
            {
                userId: 3,
                orderNumber: "FLOW-1002",
                status: "pending",
                totalAmount: 130.99,
                shippingAddress: {
                    fullName: "Laila Hgad",
                    phone: "+212 612304560",
                    address: "Hay Salam",
                    city: "Agadir",
                },
                paymentMethod: "cash",
                paymentStatus: "pending",

            },
        ]);
        console.log("✅ Orders seeded");

        console.log("💐FLOWER APP SEEDED SUCCESSFULLY");
        console.log("\n📃Test Credentials:");
        console.log("Admin - Email: siham@flower.com, Password: siham");
        console.log("User 1 - Email: sophia@alma.com, Password: password123");
        console.log("User 2 - Email: laila@exemple.com, Password: laila123");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }


};
seedAll();