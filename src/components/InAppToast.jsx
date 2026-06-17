import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, AlertTriangle, Info } from 'lucide-react';

/**
 * InAppToast - A prominent in-app toast notification for admin actions
 * Optimized for mobile view with better touch targets and sizing
 */
const InAppToast = ({
    message,
    type = 'success',
    isVisible,
    onClose,
    duration = 4000,
    title = null,
    showIcon = true
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => onClose(), 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!isVisible && !isAnimating) return null;

    // Theme configurations based on type
    const themes = {
        success: {
            bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
            border: 'border-green-400',
            icon: CheckCircle,
            iconBg: 'bg-green-400/20',
            shadow: 'shadow-green-500/25'
        },
        error: {
            bg: 'bg-gradient-to-r from-red-500 to-rose-500',
            border: 'border-red-400',
            icon: AlertCircle,
            iconBg: 'bg-red-400/20',
            shadow: 'shadow-red-500/25'
        },
        warning: {
            bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
            border: 'border-amber-400',
            icon: AlertTriangle,
            iconBg: 'bg-amber-400/20',
            shadow: 'shadow-amber-500/25'
        },
        info: {
            bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
            border: 'border-blue-400',
            icon: Info,
            iconBg: 'bg-blue-400/20',
            shadow: 'shadow-blue-500/25'
        }
    };

    const theme = themes[type] || themes.success;
    const Icon = theme.icon;

    // Auto-generated titles based on type
    const defaultTitles = {
        success: 'Success!',
        error: 'Error!',
        warning: 'Warning',
        info: 'Info'
    };

    const displayTitle = title || defaultTitles[type];

    return (
        <div
            className="fixed inset-0 flex items-start justify-center z-[100] pointer-events-none pt-2 sm:pt-4 px-2 sm:px-4"
            role="alert"
            aria-live="polite"
        >
            <div
                className={`
                    ${theme.bg} ${theme.shadow}
                    pointer-events-auto
                    w-full max-w-[calc(100vw-1rem)] sm:max-w-sm
                    rounded-xl sm:rounded-2xl
                    shadow-2xl
                    overflow-hidden
                    transform transition-all duration-300 ease-out
                    ${isAnimating && isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}
                `}
            >
                {/* Main Content */}
                <div className="p-3 sm:p-4">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                        {/* Icon */}
                        {showIcon && (
                            <div className={`${theme.iconBg} rounded-full p-1.5 sm:p-2 flex-shrink-0`}>
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm sm:text-base leading-tight">
                                {displayTitle}
                            </h4>
                            <p className="text-white/90 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-snug line-clamp-2">
                                {message}
                            </p>
                        </div>

                        {/* Close Button - Larger touch target on mobile */}
                        <button
                            onClick={() => {
                                setIsAnimating(false);
                                setTimeout(() => onClose(), 300);
                            }}
                            className="flex-shrink-0 p-1.5 sm:p-1 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4 sm:w-4 sm:h-4 text-white/80" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-0.5 sm:h-1 bg-white/20">
                    <div
                        className="h-full bg-white/50 origin-left"
                        style={{
                            animation: isVisible ? `shrink ${duration}ms linear forwards` : 'none'
                        }}
                    />
                </div>
            </div>

            {/* Animation keyframes */}
            <style>{`
                @keyframes shrink {
                    from { transform: scaleX(1); }
                    to { transform: scaleX(0); }
                }
            `}</style>
        </div>
    );
};

export default InAppToast;
