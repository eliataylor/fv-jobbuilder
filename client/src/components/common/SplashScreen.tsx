import React from 'react';

interface SplashScreenProps {
    loading?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({loading = undefined}) => {

    return (
        <div>{loading ? 'loading' : 'rendering'}</div>
    );
};

export default SplashScreen;
