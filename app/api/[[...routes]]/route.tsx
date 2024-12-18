/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { Roboto } from '../styles/fonts';
import { container, highlight } from '../styles/styles';

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // browserLocation: '/:path',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'MEW Universe Word Search',
  imageAspectRatio: '1:1',
  imageOptions: {
    //@ts-ignore
    fonts: [...Roboto],
  },
});

const highlightStyle = {
  ethereum: {
    top: 306,
    left: 443,
    width: 310,
    height: 34,
    background: 'rgba(0,200,0,0.4)',
  },
  popcorn: {
    top: 234,
    left: 360,
    width: 359,
    height: 34,
    background: 'rgba(0,120,250,0.4)',
    transform: 'rotate(44deg)',
  },
  token: {
    top: 230,
    left: 406,
    width: 36,
    height: 185,
    background: 'rgba(96, 0, 250, 0.4)',
  },
  wallet: {
    top: 156,
    left: 795,
    width: 35,
    height: 222,
    background: 'rgba(250,0,0,0.4)',
  },
  swap: {
    top: 379,
    left: 523,
    width: 36,
    height: 148,
    background: 'rgba(255, 238, 0, 0.4)',
  },
};

function foundWord(word: string) {
  let isNew = !foundWords.includes(word);
  if (isNew) foundWords.push(word);
  const numFound = foundWords.length;
  if (numFound === wordList.length) {
    return '/images/congrats.png';
  }
  return isNew ? '/images/found.png' : '/images/try-again.png';
}

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
const wordList = ['ethereum', 'popcorn', 'swap', 'token', 'wallet'];
const foundWords: string[] = [];
app.frame('/', c => {
  const { inputText, status } = c;
  const word = (inputText ?? '').toLowerCase();
  let found = wordList.includes(word);
  return c.res(
    status === 'response' && word !== ''
      ? {
          image: found ? foundWord(word) : '/images/try-again.png',
          intents: [<Button.Reset>Back</Button.Reset>],
        }
      : {
          image: (
            <div style={container}>
              <img
                alt='puzzle'
                src='/images/puzzle-frame.png'
                width={'55%'}
                height={'100%'}
              />
              {foundWords.includes('ethereum') ? (
                <div style={{ ...highlight, ...highlightStyle.ethereum }}></div>
              ) : (
                ''
              )}
              {foundWords.includes('popcorn') ? (
                <div style={{ ...highlight, ...highlightStyle.popcorn }}></div>
              ) : (
                ''
              )}
              {foundWords.includes('swap') ? (
                <div style={{ ...highlight, ...highlightStyle.swap }}></div>
              ) : (
                ''
              )}
              {foundWords.includes('token') ? (
                <div style={{ ...highlight, ...highlightStyle.token }}></div>
              ) : (
                ''
              )}
              {foundWords.includes('wallet') ? (
                <div style={{ ...highlight, ...highlightStyle.wallet }}></div>
              ) : (
                ''
              )}
            </div>
          ),
          intents: [
            <TextInput placeholder='Enter word...' />,
            <Button value='check'>Check word 🔎</Button>,
          ],
        }
  );
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
