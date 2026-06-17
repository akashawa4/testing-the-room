// WhatsApp integration utilities

// Format phone number for WhatsApp
export const formatPhoneForWhatsApp = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // If it starts with +91, keep it
  if (cleaned.startsWith('+91')) {
    return cleaned.substring(1); // Remove + for WhatsApp
  }

  // If it starts with 91, keep it
  if (cleaned.startsWith('91')) {
    return cleaned;
  }

  // If it's a 10-digit number, add 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }

  // If it's already 12 digits (91 + 10 digits), return as is
  if (cleaned.length === 12) {
    return cleaned;
  }

  return cleaned;
};

// Format booking message for WhatsApp
export const formatBookingMessage = (booking, room) => {
  const bookingTypeLabels = {
    'inquiry': 'General Inquiry',
    'booking': 'Booking Request',
    'viewing': 'Room Viewing Request'
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not specified';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const message = `*NEW ROOM BOOKING REQUEST*
================================

*ROOM DETAILS:*
- Room: ${room.title || 'N/A'}
- Rent: Rs.${room.rent ? room.rent.toLocaleString() : 'N/A'}/month
- Location: ${room.location || 'N/A'}
- Contact: ${room.contact || 'N/A'}

*USER INFORMATION:*
- Name: ${booking.userName || 'Not provided'}
- Phone: ${booking.userPhone || 'Not provided'}
- Email: ${booking.userEmail || 'Not provided'}
- College: ${booking.userCollege || 'Not provided'}

*BOOKING DETAILS:*
- Type: ${bookingTypeLabels[booking.type] || booking.type || 'Inquiry'}
- Preferred Date: ${formatDate(booking.requestedDate)}

*MESSAGE:*
${booking.message || 'No additional message'}

--------------------------------
Booking ID: #${booking.id || 'N/A'}
Submitted: ${booking.createdAt ? new Date(booking.createdAt).toLocaleString('en-IN') : new Date().toLocaleString('en-IN')}

_This booking was submitted through Nivasi Space_
================================`;

  return message;
};

// Generate WhatsApp URL
export const generateWhatsAppUrl = (phone, message) => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

// Open WhatsApp with booking message
export const openWhatsAppWithBooking = (booking, room) => {
  const message = formatBookingMessage(booking, room);
  const whatsappUrl = generateWhatsAppUrl(room.contact, message);

  // Open in new tab/window
  window.open(whatsappUrl, '_blank');
};

// Copy message to clipboard
export const copyBookingMessage = async (booking, room) => {
  const message = formatBookingMessage(booking, room);

  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch (error) {
    console.error('Failed to copy message:', error);
    return false;
  }
}; 
