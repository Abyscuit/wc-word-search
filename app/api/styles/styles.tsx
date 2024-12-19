const enkryptBgColor =
  'linear-gradient(180deg, rgba(62,28,203,1) 0%, rgba(111,76,254,1) 53%, rgba(194,180,255,1) 130%)';

export const fontStyle = {
  color: 'white',
  fontSize: 50,
  fontStyle: 'normal',
  fontFamily: 'Roboto',
  fontWeight: 700,
  letterSpacing: '-0.025em',
  lineHeight: 1.4,
  marginTop: 30,
  padding: '0 120px',
  whiteSpace: 'pre-wrap',
};

export const container = {
  alignItems: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
};

const highlight = {
  display: 'flex',
  position: 'absolute',
  zIndex: 1000,
  top: 379, // ~83px
  left: 523, // ~300px - 800px
  width: 36,
  height: 148,
  background: 'rgba(250,0,0,0.4)',
  // transform: 'rotate(44deg)',
  borderRadius: 25,
};

export const highlightStyle = {
  ethereum: {
    ...highlight,
    top: 306,
    left: 443,
    width: 310,
    height: 34,
    background: 'rgba(0,200,0,0.4)',
  },
  popcorn: {
    ...highlight,
    top: 234,
    left: 360,
    width: 359,
    height: 34,
    background: 'rgba(0,120,250,0.4)',
    transform: 'rotate(44deg)',
  },
  token: {
    ...highlight,
    top: 230,
    left: 406,
    width: 36,
    height: 185,
    background: 'rgba(96, 0, 250, 0.4)',
  },
  wallet: {
    ...highlight,
    top: 156,
    left: 795,
    width: 35,
    height: 222,
    background: 'rgba(250,0,0,0.4)',
  },
  swap: {
    ...highlight,
    top: 379,
    left: 523,
    width: 36,
    height: 148,
    background: 'rgba(255, 238, 0, 0.4)',
  },
};
