const getThemeColor = () => {
    const theme = typeof window !== 'undefined' && window.__theme;
    const themeColors = {
        light: '#fff',
        dark: '#212121',
    };

    return themeColors[theme];
};

export default getThemeColor;
