# Nivasi.space - College Room Rental Website - Orange & White Theme

A modern, vibrant, and user-friendly room rental platform designed specifically for college students. Features a beautiful orange and white color scheme with smooth animations and enhanced user experience. Powered by Nivasi.space.

## ✨ Enhanced Features

### 🧡 **Orange & White Theme**
- **Orange Gradient Backgrounds**: Beautiful orange-to-white gradients throughout the interface
- **Vibrant Orange Buttons**: Eye-catching orange gradient buttons with hover effects and animations
- **Orange Typography**: Gradient text effects for titles and prices in orange tones
- **Clean White Backgrounds**: Professional white backgrounds with orange accents
- **Warm Color Palette**: Consistent orange and white theme creating a welcoming atmosphere

### 🏠 **Homepage - Room Listing View**
- **Enhanced Grid Layout**: Responsive 3-column desktop, 1-column mobile layout
- **Orange-Themed Room Cards**: 
  - Orange gradient image placeholders with rounded corners
  - Star ratings with yellow stars
  - Orange gradient price displays
  - Orange icon backgrounds for location and phone
  - Heart favorite buttons with hover effects
  - Orange gradient action buttons (Call, Map, Details)

### 📱 **Room Detail Modal**
- **Enhanced Image Carousel**: Beautiful rounded carousel with navigation
- **Orange Gradient Headers**: Colorful orange gradient titles and enhanced typography
- **Interactive Elements**: Favorite hearts, star ratings, and review counts
- **Orange Contact Buttons**: 
  - Orange gradient for "Call Now"
  - Orange gradient for "WhatsApp"
  - Enhanced "View on Google Maps" and "Share Room" buttons
- **Orange Amenities**: Styled tags with orange backgrounds and borders
- **Backdrop Blur**: Professional modal backdrop with orange-tinted blur effects

### ➕ **Admin Panel - Enhanced Authentication**
- **Secure Access Control**: Password-protected admin functionality
- **Orange Login Modal**: 
  - Orange gradient shield icon and enhanced header
  - Orange-themed info boxes with professional styling
  - Enhanced form inputs with orange focus effects
  - Orange gradient login buttons with loading animations
- **Admin Status Display**: Orange admin mode badge with animations
- **Session Management**: Secure logout functionality

### 🎨 **Orange & White Design System**
- **Color Palette**: 
  - Primary: Orange gradients (#ff6b35 to #f7931e)
  - Secondary: Orange variations (#ff8c42 to #ff6b35)
  - Success: Orange-amber gradients (#ff9500 to #ff6b35)
  - Warning: Light orange gradients (#ffb347 to #ff8c42)
  - Accent: Orange-yellow gradients (#ff6b35 to #ffb347)
  - Background: Warm white to light orange (#fff8f0 to #ffe4d6)

- **Typography**: Inter font family with orange gradient text effects
- **Animations**: Smooth transitions, hover effects, and loading states
- **Responsive Design**: Enhanced mobile experience with touch-friendly elements

### 🏠 Homepage - Room Listing
- **Responsive Grid Layout**: 3 rooms per row on desktop, 1 per row on mobile
- **Room Cards** with:
  - Thumbnail photos with fallback placeholders
  - Room title and location
  - Monthly rent in Indian Rupees (₹)
  - Click-to-call contact numbers
  - "View on Map" and "Details" buttons

### 📱 Mobile-First Design
- Fully responsive layout
- Touch-friendly buttons and interactions
- Optimized for mobile browsing
- Click-to-call functionality for phone numbers

### 🔍 Room Detail Modal
- **Image Carousel** with navigation controls
- **Contact Options**: Direct call and WhatsApp integration
- **Google Maps Integration** (placeholder - requires API key for production)
- **Amenities Display** with styled tags
- **Share Functionality** with native sharing API support
- **Full Address** and location details

### ➕ Admin Panel - Add Room Form
- **Admin Authentication**: Secure login required to access room management
- **Comprehensive Form** with validation:
  - Room title and description
  - Monthly rent (numeric validation)
  - Contact number (phone validation)
  - Full address and location area
  - Google Maps link (URL validation)
  - Amenities (comma-separated)
  - Multiple image upload
- **Real-time Validation** with error messages
- **Success/Error Feedback** after form submission
- **Image Preview** with remove functionality
- **Admin Status Display** with logout functionality

### 🔐 Security Features
- **Password-Protected Admin Access**: Only authorized users can add rooms
- **Session Management**: Admin status maintained during session
- **Secure Logout**: Clear admin privileges when logging out
- **Demo Credentials**: Default password is `admin123` (change in production)

### 🎨 Design Features
- **Modern UI** with Tailwind CSS
- **Smooth Animations** and hover effects
- **Professional Color Palette** with blue accents
- **Consistent Typography** using system fonts
- **Shadow Effects** and rounded corners
- **Interactive Elements** with visual feedback

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/pnpm

## Project Structure

```
college-room-rental/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── RoomCard.jsx  # Room listing card
│   │   ├── RoomDetailModal.jsx  # Room details modal
│   │   ├── AddRoomModal.jsx     # Add room form
│   │   └── AdminLoginModal.jsx  # Admin authentication
│   ├── data/
│   │   └── rooms.js      # Sample room data
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   └── main.jsx          # Application entry point
├── dist/                  # Production build files
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   # or
   pnpm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   # or
   pnpm run preview
   ```

## Admin Authentication

### Default Credentials
- **Username**: Not required
- **Password**: `admin123`

### How to Use
1. **Access Admin Panel**: Click the "Add Room" button
2. **Login**: Enter the admin password when prompted
3. **Admin Mode**: Once logged in, you'll see "Admin Mode" badge in the header
4. **Add Rooms**: Click "Add Room" to access the form directly (no login required while in admin mode)
5. **Logout**: Click the "Logout" button to exit admin mode

### Changing Admin Password
To change the admin password in production:
1. Open `src/components/AdminLoginModal.jsx`
2. Modify the `ADMIN_PASSWORD` constant
3. Rebuild the application: `npm run build`

### Security Notes
- The current implementation uses a simple password-based authentication
- For production use, consider implementing:
  - Server-side authentication
  - JWT tokens
  - Role-based access control
  - Password hashing

## Configuration

### Google Maps Integration
To enable Google Maps functionality in production:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Replace `YOUR_API_KEY` in `RoomDetailModal.jsx` with your actual API key
3. Enable the following APIs:
   - Maps Embed API
   - Places API (optional)

### Sample Data
The application comes with sample room data in `src/data/rooms.js`. You can:
- Modify the sample data to match your college area
- Replace placeholder images with actual room photos
- Update contact numbers and addresses

## Features in Detail

### Room Cards
Each room card displays:
- **Image**: Placeholder with fallback for missing images
- **Title**: Descriptive room name
- **Rent**: Formatted in Indian Rupees
- **Location**: Area name with map icon
- **Contact**: Clickable phone number
- **Actions**: View on Map and Details buttons

### Room Detail Modal
Comprehensive room information including:
- **Image Carousel**: Navigate through multiple photos
- **Pricing**: Prominent rent display
- **Contact Options**: Call and WhatsApp buttons
- **Description**: Detailed room information
- **Amenities**: Tagged list of features
- **Location**: Address with map integration
- **Sharing**: Native share API with clipboard fallback

### Add Room Form
Complete form for adding new listings:
- **Validation**: Real-time field validation
- **Image Upload**: Multiple file selection with preview
- **Error Handling**: Clear error messages
- **Success Feedback**: Confirmation after submission

## Customization

### Styling
- Colors can be modified in `src/App.css`
- Tailwind classes can be adjusted in components
- Custom CSS can be added for specific styling needs

### Data Structure
Room objects should follow this structure:
```javascript
{
  id: number,
  title: string,
  rent: number,
  contact: string,
  address: string,
  location: string,
  mapLink: string,
  images: string[],
  description: string,
  amenities: string[]
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is open source and available under the MIT License.

## Support
For support, visit [Nivase.com](https://nivase.com) or contact us at support@nivase.com.

---

**Built with ❤️ for college students**

