// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { remarkCodeHike } = require('@code-hike/mdx');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Syncpack',
  tagline: 'Consistent dependency versions in large JavaScript Monorepos',
  favicon: 'img/favicon.ico',

  url: 'https://jamiemason.github.io',
  baseUrl: '/syncpack',

  organizationName: 'JamieMason', // Usually your GitHub org/user name.
  projectName: 'syncpack', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [
            [
              remarkCodeHike,
              {
                showCopyButton: true,
                theme: 'dracula',
              },
            ],
          ],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: './docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/JamieMason/syncpack/tree/main/site/',
        },
        blog: {
          showReadingTime: false,
          editUrl: 'https://github.com/JamieMason/syncpack/tree/main/site/',
        },
        theme: {
          customCss: [
            require.resolve('@code-hike/mdx/styles.css'),
            require.resolve('./src/css/custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Syncpack',
        logo: {
          alt: 'Syncpack Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Documentation',
            docId: 'guide/getting-started',
            position: 'left',
            type: 'doc',
          },
          {
            label: 'Examples',
            to: 'examples',
            position: 'left',
          },
          {
            value:
              '<a href="https://github.com/JamieMason/syncpack"><svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18"><title>GitHub</title><path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path></svg></a>',
            type: 'html',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Feedback',
            items: [
              {
                label: 'Report a Bug',
                href: 'https://github.com/JamieMason/syncpack/issues/new?template=bug_report.md',
              },
              {
                label: 'Request a Feature',
                href: 'https://github.com/JamieMason/syncpack/issues/new?template=feature_request.md',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/fold_left',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/syncpack',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/JamieMason/syncpack',
              },
              {
                href: 'https://github.com/sponsors/JamieMason',
                label: '❤️ Sponsor',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Jamie Mason.`,
      },
    }),
};

module.exports = config;
