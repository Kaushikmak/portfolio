import { ImageResponse } from 'next/og';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

export const alt = 'Techbyts Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const blog = await convex.query(api.queries.getTechBlogBySlug, { slug });

  const title = blog?.title ?? "Techbyts Blog";

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0d1117, #161b22)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            width: '100%',
            height: '100%',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', color: '#58a6ff', fontSize: 36, fontWeight: 'bold', letterSpacing: '0.05em' }}>
            TECHBYTS
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h1 style={{ fontSize: 72, fontWeight: 'bold', margin: '0', lineHeight: 1.1, color: '#c9d1d9', maxWidth: '1000px' }}>
              {title}
            </h1>
            
            {blog?.tags && blog.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                {blog.tags.map((tag: string) => (
                  <div key={tag} style={{ background: '#1f2428', color: '#8b949e', padding: '10px 20px', borderRadius: 20, fontSize: 24, border: '1px solid #30363d' }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', fontSize: 28, color: '#8b949e', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {blog?.date ?? 'Read the latest at Techbyts'}
            </div>
            <div style={{ display: 'flex' }}>
              kaushikmak.com/tech-blogs
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
