import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const PageHeader = ({ title, subtitle, showBackButton = true }) => {
    return (
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {showBackButton && (
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                )}
                <div className={`${showBackButton ? 'mt-6' : ''} text-center`}>
                    <h1 className="text-4xl font-bold mb-2">{title}</h1>
                    {subtitle && <p className="text-orange-100 text-lg">{subtitle}</p>}
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
