import React, { useEffect } from 'react'
import { type NextComponentType, type NextPageContext } from 'next'
import { type AppProps } from 'next/app'
import Head from 'next/head'

import '@aws-amplify/ui-react/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../styles/style.scss'
import '../styles/menu.scss'

import setting from '../setting'
import Layout from '../components/Layout'

import { Amplify } from 'aws-amplify'
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { withAuthenticator } from '@aws-amplify/ui-react'

import awsconfig from '../src/aws-exports'
import { Alert } from 'react-bootstrap'

Amplify.configure(awsconfig)

export function App ({ user, signOut, Component }: WithAuthenticatorProps & { pageProps: any, Component: NextComponentType<NextPageContext, any, any> }): React.JSX.Element {
  if (user == null) {
    return (
      <Alert variant='danger'>
        You are not signed in.
      </Alert>
    )
  }

  return (
    <>
      <Component user={user} signOut={signOut} />
    </>
  )
}

export default function MyApp ({ Component, pageProps, router }: AppProps): React.JSX.Element {
  useEffect(() => {
  }, [router.pathname])

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{setting.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='icon'
          type='image/png'
          href={`${setting.basePath}/favicon.ico`}
        />
      </Head>
      <Layout>
        {withAuthenticator(App)({ Component, pageProps })}
      </Layout>
    </>
  )
}
