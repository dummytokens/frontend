import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content="Dummy Tokens — EVM compatible dummy ERC20 token" />
      <meta name="description" content="No need to deploy your own token to testnet. With Dummy Tokens you can easily use our ERC20 token in multiple networks, you can also mint to test your balances." />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content="Dummy Tokens — EVM compatible dummy ERC20 token" />
      <meta property="og:description" content="No need to deploy your own token to testnet. With Dummy Tokens you can easily use our ERC20 token in multiple networks, you can also mint to test your balances." />
      <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content="Dummy Tokens — EVM compatible dummy ERC20 token" />
      <meta property="twitter:description" content="No need to deploy your own token to testnet. With Dummy Tokens you can easily use our ERC20 token in multiple networks, you can also mint to test your balances." />
      <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
