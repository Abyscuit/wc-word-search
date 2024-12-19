/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { Roboto } from '../styles/fonts';
import { container, highlightStyle } from '../styles/styles';

const CAST_API =
  'https://warpcast.com/~/compose?text=Can%20you%20find%20all%205%20words%20in%20the%20@myetherwallet%20word%20search%3F%20%F0%9F%94%8D&embeds[]=';
const FID2USER_API = 'https://client.warpcast.com/v2/user-by-fid?fid=';
let username = '';
let url = '';

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

const backIntent = [<Button.Reset>Back</Button.Reset>];
function foundWord(word: string) {
  let isNew = !foundWords.includes(word);
  if (isNew) foundWords.push(word);

  const numFound = foundWords.length;
  if (numFound === wordList.length)
    return {
      image: '/images/congrats.png',
      intents: [
        <Button.Link href='https://www.mewwallet.com/?referrer=mew-wordsearch'>
          Try MEW
        </Button.Link>,
        <Button value='restart'>Restart</Button>,
        <Button.Link href={url}>Share</Button.Link>,
      ],
    };

  return isNew
    ? { image: '/images/found.png', intents: backIntent }
    : { image: '/images/try-again.png', intents: backIntent };
}

async function getUsername(fid: number | undefined) {
  if (fid === undefined) return '';
  const { result } = await fetch(`${FID2USER_API}${fid}`).then(data =>
    data.json()
  );
  return result.user.username;
}
async function setURL(fid: number | undefined, castHash: string | undefined) {
  // Get Username
  if (username === '') username = await getUsername(fid);

  // Create cast URL
  if (username !== '') {
    const castURL = `https://warpcast.com/${username}/${castHash}`;
    url = `${CAST_API}${castURL}`;
  }
}

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
const wordList = ['ethereum', 'popcorn', 'swap', 'token', 'wallet'];
const foundWords: string[] = [];
app.frame('/', async c => {
  const { inputText, status, frameData, buttonValue } = c;

  //Restart game
  if (status === 'response' && buttonValue === 'restart')
    foundWords.splice(0, foundWords.length);

  if (url === '') setURL(frameData?.fid, frameData?.castId.hash.slice(0, 10));

  // Check word
  const word = (inputText ?? '').toLowerCase();
  let found = wordList.includes(word);

  // Generate frame
  const { image, intents } = found
    ? foundWord(word)
    : {
        image: '/images/try-again.png',
        intents: backIntent,
      };
  return c.res(
    status === 'response' && word !== '' && buttonValue !== 'restart'
      ? {
          image: image,
          intents: intents,
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
              {foundWords.map(value => (
                // @ts-expect-error
                <div style={highlightStyle[value]}></div>
              ))}
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
