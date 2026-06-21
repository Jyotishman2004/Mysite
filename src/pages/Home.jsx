import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeJSCanvas from '../components/ThreeJSCanvas';
import PageTransition from '../components/PageTransition';

const Home = () => {
    useEffect(() => {
        const canvas = document.getElementById('shader-canvas-ANIMATION_3');
        if (!canvas) return;

        function syncSize() {
            const w = canvas.clientWidth || 1280;
            const h = canvas.clientHeight || 720;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        }
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(syncSize).observe(canvas);
        }
        syncSize();

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return;
        const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
        const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 p = -1.0 + 2.0 * uv;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.5;
    
    // Bauhaus colors derived from DS1
    vec3 red = vec3(0.85, 0.1, 0.1);
    vec3 black = vec3(0.05, 0.05, 0.05);
    vec3 white = vec3(0.95, 0.95, 0.95);

    // Fluid motion logic
    for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.3 / i * sin(i * 3.0 * p.y + t + u_mouse.x / u_resolution.x);
        p.y += 0.3 / i * cos(i * 3.0 * p.x + t + u_mouse.y / u_resolution.y);
    }

    float mask = smoothstep(0.1, 0.11, sin(p.x + p.y));
    vec3 col = mix(black, red, mask);
    col = mix(col, white, 0.05 * sin(t + p.x * 2.0));

    gl_FragColor = vec4(col, 1.0);
}`;
        function cs(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        }
        const prog = gl.createProgram();
        gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
        gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(prog);
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const pos = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uRes = gl.getUniformLocation(prog, 'u_resolution');
        const uMouse = gl.getUniformLocation(prog, 'u_mouse');

        let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width && rect.height) {
                const nx = (event.clientX - rect.left) / rect.width;
                const ny = 1.0 - (event.clientY - rect.top) / rect.height;
                mouse.x = nx * canvas.width;
                mouse.y = ny * canvas.height;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationId;
        function render(t) {
            if (typeof ResizeObserver === 'undefined') syncSize();
            gl.viewport(0, 0, canvas.width, canvas.height);
            if (uTime) gl.uniform1f(uTime, t * 0.001);
            if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
            if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationId = requestAnimationFrame(render);
        }
        render(0);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <PageTransition className="flex flex-col">
            {/* Hero Section */}
            <section className="relative w-full h-[819px] min-h-[600px] border-b-4 border-primary overflow-hidden flex items-center justify-center p-6 md:p-12 lg:p-24">
                <div className="absolute inset-0 z-0 bg-primary">
                    <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen" style={{ display: 'block' }}>
                        <canvas id="shader-canvas-ANIMATION_3" style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
                    </div>
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                </div>
                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start">
                    <div className="bg-primary p-6 md:p-10 border-4 border-primary neo-shadow inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-4xl text-center md:text-left">
                        <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl text-background leading-none tracking-tighter uppercase break-words">
                            JYOTISHMAN <br />
                            <span className="text-secondary">SAIKIA</span> <br />
                        </h1>
                    </div>
                    <div className="mt-12 md:mt-24 bg-background p-6 border-4 border-primary neo-shadow inline-block max-w-xl self-center md:self-end transform translate-y-8 translate-x-0 md:-translate-x-12 text-center md:text-left">
                        <p className="font-body text-lg md:text-xl font-bold text-primary">
                            B.TECH IT STUDENT &amp; FREELANCE WEB DESIGNER. BUILDING BOLD, UNAPOLOGETIC DIGITAL EXPERIENCES.
                        </p>
                        <Link to="/projects">
                            <button className="mt-6 w-full bg-secondary text-primary border-2 border-primary font-headline font-black text-xl py-4 uppercase flex items-center justify-between px-6 group neo-shadow neo-shadow-hover">
                                <span>EXPLORE WORK</span>
                                <span className="material-symbols-outlined font-bold text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-primary-container border-t-4 border-primary overflow-hidden py-3 z-10 flex">
                    <div className="whitespace-nowrap flex animate-[scroll_20s_linear_infinite]">
                        <span className="font-headline font-black text-xl uppercase tracking-widest text-primary mx-8">JYOTISHMAN SAIKIA // WEB DESIGNER // IT STUDENT // </span>
                        <span className="font-headline font-black text-xl uppercase tracking-widest text-primary mx-8">JYOTISHMAN SAIKIA // WEB DESIGNER // IT STUDENT // </span>
                        <span className="font-headline font-black text-xl uppercase tracking-widest text-primary mx-8">JYOTISHMAN SAIKIA // WEB DESIGNER // IT STUDENT // </span>
                    </div>
                </div>
            </section>



            <section className="border-y-4 border-primary bg-primary text-background py-24 px-6 md:px-12 w-full relative overflow-hidden">
                <div className="absolute -right-20 -top-20 text-[30rem] font-headline font-black text-surface-tint opacity-20 leading-none pointer-events-none select-none">
                    *
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <span className="material-symbols-outlined text-6xl text-secondary mb-8 block" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    <h2 className="font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter mb-8 leading-tight">
                        FORM FOLLOWS <span className="bg-secondary text-primary px-4 py-1 inline-block transform rotate-2">FUNCTION</span>.
                    </h2>
                    <p className="font-body text-lg md:text-xl font-bold max-w-2xl mx-auto mb-12 text-surface-container">
                        Aesthetics are secondary. I build digital systems optimized for performance, utility, and raw speed. Everything else is just noise.
                    </p>
                    <Link to="/about">
                        <button className="bg-background text-primary border-2 border-background font-headline font-black text-xl py-4 px-12 uppercase hover:bg-secondary hover:text-primary hover:border-secondary neo-shadow-light neo-shadow-light-hover">
                            KNOW ME
                        </button>
                    </Link>
                </div>
            </section>
        </PageTransition>
    );
};

export default Home;
