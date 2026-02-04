<<<<<<< HEAD
# real-estate-web-application
Full-stack real estate web application with user authentication, property listings, and CRUD operations
=======
# 🏡 Real Estate Website

A full-stack real estate web application that allows users to browse, search, and manage property listings. Built with modern web technologies and a clean, responsive design.

![Real Estate Website](logo.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🌟 Overview

Dream Home Real Estate is a comprehensive property management platform that connects buyers, sellers, and real estate professionals. The application provides an intuitive interface for browsing properties, managing listings, and user authentication.

## ✨ Features

### User Features
- 🔐 **User Authentication** - Secure login and registration system with JWT tokens
- 🏠 **Property Browsing** - View featured and all available properties
- 🔍 **Advanced Search** - Search properties by location, city, or property name
- 📱 **Responsive Design** - Fully responsive across all devices
- 👤 **User Dashboard** - Manage personal property listings
- 📝 **Property Details** - Detailed view of individual properties with images and specifications

### Admin Features
- 🎛️ **Admin Dashboard** - Comprehensive admin panel for property management
- ➕ **Add Properties** - Create new property listings with images and details
- ✏️ **Edit Properties** - Update existing property information
- 🗑️ **Delete Properties** - Remove properties from listings
- 👥 **User Management** - View and manage registered users

### Property Features
- 📸 Multiple property images
- 💰 Price information
- 📍 Location details
- 🛏️ Bedrooms and bathrooms count
- 📐 Square footage
- 🏷️ Property type (House, Apartment, Villa, etc.)
- 📊 Property status (For Sale, For Rent)

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with custom properties and animations
  - Custom CSS with responsive design
  - Font Awesome 6.4.0 for icons
  - Google Fonts (Poppins, Playfair Display)
- **JavaScript (ES6+)** - Client-side logic and interactivity
  - Vanilla JavaScript for DOM manipulation
  - Fetch API for HTTP requests
  - Local Storage for client-side data persistence

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js v5.2.1** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose v9.1.5** - MongoDB object modeling

### Authentication & Security
- **JSON Web Tokens (JWT) v9.0.3** - Secure authentication
- **bcryptjs v3.0.3** - Password hashing and encryption

### Additional Libraries
- **dotenv v17.2.3** - Environment variable management
- **CORS v2.8.6** - Cross-Origin Resource Sharing middleware

## 📁 Project Structure

```
real-estate-website-final/
│
├── config/
│   └── db.js                 # MongoDB connection configuration
│
├── controllers/
│   ├── auth.js              # Authentication controller (login, register)
│   └── properties.js        # Property CRUD operations controller
│
├── middleware/
│   └── auth.js              # JWT authentication middleware
│
├── models/
│   ├── User.js              # User schema and model
│   └── Property.js          # Property schema and model
│
├── routes/
│   ├── auth.js              # Authentication routes
│   └── properties.js        # Property routes
│
├── pages/
│   ├── add-property.html    # Add new property page
│   ├── admin-dashboard.html # Admin dashboard
│   ├── login.html           # User login page
│   ├── signup.html          # User registration page
│   ├── property-details.html # Individual property details
│   ├── view-all.html        # All properties listing
│   └── logo.png             # Logo image
│
├── css/
│   ├── style.css            # Main stylesheet
│   ├── responsive.css       # Responsive design styles
│   └── admin.css            # Admin dashboard styles
│
├── js/
│   ├── main.js              # Main JavaScript logic
│   ├── auth.js              # Authentication logic
│   ├── property.js          # Property management logic
│   ├── search.js            # Search functionality
│   └── admin.js             # Admin dashboard logic
│
├── assets/                  # Static assets (images, etc.)
│
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore file
├── index.html              # Homepage
├── logo.png                # Main logo
├── package.json            # Node.js dependencies
├── package-lock.json       # Dependency lock file
├── seed.js                 # Database seeding script
├── server.js               # Express server entry point
└── README.md               # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnnavarapuGanesh/real-estate-website.git
   cd real-estate-website-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Seed the database (optional)**
   ```bash
   node seed.js
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/realestate` |
| `JWT_SECRET` | Secret key for JWT token generation | `mysecretkey123` |
| `PORT` | Server port number | `5000` |

### Database Schema

#### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  createdAt: Date
}
```

#### Property Model
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  location: String (required),
  city: String (required),
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  propertyType: String,
  status: String,
  images: [String],
  owner: ObjectId (ref: 'User'),
  createdAt: Date
}
```

## 💻 Usage

### For Users

1. **Browse Properties**
   - Visit the homepage to view featured properties
   - Click "View All Properties" to see complete listings

2. **Search Properties**
   - Use the search bar to find properties by location or name
   - Filter results based on your preferences

3. **Register/Login**
   - Create an account to save favorite properties
   - Login to manage your property listings

4. **Add Property**
   - Navigate to "Add Property" after logging in
   - Fill in property details and upload images
   - Submit to create a new listing

### For Administrators

1. **Access Admin Dashboard**
   - Login with admin credentials
   - Navigate to the admin dashboard

2. **Manage Properties**
   - View all properties in the system
   - Edit or delete existing properties
   - Approve pending listings

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Property Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/properties` | Get all properties | No |
| GET | `/api/properties/:id` | Get single property | No |
| POST | `/api/properties` | Create new property | Yes |
| PUT | `/api/properties/:id` | Update property | Yes (Owner/Admin) |
| DELETE | `/api/properties/:id` | Delete property | Yes (Owner/Admin) |
| GET | `/api/properties/user/:userId` | Get user's properties | Yes |

### Request/Response Examples

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Create Property**
```bash
POST /api/properties
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Luxury Villa",
  "description": "Beautiful 4-bedroom villa",
  "price": 500000,
  "location": "Downtown",
  "city": "New York",
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 2500,
  "propertyType": "Villa",
  "status": "For Sale",
  "images": ["image1.jpg", "image2.jpg"]
}
```

## 📸 Screenshots

### Homepage
The landing page features a hero section with featured properties and service offerings.

### Property Listings
Browse through all available properties with filtering and search capabilities.

### Property Details
Detailed view of individual properties with image galleries and complete specifications.

### Admin Dashboard
Comprehensive admin panel for managing all properties and users.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Annavarapu Ganesh**

- Location: Andhra Pradesh, India
- Email: realestate@123
- Phone: 123-456-789

---

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify your `MONGO_URI` in the `.env` file
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running (for local installations)

**Port Already in Use**
- Change the `PORT` value in `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill` (Mac/Linux)

**JWT Authentication Fails**
- Ensure `JWT_SECRET` is set in `.env`
- Check if the token is being sent in the Authorization header
- Verify token hasn't expired

## 🚀 Future Enhancements

- [ ] Property comparison feature
- [ ] Advanced filtering (price range, area, amenities)
- [ ] Favorite/Wishlist functionality
- [ ] Email notifications for new listings
- [ ] Virtual tour integration
- [ ] Map integration for property locations
- [ ] Payment gateway integration
- [ ] Review and rating system
- [ ] Chat functionality between buyers and sellers

## 📞 Support

For support, email realestate@123 or create an issue in the repository.

---

**© 2025 Real Estate. All rights reserved By Annavarapu Ganesh.**
>>>>>>> 97080c9 (Add complete real estate web application)
