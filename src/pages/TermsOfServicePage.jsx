import React from 'react';
import { FileText, CheckCircle, XCircle, AlertTriangle, Users, Home, Shield, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Terms of Service"
                subtitle="Last updated: January 2026"
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Agreement */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing or using Nivasi Space, you agree to be bound by these Terms of Service.
                            If you disagree with any part of these terms, you may not access our Platform.
                            These terms apply to all visitors, users, and others who access or use our services.
                        </p>
                    </section>

                    {/* Eligibility */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Eligibility</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To use Nivasi Space, you must be at least 18 years old or have parental consent.
                            By using our Platform, you represent and warrant that you meet these requirements
                            and have the legal capacity to enter into these Terms.
                        </p>
                    </section>

                    {/* User Responsibilities */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
                        </div>
                        <p className="text-gray-600 mb-4">As a user of Nivasi Space, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Provide accurate and truthful information in your profile</li>
                            <li>Use the Platform only for lawful purposes</li>
                            <li>Respect other users and room owners</li>
                            <li>Not post false, misleading, or fraudulent content</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Report any suspicious or inappropriate activity</li>
                        </ul>
                    </section>

                    {/* Room Listings */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Room Listings</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Nivasi Space is a platform that connects students with room owners. We do not own,
                                manage, or control any of the listed properties.
                            </p>
                            <p>
                                While we strive to verify listings, we cannot guarantee the accuracy of all information
                                provided by room owners. Users are encouraged to verify details and visit properties
                                before making any commitments.
                            </p>
                        </div>
                    </section>

                    {/* Prohibited Activities */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Prohibited Activities</h2>
                        </div>
                        <p className="text-gray-600 mb-4">You are prohibited from:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Using the Platform for any illegal purpose</li>
                            <li>Posting fake or misleading room listings</li>
                            <li>Harassing or threatening other users</li>
                            <li>Attempting to gain unauthorized access to our systems</li>
                            <li>Collecting user information without consent</li>
                            <li>Using automated systems or bots to access the Platform</li>
                            <li>Interfering with the proper functioning of the Platform</li>
                        </ul>
                    </section>

                    {/* Disclaimer */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-gray-700">
                                Nivasi Space is provided "as is" without warranties of any kind. We do not guarantee
                                uninterrupted service, accuracy of listings, or availability of rooms. Users interact
                                with room owners at their own risk. We recommend conducting proper due diligence before
                                entering into any rental agreement.
                            </p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Nivasi Space shall not be liable for any indirect, incidental, special, consequential,
                            or punitive damages arising from your use of the Platform, including but not limited to
                            disputes between users and room owners, property damage, or personal injury.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify these Terms at any time. We will notify users of significant
                            changes through the Platform or via email. Continued use of the Platform after changes
                            constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-orange-50 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Questions?</h2>
                        <p className="text-gray-600">
                            If you have questions about these Terms of Service, contact us at:
                        </p>
                        <p className="text-orange-600 font-medium mt-2">contactnivasispace@gmail.com</p>
                    </section>
                </div>
            </main>


        </div>
    );
};

export default TermsOfServicePage;
