import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Users, CreditCard, Clock, XCircle, Scale } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const TermsConditionsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Terms & Conditions"
                subtitle="Last updated: January 2026"
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Introduction */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to Nivasi Space. These Terms and Conditions govern your use of our website and
                            mobile application. By accessing or using our Platform, you agree to be bound by these
                            terms. Please read them carefully before using our services.
                        </p>
                    </section>

                    {/* Definitions */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Scale className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Definitions</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong>"Platform"</strong> refers to the Nivasi Space website and mobile application.</li>
                            <li><strong>"User"</strong> refers to any person who accesses or uses the Platform.</li>
                            <li><strong>"Room Owner"</strong> refers to property owners who list rooms on our Platform.</li>
                            <li><strong>"Student"</strong> refers to users seeking accommodation through our Platform.</li>
                            <li><strong>"Listing"</strong> refers to room advertisements posted on the Platform.</li>
                        </ul>
                    </section>

                    {/* Account Registration */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Account Registration</h2>
                        </div>
                        <div className="space-y-3 text-gray-600">
                            <p>To use certain features of our Platform, you must:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Create an account using Google Sign-In</li>
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Be at least 18 years old or have parental consent</li>
                            </ul>
                        </div>
                    </section>

                    {/* User Conduct */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">User Conduct</h2>
                        </div>
                        <p className="text-gray-600 mb-4">Users agree to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Use the Platform only for lawful purposes</li>
                            <li>Provide truthful information in all communications</li>
                            <li>Respect other users and room owners</li>
                            <li>Not engage in fraudulent or deceptive practices</li>
                            <li>Not use the Platform to send spam or unsolicited messages</li>
                            <li>Comply with all applicable local, state, and national laws</li>
                        </ul>
                    </section>

                    {/* Booking and Payments */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Bookings and Payments</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Nivasi Space facilitates connections between students and room owners.
                                All rental agreements and payments are made directly between these parties.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-blue-800">
                                    <strong>Note:</strong> We do not process payments or hold deposits. All financial
                                    transactions occur directly between users and room owners. We recommend getting
                                    proper receipts for all payments.
                                </p>
                            </div>
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
                        <p className="text-gray-600 mb-4">The following activities are strictly prohibited:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Posting false, misleading, or fraudulent listings</li>
                            <li>Impersonating another person or entity</li>
                            <li>Collecting personal information of other users without consent</li>
                            <li>Using the Platform for commercial purposes without authorization</li>
                            <li>Attempting to circumvent platform security measures</li>
                            <li>Harassment, discrimination, or threatening behavior</li>
                            <li>Posting content that violates intellectual property rights</li>
                        </ul>
                    </section>

                    {/* Termination */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to terminate or suspend your account at any time, without prior
                            notice, for conduct that we believe violates these Terms or is harmful to other users,
                            us, or third parties, or for any other reason at our sole discretion. Upon termination,
                            your right to use the Platform will immediately cease.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-gray-700">
                                THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. NIVASI SPACE
                                DOES NOT GUARANTEE THE ACCURACY OF LISTINGS, THE AVAILABILITY OF ROOMS, OR THE
                                CONDUCT OF USERS. USERS INTERACT WITH ROOM OWNERS AT THEIR OWN RISK. WE STRONGLY
                                RECOMMEND VISITING PROPERTIES IN PERSON BEFORE ENTERING INTO ANY AGREEMENTS.
                            </p>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India.
                            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction
                            of the courts in Kolhapur, Maharashtra.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-orange-50 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Questions?</h2>
                        <p className="text-gray-600">
                            If you have questions about these Terms & Conditions, contact us at:
                        </p>
                        <p className="text-orange-600 font-medium mt-2">contactnivasispace@gmail.com</p>
                        <p className="text-gray-600 mt-1">Phone: +91 7385553529</p>
                    </section>
                </div>
            </main>


        </div>
    );
};

export default TermsConditionsPage;
