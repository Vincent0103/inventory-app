# Inventory App

## Description

Y2Plush is a comprehensive inventory management system designed specifically for plushy collections. This project showcases a full-stack web application built with modern web technologies, featuring a beautiful Y2K-inspired design theme with purple/pink gradients and nostalgic aesthetics.

The application allows users to manage their plushy inventory with detailed categorization, filtering, and search capabilities. Users can create, edit, and delete plushies with rich metadata including size, squishiness levels, materials, categories, and stock tracking. The system also supports category management with custom color schemes and visual tags.

The website has been meticulously designed with a focus on user experience and visual appeal, featuring a responsive design that works seamlessly across mobile, tablet, and desktop devices. The Y2K aesthetic is achieved through carefully chosen color palettes, gradients, and typography that evoke the nostalgic feel of the early 2000s.

The most challenging aspect of this project was implementing the complex filtering system that allows users to filter plushies by multiple criteria simultaneously (categories, materials, sizes, and price ranges) while maintaining good performance with the PostgreSQL database. The search functionality with real-time input handling and the dynamic navbar background system also required careful attention to detail.

## Features

- **Responsive Design**: Fully responsive web application optimized for mobile, tablet, and desktop screens
- **Beautiful Y2K Theme**: Custom-designed purple/pink gradient theme with nostalgic aesthetics
- **Comprehensive Inventory Management**: Create, edit, delete, and view plushies with detailed information
- **Advanced Filtering System**: Filter plushies by categories, materials, sizes, and price ranges
- **Real-time Search**: Search functionality with dynamic input handling and visual feedback
- **Category Management**: Create and manage custom categories with personalized color schemes
- **Rich Metadata**: Track plushy details including size (XS-XL), squishiness levels, materials, and stock quantities
- **Visual Tag System**: Color-coded category tags with custom background and border colors
- **Stock Tracking**: Monitor available quantities for each plushy item
- **Image Management**: Support for external image URLs with validation
- **Form Validation**: Comprehensive client and server-side validation for all inputs
- **Error Handling**: User-friendly error pages and validation feedback
- **Database Integration**: PostgreSQL database with optimized queries and relationships

## Technologies Used

- **Runtime Environment**: Bun
- **Backend Framework**: Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Database**: PostgreSQL
- **CSS Framework**: Tailwind CSS v4
- **Validation**: Express Validator
- **Color Utilities**: hex-rgb for color manipulation
- **Development Tools**: ESLint, Prettier
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- PostgreSQL database server running
- Node.js (for some development tools)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/inventory-app.git
   cd inventory-app
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Set up the database**:
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env` and configure your database connection
   - Run the database setup script:

   ```bash
   bun run src/db/populatedb.js
   ```

4. **Start the development server**:

   ```bash
   bun run dev
   ```

5. **In a separate terminal, watch for CSS changes**:

   ```bash
   bun run dev:css
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

### Production Deployment

```bash
bun run start
```

## Database Schema

The application uses a relational database with the following main tables:

- **PLUSHY**: Main plushy items with metadata
- **CATEGORY**: Plushy categories with custom colors
- **MATERIAL**: Available materials for plushies
- **SIZE**: Size options (XS, S, M, L, XL)
- **SQUISHINESS**: Squishiness levels
- **CATEGORYPLUSHY**: Many-to-many relationship between plushies and categories
- **MATERIALPLUSHY**: Many-to-many relationship between plushies and materials

## Project Structure

```
inventory-app/
├── src/
│   ├── controllers/     # Business logic and request handling
│   ├── db/             # Database queries and connection
│   ├── routes/         # Express.js route definitions
│   ├── views/          # EJS templates and partials
│   ├── utilities.js    # Helper functions
│   └── app.js          # Main application entry point
├── public/             # Static assets (CSS, images, fonts)
└── package.json        # Project dependencies and scripts
```

## Key Features Explained

### Dynamic Navbar Background

The navbar adapts its background color based on the current page context, using conditional Tailwind classes to ensure proper CSS purging and build optimization.

### Advanced Filtering

The filtering system supports multiple simultaneous filters with optimized SQL queries that use JOINs to efficiently retrieve plushies matching all selected criteria.

### Real-time Search

Search functionality includes dynamic input handling with visual feedback, showing/hiding the search button based on input content.

### Category Management

Categories feature custom color schemes with background colors, border colors, and text color options for maximum visual customization.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Tailwind CSS** for the utility-first CSS framework
- **Express.js** for the robust web application framework
- **PostgreSQL** for the reliable relational database
- **Bun** for the fast JavaScript runtime and package manager
- **EJS** for the efficient template engine
- **Comico Font** for the custom typography that enhances the Y2K aesthetic
