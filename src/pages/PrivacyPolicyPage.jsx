import React from 'react';
import { Shield, Eye, Lock, Database, Users, Bell, Mail, FileText } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Privacy Policy"
                subtitle="Last updated: January 2026"
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Introduction */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Nivasi Space ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                            explains how we collect, use, disclose, and safeguard your information when you use our website
                            and mobile application (collectively, the "Platform"). Please read this privacy policy carefully.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Name and email address (via Google Sign-In)</li>
                                    <li>Phone number (when you contact room owners)</li>
                                    <li>Profile picture (from Google account)</li>
                                    <li>Location preferences (city and college)</li>
                                    <li>Gender preference for room search</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Usage Information</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Device information and browser type</li>
                                    <li>IP address and location data</li>
                                    <li>Pages visited and features used</li>
                                    <li>Search queries and room preferences</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>To provide and maintain our Platform</li>
                            <li>To personalize your room search experience</li>
                            <li>To connect you with room owners</li>
                            <li>To send you updates about new listings matching your preferences</li>
                            <li>To improve our services and user experience</li>
                            <li>To detect and prevent fraud or abuse</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong>Room Owners:</strong> When you express interest in a room, we share your contact details.</li>
                            <li><strong>Service Providers:</strong> Third-party services that help us operate the Platform (e.g., Firebase, Google Analytics).</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security measures to protect your data, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                            <li>Secure HTTPS encryption for all data transfers</li>
                            <li>Firebase Authentication for secure login</li>
                            <li>Regular security audits and updates</li>
                            <li>Limited employee access to personal data</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account and associated data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Request a copy of your data</li>
                        </ul>
                    </section>

                    {/* Contact */}
                    <section className="bg-orange-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
                        </div>
                        <p className="text-gray-600">
                            If you have questions about this Privacy Policy, contact us at:
                        </p>
                        <p className="text-orange-600 font-medium mt-2">contactnivasispace@gmail.com</p>
                        <p className="text-gray-600 mt-1">Phone: +91 7385553529</p>
                    </section>
                </div>
            </main>


        </div>
    );
};

export default PrivacyPolicyPage;
