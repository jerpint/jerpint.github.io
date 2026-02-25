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
                alignItems: 'center',
                gap: '16px',
              },
              children: [
                {
                  type: 'img',
                  props: {
                    src: faviconBase64,
                    width: 48,
                    height: 56,
                    style: { objectFit: 'contain' },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#3c3c3c',
                      fontWeight: 400,
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
                gap: '20px',
                flex: '1',
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '60px',
                      height: '4px',
                      backgroundColor: '#0066cc',
                      borderRadius: '2px',
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
                      fontSize: '20px',
                      color: '#787878',
                      lineHeight: 1.5,
                      margin: 0,
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
                borderTop: '1px solid #e5e5e5',
                paddingTop: '20px',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: '16px',
                    color: '#a0a0a0',
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
