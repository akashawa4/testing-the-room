import React from 'react';
import { Shield, AlertTriangle, Eye, Lock, Phone, Users, Home, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const SafetyGuidelinesPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Safety Guidelines"
                subtitle="Stay safe while finding your perfect room"
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="w-12 h-12 text-orange-200" />
                        <div>
                            <h2 className="text-2xl font-bold">Your Safety is Our Priority</h2>
                            <p className="text-orange-100">Follow these guidelines to ensure a safe room hunting experience</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Before Visiting */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Before Visiting a Property</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "Research the area and neighborhood online",
                                "Verify the listing details with the owner",
                                "Check the owner's profile and reviews if available",
                                "Ask for photos and videos of the property",
                                "Confirm the exact address before visiting",
                                "Share property details with family/friends"
                            ].map((tip, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-sm">{tip}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* During Visit */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">During Property Visit</h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { do: true, text: "Visit during daytime hours only" },
                                { do: true, text: "Take a friend or family member along" },
                                { do: true, text: "Inform someone about your visit location and time" },
                                { do: true, text: "Check all rooms, bathrooms, and common areas" },
                                { do: true, text: "Test water supply, electricity, and locks" },
                                { do: true, text: "Ask about safety measures like CCTV, locks, etc." },
                                { do: true, text: "Meet the neighbors if possible" },
                                { do: true, text: "Trust your instincts - if something feels wrong, leave" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Payment Safety */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Payment Safety</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" /> DO
                                </h3>
                                <ul className="space-y-2">
                                    {[
                                        "Verify owner's identity before paying",
                                        "Get all agreements in writing",
                                        "Ask for proper receipts",
                                        "Pay through traceable methods (UPI, bank transfer)",
                                        "Keep copies of all documents"
                                    ].map((item, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-green-600">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                                    <XCircle className="w-5 h-5" /> DON'T
                                </h3>
                                <ul className="space-y-2">
                                    {[
                                        "Never pay without visiting the property",
                                        "Never pay full rent in advance",
                                        "Never share OTP or banking PINs",
                                        "Avoid cash payments without receipts",
                                        "Don't sign blank documents"
                                    ].map((item, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-red-600">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* For Female Students */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-pink-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Special Guidelines for Female Students</h2>
                        </div>
                        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
                            <ul className="space-y-3">
                                {[
                                    "Look for accommodations in well-lit, populated areas",
                                    "Prefer buildings with female wardens or caretakers",
                                    "Ensure proper locks on doors and windows",
                                    "Check for CCTV cameras in common areas (not in private spaces)",
                                    "Verify if entry/exit is monitored",
                                    "Ask about visitor policies and timings",
                                    "Connect with current or previous female tenants for reviews"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Red Flags */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Red Flags to Watch For</h2>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <ul className="space-y-3">
                                {[
                                    "Owner asking for full payment without showing the property",
                                    "Pressure to make immediate decisions",
                                    "Refusal to provide written agreements",
                                    "Prices significantly lower than market rates",
                                    "Asking for personal documents like Aadhaar, bank details upfront",
                                    "Reluctance to show identity proof",
                                    "Contradictory information about the property"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Emergency Contacts */}
                    <section className="bg-orange-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">General Emergency</h3>
                                <p className="text-2xl font-bold text-orange-600">112</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Women Helpline</h3>
                                <p className="text-2xl font-bold text-orange-600">1091</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Police</h3>
                                <p className="text-2xl font-bold text-orange-600">100</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Nivasi Space Support</h3>
                                <p className="text-2xl font-bold text-orange-600">+91 7385553529</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>


        </div>
    );
};

export default SafetyGuidelinesPage;
