import React from 'react';
import { RefreshCcw, XCircle, CheckCircle, Clock, AlertTriangle, Mail, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader.jsx';


const RefundPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Refund Policy"
                subtitle="Last updated: January 2026"
            />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Important Notice */}
                    <section className="mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-blue-900">Important Notice</h2>
                            </div>
                            <p className="text-blue-800">
                                Nivasi Space is a free platform that connects students with room owners. We do not
                                process payments, collect deposits, or handle any financial transactions. All payments
                                are made directly between students and room owners.
                            </p>
                        </div>
                    </section>

                    {/* Nivasi Space Services */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Nivasi Space Services</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our platform is completely free for students. We provide:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Free access to browse room listings</li>
                            <li>Free room search based on preferences</li>
                            <li>Free contact with room owners</li>
                            <li>No brokerage or service charges</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            Since we do not charge any fees, there is no refund applicable for our services.
                        </p>
                    </section>

                    {/* Room Rental Payments */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <RefreshCcw className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Room Rental Payments</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            All payments related to room rentals, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Security deposits</li>
                            <li>Monthly rent</li>
                            <li>Advance payments</li>
                            <li>Maintenance charges</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            are made directly between you and the room owner. Refund policies for these payments
                            are determined by individual room owners and should be discussed and agreed upon
                            before making any payment.
                        </p>
                    </section>

                    {/* Recommendations */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Recommendations</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            To protect yourself when dealing with room rentals, we recommend:
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Get Everything in Writing</h3>
                                    <p className="text-gray-600 text-sm">
                                        Always get a written agreement specifying deposit amount, refund conditions,
                                        and notice period before making any payment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Ask for Receipts</h3>
                                    <p className="text-gray-600 text-sm">
                                        Always obtain receipts for every payment made, including deposits and rent.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Verify Owner Identity</h3>
                                    <p className="text-gray-600 text-sm">
                                        Verify the room owner's identity and ownership documents before making payments.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Visit Before Paying</h3>
                                    <p className="text-gray-600 text-sm">
                                        Always visit the property in person before making any advance payments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Dispute Resolution */}
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Dispute Resolution</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            While Nivasi Space is not a party to any rental agreement between students and room
                            owners, we encourage both parties to resolve disputes amicably. If you encounter issues:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>First, try to resolve the matter directly with the room owner</li>
                            <li>Document all communications and payments</li>
                            <li>If needed, seek mediation through local authorities</li>
                            <li>Report fraudulent listings to us so we can remove them</li>
                        </ul>
                    </section>

                    {/* Contact */}
                    <section className="bg-orange-50 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Report an Issue</h2>
                        <p className="text-gray-600 mb-4">
                            If you encounter fraudulent activity or have concerns about a listing, please contact us:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-orange-600" />
                                <span className="text-orange-600 font-medium">contactnivasispace@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-orange-600" />
                                <span className="text-orange-600 font-medium">+91 7385553529</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>


        </div>
    );
};

export default RefundPolicyPage;
