module.exports = {
  ci: {
    collect: {
      staticDistDir: "./_site",
      numberOfRuns: 2,
      url: [
        "http://localhost/",
        "http://localhost/en/",
        "http://localhost/proof/testing-and-standards/",
        "http://localhost/en/proof/testing-and-standards/",
        "http://localhost/contact/",
        "http://localhost/en/contact/"
      ],
      settings: {
        chromeFlags: "--headless=new --no-sandbox"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.90 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.15 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci/reports"
    }
  }
};
