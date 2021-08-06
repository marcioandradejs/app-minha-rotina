import { AppProps } from 'next/app';
import '../styles/global.scss';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  "client-id": "Ac3zt3-5rH837GBkUhQPxYopnSOfttGYlpq9Ef7I_Khw1FkJw-wcOCOpR2_ikT2K4LdA4v9_z0oRxR3q",
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
