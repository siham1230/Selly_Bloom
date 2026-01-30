ellyBloom is a premium mobile application designed for browsing and purchasing fresh flowers. Built with a focus on beautiful aesthetics and smooth user interactions, it provides a delightful shopping experience for flower enthusiasts.

## Target Users
-**Customers**: Sign Up & Login: Users must register and create an account using their email and password.
-**Browser Flowers**:  Users can Browse a wide variety of flowers and arrangements.
-**Product Details**: Users can click on any flower product to view detailed information, such as description, price, and availability.
-**Add to Cart**: Users can add products to their shopping cart.
-**Ckeckout**: Users can proceed to checkout, fill in their name, phone number, address, and an optional message
-**Payment**: Users will pay via Cash on Delivery

## ✨ Features

- **Beautiful UI/UX**: Immersive design with simple aesthetics and smooth transitions.
- **Authentification**: 
-Registration & Login via email 
-Role-based access(Customer)
-JWT for user authentication
- **Product Catalog**: 
-Display a list of flowers categorized by type
Detailed view of individual products with descriptions and pricing
- **Shopping Cart**: Add product to the cart and view cart contents.
- **Seamless Checkout**: Input customer details for the order (Name, Phone, Address, Optional Message)
- **User Accounts**: User Profile management
-**Order Mangement**: Customers can place orders with all necessary details.
- Status of orders is managed within the backend

## 🛠 Tech Stack
 -**Backend**: Node.Js with Express
 -**Batabase**: PostgreSQL
 -**Secutity**: Password hashed by using bcrypt.
 -JWT(json Web tokens) for handling user authentication securely.
- **Containerization**: Docker is used for running the application and database in isolated containers.
-**Project Deployment**: Docker Compose simplifies the deployment process by managing both backend and database services.
- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons**: [Expo Vector Icons](https://icons.expo.fyi/)
-**Gihub**:  for code hosting all my [https://github.com/siham1230/Selly_Bloom]



## Get Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start --tunnel
   ngrok http 4000
   docker compose up --build


3. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan the QR code with Expo Go on your physical device

##  Project Structure (fronend)

- `app/`: Application screens and routing
- `assets/`: Images, fonts, and icons
- `services/`: API services and integrations
- `store/`: State management configuration
- `auth/`: Authentication logic
- `hooks/`: Custom hooks, eg., useProduct for fetching product data using useQuery and useMutation 

##  Project Structure (backend)
- `src/`: Main backend directory
-`config/`: Configuration files(Database, server)
-`Controllers/`: Controller files for handling router and requests.
-`middleware/`: for authentication and error handling.
-`models/`: Database models.
-`routes/`: API router.
-`Seeders/`: scripts for populating the database. 
-`App/`: Entry point for Express server.

## Docker Configuration
`Dockerfile/`: For building and containerizing the backend service.
`docker-compose.yml`/: To manage both the backend and PostgreSQL database containers.

##  Conclusion
The SellyBloom Mobile Application (MVP) is a simple yet elegant platform for browsing and purchasing fresh flowers. It focuses on delivering a seamless shopping experience for users, from browsing products to completing a cash-on-delivery purchase. While admin functionality is not included in this version, the system architecture is designed for scalability, allowing for future feature expansion.

