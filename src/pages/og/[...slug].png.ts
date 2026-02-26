import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const fontBold = fs.readFileSync(
  path.resolve('src/assets/fonts/JetBrainsMono-Bold.ttf')
);
const fontRegular = fs.readFileSync(
  path.resolve('src/assets/fonts/JetBrainsMono-Regular.ttf')
);

const faviconSvg = fs.readFileSync(
  path.resolve('public/favicon.svg'),
  'utf-8'
);
// Convert the SVG to a base64 data URI for embedding in satori
const faviconBase64 = `data:image/svg+xml;base64,${Buffer.from(faviconSvg).toString('base64')}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, description: post.data.description },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as { title: string; description: string };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '60px',
          fontFamily: 'JetBrains Mono',
        },
        children: [
          // Top section: logo + site name
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'flex-end',
                gap: '16px',
              },
              children: [
                {
                  type: 'img',
                  props: {
                    src: faviconBase64,
                    width: 140,
                    height: 163,
                    style: { objectFit: 'contain' },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '42px',
                      color: '#141414',
                      fontWeight: 700,
                      lineHeight: 1,
                      marginBottom: '10px',
                    },
                    children: 'jerpint',
                  },
                },
              ],
            },
          },
          // Middle section: title + description
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'flex-end',
                paddingBottom: '20px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '80px',
                      height: '4px',
                      backgroundColor: '#141414',
                      borderRadius: '2px',
                      marginBottom: '8px',
                    },
                  },
                },
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 50 ? '36px' : '44px',
                      fontWeight: 700,
                      color: '#141414',
                      lineHeight: 1.2,
                      margin: 0,
                      letterSpacing: '-0.02em',
                    },
                    children: title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#787878',
                      lineHeight: 1.5,
                      margin: 0,
                      marginTop: '4px',
                      fontWeight: 400,
                    },
                    children: description,
                  },
                },
              ],
            },
          },
          // Bottom: subtle URL
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'flex-end',
                borderTop: '1px solid #d0d0d0',
                paddingTop: '20px',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: '16px',
                    color: '#909090',
                    fontWeight: 400,
                  },
                  children: 'jerpint.io',
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          // Use twemoji SVGs for emoji rendering
          const codePoints = [...segment]
            .map((char) => char.codePointAt(0)!.toString(16))
            .join('-');
          const res = await fetch(
            `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`
          );
          if (res.ok) {
            const svg = await res.text();
            return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
          }
        }
        return '';
      },
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
