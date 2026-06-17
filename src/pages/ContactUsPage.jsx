import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const ContactUsPage = () => {
    const handleWhatsApp = () => {
        window.open('https://wa.me/917385553529?text=Hi, I found your contact on Nivasi Space and would like to inquire about room listings.', '_blank');
    };

    const handleEmail = () => {
        window.open('mailto:contactnivasispace@gmail.com?subject=Inquiry from Nivasi Space', '_blank');
    };

    const handleCall = () => {
        window.open('tel:+917385553529', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Contact Us"
                subtitle="We're here to help you find your perfect room"
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions about finding a room, listing your property, or using Nivasi Space?
                            We're here to help! Reach out through any of the channels below.
                        </p>

                        <div className="space-y-6">
                            {/* WhatsApp */}
                            <div
                                onClick={handleWhatsApp}
                                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                        <MessageCircle className="w-7 h-7 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">WhatsApp</h3>
                                        <p className="text-green-600 font-medium">+91 7385553529</p>
                                        <p className="text-gray-500 text-sm">Fastest response • Usually within minutes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div
                                onClick={handleCall}
                                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Phone className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
                                        <p className="text-blue-600 font-medium">+91 7385553529</p>
                                        <p className="text-gray-500 text-sm">Available 9 AM - 8 PM IST</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div
                                onClick={handleEmail}
                                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Mail className="w-7 h-7 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                                        <p className="text-orange-600 font-medium">contactnivasispace@gmail.com</p>
                                        <p className="text-gray-500 text-sm">Response within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-7 h-7 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
                                        <p className="text-gray-600">
                                            Dr. D.Y. Patil Pratishthan's College of Engineering,<br />
                                            Salokhenagar, Kolhapur,<br />
                                            Maharashtra, 416007 India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form / FAQ */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                            <div className="space-y-4">
                                <div className="border-b border-gray-100 pb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">How do I list my room on Nivasi Space?</h3>
                                    <p className="text-gray-600 text-sm">
                                        Contact us via WhatsApp or phone, and our team will help you create a listing
                                        with proper verification.
                                    </p>
                                </div>

                                <div className="border-b border-gray-100 pb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Is there a fee for students?</h3>
                                    <p className="text-gray-600 text-sm">
                                        No! Nivasi Space is completely free for students looking for rooms. We don't
                                        charge any brokerage or service fees.
                                    </p>
                                </div>

                                <div className="border-b border-gray-100 pb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">How do you verify room listings?</h3>
                                    <p className="text-gray-600 text-sm">
                                        Our team personally visits and verifies each listing before it goes live on
                                        the platform. We check photos, amenities, and owner details.
                                    </p>
                                </div>

                                <div className="pb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Can I schedule a room visit?</h3>
                                    <p className="text-gray-600 text-sm">
                                        Yes! Contact the room owner directly through our platform or reach out to us
                                        and we'll help arrange a visit.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <Clock className="w-8 h-8 text-orange-200" />
                                <h2 className="text-xl font-bold">Office Hours</h2>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-orange-100">Monday - Friday</span>
                                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-100">Saturday</span>
                                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-100">Sunday</span>
                                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                                </div>
                            </div>
                            <p className="text-orange-200 text-sm mt-4">
                                * WhatsApp messages are usually responded to within a few hours
                            </p>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
};

export default ContactUsPage;
