module.exports = (isProd) => ({
    prefix: '',
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true
    },
    purge: {
      enabled: isProd,
      content: ['**/*.html', '**/*.ts']
    },
    variants: {
        borderWidth: ['responsive', 'hover', 'focus', 'active']
    },
    theme: {}
});
