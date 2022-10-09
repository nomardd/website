import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='relative h-screen h-screen bg-[#2C54B1]'>
        <h1
          className='absolute block flex max-w-[50%] pt-4 pl-4 text-white md:pt-24 md:pl-24'
          style={{ fontSize: '4em', lineHeight: 1, zIndex: 5 }}
        >
          Nomard is a decentralized platform that will help you to splitting
          expenses
        </h1>
        <img
          src='/landing.gif'
          className='absolute'
          style={{ bottom: 0, right: 0, zIndex: 2 }}
        />
      </main>
    </Layout>
  );
}
