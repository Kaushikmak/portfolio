export default function Skills() {
  return (
    <>
        <div className="section">
            <h2>Education</h2>
            <div className="education-entry">
                <img src="/media/vnit.jpeg" alt="VNIT Nagpur Logo" className="education-logo" />
                <div className="education-details">
                    <strong>Bachelors in Electrical and Electronics Engineering</strong>
                    <p>National Institute of Technology, Nagpur</p>
                </div>
                <div className="education-year-tag">
                    2023 - 2027 (may be 28)
                </div>
            </div>
        </div>

        <div className="section">
            <h2>Skills</h2>
            
            <p className="cp-title">Programming Languages</p>
            <div className="skills-list">
                
                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" className="skill-icon" />
                    <span className="skill-name">C</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">#include</span> <span className="str">&lt;stdio.h&gt;</span>
{`\nint `}<span className="func">main</span>{`() {\n    `}<span className="func">printf</span>{`(`}<span className="str">"Hello World"</span>{`);\n    `}<span className="kwd">return</span> <span className="num">0</span>{`;\n}`}</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="skill-icon" />
                    <span className="skill-name">C++</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">#include</span> <span className="str">&lt;iostream&gt;</span>
{`\nint `}<span className="func">main</span>{`() {\n    `}<span className="kwd">std</span>{`::`}<span className="kwd">cout</span> &lt;&lt; <span className="str">"Hello World"</span>{`;\n    `}<span className="kwd">return</span> <span className="num">0</span>{`;\n}`}</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="skill-icon" />
                    <span className="skill-name">Python</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="func">print</span>(<span className="str">"Hello World"</span>)</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" alt="Go" className="skill-icon" />
                    <span className="skill-name">Golang</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">package</span> main
<span className="kwd">import</span> <span className="str">"fmt"</span>
{`\n`}<span className="kwd">func</span> <span className="func">main</span>{`() {\n    `}<span className="kwd">fmt</span>.<span className="func">Println</span>(<span className="str">"Hello World"</span>){`\n}`}</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart" className="skill-icon" />
                    <span className="skill-name">Dart</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="type">void</span> <span className="func">main</span>{`() {\n  `}<span className="func">print</span>(<span className="str">'Hello World'</span>){`;\n}`}</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="skill-icon" />
                    <span className="skill-name">Java</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">class</span> <span className="type">Main</span> {`{\n    `}<span className="kwd">public</span> <span className="kwd">static</span> <span className="type">void</span> <span className="func">main</span>(<span className="type">String</span>[] args){`{\n        `}<span className="kwd">System</span>.out.<span className="func">println</span>(<span className="str">"Hello World"</span>){`;\n    }\n}`}</code></pre>
                    </div>
                </div>
            </div>

            <p className="cp-title" style={{marginTop: '1.5rem'}}>CS Concepts & Cloud</p>
            <div className="skills-list">

                <div className="skill-card">
                    <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    <span className="skill-name">DSA</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">struct</span> <span className="type">Node</span> {`{\n    `}<span className="type">int</span> data;{`\n    `}<span className="type">Node</span>* next;{`\n};`}</code></pre>
                    </div>
                </div>
                
                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="OS" className="skill-icon" />
                    <span className="skill-name">OS</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="type">pid_t</span> pid = <span className="func">fork</span>();{`\n\n`}<span className="kwd">if</span> (pid == <span className="num">0</span>) {`{\n    `}<span className="cmt">// Child process</span>{`\n    `}<span className="func">execv</span>(<span className="str">"/bin/sh"</span>, args);{`\n}`}</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="skill-icon" />
                    <span className="skill-name">Docker</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">FROM</span> python:3.9
<span className="kwd">WORKDIR</span> /app
<span className="kwd">COPY</span> . .
<span className="kwd">CMD</span> ["python", "app.py"]</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="skill-icon" />
                    <span className="skill-name">AWS</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="cmt"># Launch Instance</span>{`\n`}<span className="func">aws</span> ec2 run-instances \{`\n    --image-id ami-12345678 \\\n    --count 1`}</code></pre>
                    </div>
                </div>

            </div>

            <p className="cp-title" style={{marginTop: '1.5rem'}}>Frameworks</p>
            <div className="skills-list">
                
                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="skill-icon" />
                    <span className="skill-name">Django</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">from</span> django.http <span className="kwd">import</span> HttpResponse{`\n\n`}<span className="kwd">def</span> <span className="func">index</span>(request):{`\n    `}<span className="kwd">return</span> HttpResponse(<span className="str">"Hello World"</span>)</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" className="skill-icon" />
                    <span className="skill-name">Flutter</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">import</span> <span className="str">'package:flutter/material.dart'</span>;{`\n\n`}<span className="type">void</span> <span className="func">main</span>() ={'>'} <span className="func">runApp</span>({`\n  `}<span className="type">Text</span>(<span className="str">'Hello World'</span>){`\n);`}</code></pre>
                    </div>
                </div>

            </div>

            <p className="cp-title" style={{marginTop: '1.5rem'}}>Tools</p>
            <div className="skills-list">
                
                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="skill-icon" />
                    <span className="skill-name">IDE</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="cmt">// Launching...</span>{`\n`}<span className="func">code</span> .</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" className="skill-icon" />
                    <span className="skill-name">Postman</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="kwd">GET</span> <span className="str">/api/v1/users</span>{`\n`}<span className="cmt">Status: 200 OK</span></code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                    <span className="skill-name">cURL</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="func">curl</span> -I <span className="str">https://google.com</span></code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg" alt="Neovim" className="skill-icon" />
                    <span className="skill-name">Neovim</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="cmt">" init.lua</span>{`\n`}<span className="kwd">require</span>(<span className="str">'lazy'</span>).<span className="func">setup</span>({`{}`})</code></pre>
                    </div>
                </div>

                <div className="skill-card">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="skill-icon" />
                    <span className="skill-name">Linux</span>
                    <div className="skill-tooltip">
                        <pre><code><span className="cmt"># Update system</span>{`\n`}<span className="func">sudo</span> apt update</code></pre>
                    </div>
                </div>

            </div>

            <div className="cp-profiles">
                <p className="cp-title">Competitive Programming</p>
                <div className="profile-links">
                    <a href="https://leetcode.com/u/tastytaco/" target="_blank" rel="noopener noreferrer" className="cp-card">
                        <img src="https://cdn.simpleicons.org/leetcode" alt="LeetCode" className="cp-icon" />
                        LeetCode
                        <div className="cp-tooltip">
                            Go to my LeetCode Profile
                            <img src="https://cdn.simpleicons.org/leetcode" alt="" className="cp-tooltip-icon" />
                        </div>
                    </a>

                    <a href="https://codeforces.com/profile/tastytaco" target="_blank" rel="noopener noreferrer" className="cp-card">
                        <img src="https://cdn.simpleicons.org/codeforces" alt="CodeForces" className="cp-icon" />
                        CodeForces
                        <div className="cp-tooltip">
                            Go to my CodeForces Profile
                            <img src="https://cdn.simpleicons.org/codeforces" alt="" className="cp-tooltip-icon" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </>
  );
}
