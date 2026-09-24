module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        'http://localhost/',
        'http://localhost/en/',
        'http://localhost/contact/',
        'http://localhost/proof/testing-and-standards/',
        'http://localhost/technical-evaluation/'
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless=new'
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:seo': ['error', { minScore: 0.95, aggregationMethod: 'median' }],
        'categories:best-practices': ['error', { minScore: 0.90, aggregationMethod: 'median' }],
        'categories:performance': ['warn', { minScore: 0.80, aggregationMethod: 'median' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.10, aggregationMethod: 'median' }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3500, aggregationMethod: 'median' }],
        'total-blocking-time': ['warn', { maxNumericValue: 300, aggregationMethod: 'median' }],
        'interactive': ['warn', { maxNumericValue: 5000, aggregationMethod: 'median' }],
        'total-byte-weight': ['warn', { maxNumericValue: 2500000, aggregationMethod: 'median' }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-reports'
    }
  }
};
