const DotsOverlay = ({ className = "", dotSize = 1, spacing = 40, opacity = 0.4 }) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, ${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
                backgroundSize: `${spacing}px ${spacing}px`,
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)'
            }}
        />
    );
};

// Advanced DotsOverlay with multiple dot sizes for depth
const DotsOverlayAdvanced = ({ className = "" }) => {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            {/* Large dots - more sparse */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 1.5px, transparent 1.5px)`,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                }}
            />

            {/* Medium dots */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '20px 20px',
                    maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 75%)'
                }}
            />

            {/* Small dots - most dense */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '10px 10px',
                    maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 80%)'
                }}
            />
        </div>
    );
};

export { DotsOverlay, DotsOverlayAdvanced };