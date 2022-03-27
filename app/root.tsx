import type { MetaFunction } from 'remix';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import styles from './styles/app.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicons/site.webmanifest' },
    { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#000000' },
    { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
  ];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Wordle Calculator',
  description: "Type in characters you know and select at which places they can't be.",
  viewport: 'width=device-width,initial-scale=1',
  'apple-mobile-web-app-capable': 'Wordle Calc',
  'apple-mobile-web-app-title': 'Wordle Calc',
  'application-name': 'Wordle Calc',
  'msapplication-TileColor': '#000000',
  'msapplication-config': '/favicons/browserconfig.xml',
  'theme-color': '#ffffff',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
