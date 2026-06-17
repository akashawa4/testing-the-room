import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Award, Shield, Clock, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import PageHeader from '@/components/PageHeader.jsx';


const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="About Nivasi Space"
                subtitle="India's trusted college room rental platform"
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Founded in 2025, Nivasi Space was born out of a simple observation: finding safe, affordable,
                                and comfortable accommodation near colleges shouldn't be a stressful experience for students.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We started in Kolhapur, Maharashtra, with a vision to connect students with verified
                                room owners, making the search for the perfect room as easy as a few taps on their phone.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we're proud to serve students across multiple colleges, helping thousands find
                                their home away from home near their educational institutions.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-8 text-center">
                            <img src="/logo.svg" alt="Nivasi Space Logo" className="w-32 h-32 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-orange-800">NIVASI SPACE</h3>
                            <p className="text-orange-600">Find your perfect room near campus</p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Target className="w-7 h-7 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To simplify the room hunting process for college students by providing a trusted,
                            transparent, and technology-driven platform that connects them with verified
                            accommodation options near their campuses.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Star className="w-7 h-7 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To become India's most trusted student accommodation platform, empowering every
                            college student to find safe, affordable, and comfortable living spaces that
                            feel like home.
                        </p>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Nivasi Space?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Listings</h3>
                            <p className="text-gray-600">All our room listings are verified by our team to ensure safety and authenticity.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Response</h3>
                            <p className="text-gray-600">Get instant responses from room owners and book your room within minutes.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student-First</h3>
                            <p className="text-gray-600">Designed specifically for students with features that matter to them most.</p>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 mb-12 text-white">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">2+</div>
                            <div className="text-orange-100">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">125+</div>
                            <div className="text-orange-100">Room Listings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">20+</div>
                            <div className="text-orange-100">Happy Owners</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">3+</div>
                            <div className="text-orange-100">Colleges Covered</div>
                        </div>
                    </div>
                </section>

                {/* Team Values */}
                <section className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: Shield, title: 'Trust & Safety', desc: 'We prioritize the safety and security of both students and room owners.' },
                            { icon: Users, title: 'Community', desc: 'Building a supportive community of students and property owners.' },
                            { icon: Award, title: 'Quality', desc: 'Maintaining high standards for all listed accommodations.' },
                            { icon: CheckCircle, title: 'Transparency', desc: 'Clear pricing, honest descriptions, and no hidden charges.' }
                        ].map((value, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <value.icon className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                                    <p className="text-gray-600 text-sm">{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer CTA */}
            <section className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to find your perfect room?</h2>
                    <p className="text-gray-400 mb-6">Join thousands of students who found their home with Nivasi Space</p>
                    <Link to="/">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                            Explore Rooms
                        </Button>
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default AboutPage;
