import { AppProps } from 'next/app';
import '../styles/global.scss';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  "client-id": "AVOJVBDe9WtSDCBLkfCOM9b0uFBqqG2IcizY0tNhvgvFQDEPvmkNOLUi9r_6QBuaQfK5qzwBF36Lzhdj",
  currency: "BRL",
  intent: "capture",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp;
