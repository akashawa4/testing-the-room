import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Branding and Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img src="/logo.svg" alt="Nivasi Space Logo" className="w-10 h-10 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">NIVASI SPACE</h3>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            India's trusted college room rental platform connecting students with perfect accommodations since 2025. We blend technology with student needs to help you find your ideal room near campus.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mt-0.5">
                                    <span className="text-white text-xs">📍</span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                    Dr. DY Patil Pratishthan's College of Engineering, Salokhenagar, Kolhapur, Maharashtra, 416007 India
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">📞</span>
                                </div>
                                <p className="text-gray-300 text-sm">+91 7385553529</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✉️</span>
                                </div>
                                <p className="text-gray-300 text-sm">contactnivasispace@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <div className="space-y-2">
                            <Link to="/about" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">About Us</Link>
                            <Link to="/privacy-policy" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Terms of Service</Link>
                            <Link to="/success-stories" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Success Stories</Link>
                            <Link to="/contact" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Contact Us</Link>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
                        <div className="space-y-2">
                            <Link to="/terms-conditions" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Terms & Conditions</Link>
                            <Link to="/privacy-policy" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Privacy Policy</Link>
                            <Link to="/refund-policy" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Refund Policy</Link>
                            <Link to="/safety-guidelines" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">Safety Guidelines</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 Nivasi Space. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Design & Develop by: <span className="text-orange-300 font-medium">Akash.Solutions</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
