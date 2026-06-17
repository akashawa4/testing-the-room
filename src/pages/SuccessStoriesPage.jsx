import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, GraduationCap, Heart, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import PageHeader from '@/components/PageHeader.jsx';


const SuccessStoriesPage = () => {
    const stories = [
        {
            name: "Priya Sharma",
            college: "D.Y. Patil College of Engineering",
            year: "3rd Year B.Tech",
            story: "Finding a room near college was my biggest worry when I moved to Kolhapur. Nivasi Space made it so easy! I found a safe, affordable room within a day. The verification process gave my parents peace of mind too.",
            rating: 5,
            image: "👩‍🎓"
        },
        {
            name: "Rahul Patil",
            college: "Shivaji University",
            year: "2nd Year M.Sc",
            story: "As a boy from a small village, I was nervous about finding accommodation in the city. Nivasi Space connected me with a great hostel near my college. The room owner treats us like family!",
            rating: 5,
            image: "👨‍🎓"
        },
        {
            name: "Sneha Desai",
            college: "KIT's College of Engineering",
            year: "Final Year B.E",
            story: "I've been using Nivasi Space since my first year. Changed rooms twice, and both times the platform helped me find exactly what I was looking for. Highly recommend to all students!",
            rating: 5,
            image: "👩‍💻"
        },
        {
            name: "Amit Jadhav",
            college: "D.Y. Patil Medical College",
            year: "MBBS Student",
            story: "Medical college schedules are demanding, and I needed a quiet place close to the hospital. Found the perfect room through Nivasi Space. The whole process was smooth and transparent.",
            rating: 5,
            image: "👨‍⚕️"
        },
        {
            name: "Kavita Mohite",
            college: "Shivaji University",
            year: "Ph.D Scholar",
            story: "As a research scholar, I needed a peaceful environment for my studies. Nivasi Space helped me find a 1BHK apartment perfect for my needs. The detailed listings with photos were very helpful.",
            rating: 5,
            image: "👩‍🔬"
        },
        {
            name: "Rohan Kulkarni",
            college: "KIT's College of Engineering",
            year: "1st Year B.Tech",
            story: "Being new to the city, I was worried about finding safe accommodation. My parents were relieved when we found a verified room through Nivasi Space. The owner is really helpful!",
            rating: 5,
            image: "👨‍🎓"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            <PageHeader
                title="Success Stories"
                subtitle="Real experiences from Nivasi Space users"
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Banner */}
                <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Students Across Maharashtra</h2>
                        <p className="text-gray-600">Join the community of happy students who found their perfect room</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">500+</div>
                            <div className="text-gray-600 text-sm">Happy Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">4.8</div>
                            <div className="text-gray-600 text-sm">Average Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">95%</div>
                            <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">3</div>
                            <div className="text-gray-600 text-sm">Cities Covered</div>
                        </div>
                    </div>
                </section>

                {/* Success Stories Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stories.map((story, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-3xl">
                                    {story.image}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                                    <p className="text-gray-600 text-sm">{story.year}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-gray-600">{story.college}</span>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(story.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <div className="relative">
                                <Quote className="w-8 h-8 text-orange-200 absolute -left-2 -top-2" />
                                <p className="text-gray-600 text-sm leading-relaxed pl-4">
                                    "{story.story}"
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Testimonial Call to Action */}
                <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 text-white text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-orange-200" />
                    <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
                    <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                        Found your perfect room through Nivasi Space? We'd love to hear about your experience!
                        Share your story and help other students find their home away from home.
                    </p>
                    <a href="mailto:contactnivasispace@gmail.com?subject=My Nivasi Space Success Story">
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3">
                            Share Your Story
                        </Button>
                    </a>
                </section>

                {/* Why Choose Us */}
                <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Students Love Nivasi Space</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Near Campus</h3>
                            <p className="text-gray-600 text-sm">All our listings are conveniently located near major colleges</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Verified Owners</h3>
                            <p className="text-gray-600 text-sm">We verify all room owners for your safety and peace of mind</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Student Friendly</h3>
                            <p className="text-gray-600 text-sm">Features designed specifically for student accommodation needs</p>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    );
};

export default SuccessStoriesPage;
