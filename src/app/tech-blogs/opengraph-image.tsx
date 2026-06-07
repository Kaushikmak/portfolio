import { ImageResponse } from 'next/og';

export const alt = 'Tech Blogs | Techbits';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          color: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.055) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          borderTop: '6px solid #000',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ color: '#000', fontSize: 36, fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
              Techbits
            </div>
            <div style={{ width: 6, height: 6, background: '#000', borderRadius: '50%' }} />
            <div style={{ color: 'rgba(0,0,0,0.38)', fontSize: 18, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Technical Blog
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ width: 52, height: 4, background: '#000' }} />
            <h1 style={{ fontSize: 72, fontWeight: 'bold', margin: '0', lineHeight: 1.1, color: '#000', maxWidth: '1000px', fontFamily: 'Georgia, serif', letterSpacing: '-0.015em' }}>
              Tech Blogs | Techbits
            </h1>

            <div style={{ fontSize: 32, color: 'rgba(0,0,0,0.6)', maxWidth: '1000px', lineHeight: 1.4 }}>
              Read the latest technical deep dives, tutorials, and insights on backend architecture, frontend design, and full-stack development.
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Backend', 'Frontend', 'System Design', 'Web3'].map((tag: string, i: number) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: i === 0 ? '#000' : 'transparent',
                    color: i === 0 ? '#fff' : '#000',
                    padding: '8px 20px',
                    fontSize: 20,
                    border: i === 0 ? 'none' : '2px solid #000',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 24, color: 'rgba(0,0,0,0.38)', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              All Publications
            </div>
            <div style={{ display: 'flex', fontFamily: "'Courier New', monospace", fontSize: 20, color: 'rgba(0,0,0,0.28)' }}>
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
