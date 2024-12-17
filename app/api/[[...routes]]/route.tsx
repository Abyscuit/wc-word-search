/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { Roboto } from '../styles/fonts';

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
  const word = inputText ?? '';
  let found = wordList.includes(word);
  return c.res(
    status === 'response' && word !== ''
      ? {
          image: found ? foundWord(word) : '/images/try-again.png',
          intents: [<Button.Reset>Back</Button.Reset>],
        }
      : {
          image: '/images/puzzle-frame.png',
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
