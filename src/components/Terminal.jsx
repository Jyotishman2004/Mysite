import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const THEMES = {
    default: {
        bg: 'bg-black',
        text: 'text-white',
        shadow: 'neo-shadow-red neo-shadow-red-hover',
        glow: '',
        headerBg: 'bg-primary',
        headerText: 'text-on-primary',
        prompt: 'text-primary'
    },
    matrix: {
        bg: 'bg-[#051105]',
        text: 'text-[#00ff00]',
        shadow: 'shadow-[6px_6px_0px_0px_#00ff00] md:shadow-[8px_8px_0px_0px_#00ff00] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#00ff00]',
        glow: '[text-shadow:0_0_5px_#00ff00]',
        headerBg: 'bg-[#00ff00]',
        headerText: 'text-black',
        prompt: 'text-[#00ff00]'
    },
    blood: {
        bg: 'bg-[#1a0505]',
        text: 'text-[#ff4d4d]',
        shadow: 'shadow-[6px_6px_0px_0px_#c62828] md:shadow-[8px_8px_0px_0px_#c62828] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#c62828]',
        glow: '[text-shadow:0_0_6px_#ff0000]',
        headerBg: 'bg-primary',
        headerText: 'text-white',
        prompt: 'text-[#ff4d4d]'
    },
    amber: {
        bg: 'bg-[#1f1300]',
        text: 'text-[#ffb000]',
        shadow: 'shadow-[6px_6px_0px_0px_#ffb000] md:shadow-[8px_8px_0px_0px_#ffb000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ffb000]',
        glow: '[text-shadow:0_0_5px_#ffb000]',
        headerBg: 'bg-[#ffb000]',
        headerText: 'text-black',
        prompt: 'text-[#ffb000]'
    }
};

const Terminal = () => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [isBooting, setIsBooting] = useState(true);
    const [theme, setTheme] = useState(THEMES.default);

    // Command History & Autocomplete
    const [inputHistory, setInputHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Interactive State Machine for Contact Protocol
    const [interactiveMode, setInteractiveMode] = useState(null);
    const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

    // Multi-Game State
    const [activeGame, setActiveGame] = useState(null); // 'selector', 'number_hacker', 'word_decrypter', 'math_bypass'
    const [gameState, setGameState] = useState({});

    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const historyContainerRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const hasBooted = useRef(false);
    const lastApiCall = useRef(0);

    const commands = {
        skills: 'Frontend: React, HTML, CSS, Tailwind\nBackend: Node.js, Express\nDesign: Figma, UI/UX\nOther: Git',
        about: 'Jyotishman Saikia - IT Student & Freelance Web Designer\n\nCurrently pursuing B.Tech in Information Technology at NEHU(Shillong).\nDeep passion for creating things that live on the internet.\n\nAs a freelance web designer and developer, my goal is to\nbuild digital experiences that are not only highly functional\nbut also visually striking. I embrace raw aesthetics and\nfunctionalist design principles to create bold web applications.',
        clear: 'clear'
    };

    // Fake Boot Sequence
    useEffect(() => {
        if (hasBooted.current) return;
        hasBooted.current = true;

        const bootSequence = [
            "INITIALIZING BIOS...",
            "CHECKING MEMORY... 640K OK",
            "LOADING CYBERNETIC ENGINES... DONE",
            "MOUNTING VIRTUAL FILESYSTEM... OK",
            "STARTING JYOTISHMAN OS v1.0.0...",
            "Type 'help' to see available commands."
        ];

        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += 80 + Math.random() * 120;
            setTimeout(() => {
                setHistory(prev => [...prev, { type: 'system', text: line }]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setIsBooting(false), 200);
                }
            }, delay);
        });
    }, []);

    useEffect(() => {
        if (historyContainerRef.current) {
            historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
        }
    }, [history]);

    const getPromptIndicator = () => {
        if (interactiveMode === 'contact_name') return 'Name:';
        if (interactiveMode === 'contact_email') return 'Email:';
        if (interactiveMode === 'contact_message') return 'Message:';
        if (activeGame === 'selector') return 'Selection:';
        if (activeGame === 'number_hacker') return 'Guess (1-100):';
        if (activeGame === 'word_decrypter') return 'Decrypt:';
        if (activeGame === 'math_bypass') return 'Answer:';
        return 'guest@portfolio:~$';
    };

    const handleKeyDown = (e) => {
        if (interactiveMode || activeGame) return; // Disable history/autocomplete in interactive modes

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < inputHistory.length - 1) {
                const nextIndex = historyIndex + 1;
                setHistoryIndex(nextIndex);
                setInput(inputHistory[inputHistory.length - 1 - nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(inputHistory[inputHistory.length - 1 - nextIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const availableCommands = ['help', 'skills', 'about', 'projects', 'contact', 'theme', 'clear', 'sysinfo', 'date', 'echo', 'matrix', 'quote', 'weather', 'game'];
            const match = availableCommands.find(cmd => cmd.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    const startWordDecrypter = (newHistory) => {
        const words = ['REACT', 'JAVASCRIPT', 'TERMINAL', 'HACKER', 'FRONTEND', 'CYBER'];
        const target = words[Math.floor(Math.random() * words.length)];
        const scrambled = target.split('').sort(() => 0.5 - Math.random()).join(' ');

        newHistory.push({ type: 'system', text: 'INITIALIZING WORD DECRYPTER...' });
        newHistory.push({ type: 'output', text: `Encrypted Payload: [ ${scrambled} ]` });
        newHistory.push({ type: 'output', text: 'Type the correct word to decrypt. Type "exit" to abort.' });

        setGameState({ target, attempts: 0 });
        setActiveGame('word_decrypter');
    };

    const startMathBypass = (newHistory) => {
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 20) + 5;
        const operators = ['+', '-', '*'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        let answer = 0;
        if (op === '+') answer = a + b;
        if (op === '-') answer = a - b;
        if (op === '*') answer = a * b;

        newHistory.push({ type: 'system', text: 'INITIALIZING MATH BYPASS PROTOCOL...' });
        newHistory.push({ type: 'output', text: `Firewall Challenge: ${a} ${op} ${b} = ?` });
        newHistory.push({ type: 'output', text: 'Enter the correct integer to bypass. Type "exit" to abort.' });

        setGameState({ answer, attempts: 0 });
        setActiveGame('math_bypass');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        const lowerInput = trimmedInput.toLowerCase();

        if (!trimmedInput && !interactiveMode && !activeGame) return;

        let newHistory = [...history, { type: 'input', text: `${getPromptIndicator()} ${input}` }];

        // Save to command history
        if (!interactiveMode && !activeGame && trimmedInput) {
            setInputHistory(prev => [...prev, trimmedInput]);
            setHistoryIndex(-1);
        }

        // --- HANDLE ACTIVE GAMES ---
        if (activeGame) {
            if (lowerInput === 'exit' || lowerInput === 'cancel' || lowerInput === 'quit') {
                newHistory.push({ type: 'system', text: 'Simulation aborted.' });
                setActiveGame(null);
                setHistory(newHistory);
                setInput('');
                return;
            }

            if (activeGame === 'selector') {
                if (trimmedInput === '1') {
                    newHistory.push({ type: 'system', text: 'INITIALIZING "NUMBER HACKER" PROTOCOL...' });
                    newHistory.push({ type: 'output', text: 'Target security code generated (1-100).' });
                    newHistory.push({ type: 'output', text: 'Type "exit" to abort.' });
                    setGameState({ secret: Math.floor(Math.random() * 100) + 1, attempts: 0 });
                    setActiveGame('number_hacker');
                } else if (trimmedInput === '2') {
                    startWordDecrypter(newHistory);
                } else if (trimmedInput === '3') {
                    startMathBypass(newHistory);
                } else {
                    newHistory.push({ type: 'error', text: 'Invalid selection. Type 1, 2, 3 or "exit".' });
                }
            }
            else if (activeGame === 'number_hacker') {
                const guess = parseInt(trimmedInput);
                if (isNaN(guess)) {
                    newHistory.push({ type: 'error', text: 'Please enter a valid number, or type "exit" to quit.' });
                } else {
                    const attempts = gameState.attempts + 1;
                    if (guess === gameState.secret) {
                        newHistory.push({ type: 'system', text: `ACCESS GRANTED! Mainframe hacked in ${attempts} attempts.` });
                        setActiveGame(null);
                    } else if (guess < gameState.secret) {
                        newHistory.push({ type: 'output', text: 'System Response: HIGHER' });
                        setGameState({ ...gameState, attempts });
                    } else {
                        newHistory.push({ type: 'output', text: 'System Response: LOWER' });
                        setGameState({ ...gameState, attempts });
                    }
                }
            }
            else if (activeGame === 'word_decrypter') {
                const attempts = gameState.attempts + 1;
                if (trimmedInput.toUpperCase() === gameState.target) {
                    newHistory.push({ type: 'system', text: `PAYLOAD DECRYPTED in ${attempts} attempts!` });
                    setActiveGame(null);
                } else {
                    newHistory.push({ type: 'error', text: 'DECRYPTION FAILED. Try again.' });
                    setGameState({ ...gameState, attempts });
                }
            }
            else if (activeGame === 'math_bypass') {
                const guess = parseInt(trimmedInput);
                if (isNaN(guess)) {
                    newHistory.push({ type: 'error', text: 'Please enter a valid integer.' });
                } else {
                    if (guess === gameState.answer) {
                        newHistory.push({ type: 'system', text: `FIREWALL BYPASSED SUCCESSFULLY!` });
                        setActiveGame(null);
                    } else {
                        newHistory.push({ type: 'error', text: 'INCORRECT ANSWER. Firewall locked. Try again.' });
                    }
                }
            }

            setHistory(newHistory);
            setInput('');
            return;
        }

        // --- HANDLE INTERACTIVE CONTACT PROTOCOL ---
        if (interactiveMode) {
            if (lowerInput === 'cancel' || lowerInput === 'exit') {
                newHistory.push({ type: 'system', text: 'Contact protocol aborted.' });
                setInteractiveMode(null);
                setContactData({ name: '', email: '', message: '' });
                setHistory(newHistory);
                setInput('');
                return;
            }

            if (interactiveMode === 'contact_name') {
                if (!trimmedInput) {
                    newHistory.push({ type: 'error', text: 'Name cannot be empty. Type "cancel" to abort.' });
                } else {
                    setContactData(prev => ({ ...prev, name: trimmedInput }));
                    newHistory.push({ type: 'output', text: 'Enter your email (optional, press Enter to skip):' });
                    setInteractiveMode('contact_email');
                }
            } else if (interactiveMode === 'contact_email') {
                setContactData(prev => ({ ...prev, email: trimmedInput }));
                newHistory.push({ type: 'output', text: 'Enter your message:' });
                setInteractiveMode('contact_message');
            } else if (interactiveMode === 'contact_message') {
                if (!trimmedInput) {
                    newHistory.push({ type: 'error', text: 'Message cannot be empty. Type "cancel" to abort.' });
                } else {
                    newHistory.push({ type: 'system', text: 'Initiating secure WhatsApp connection...' });
                    const finalMessage = trimmedInput;
                    const phoneNumber = import.meta.env.VITE_WA_NUMBER;
                    const text = `Hey Jyotishman! I'm ${contactData.name}${contactData.email ? ` (${contactData.email})` : ''}.\n\n${finalMessage}`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

                    setTimeout(() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer'), 800);
                    setInteractiveMode(null);
                    setContactData({ name: '', email: '', message: '' });
                }
            }
            setHistory(newHistory);
            setInput('');
            return;
        }

        // --- GAME ENTRY ---
        if (lowerInput === 'game' || lowerInput === 'play game') {
            newHistory.push({ type: 'system', text: 'LOADING SIMULATION HUB...' });
            newHistory.push({
                type: 'output', node: (
                    <div className="flex flex-col mt-2">
                        <span className="font-bold text-secondary">AVAILABLE SIMULATIONS:</span>
                        <span>[1] Number Hacker (Logic/Guessing)</span>
                        <span>[2] Word Decrypter (Anagrams)</span>
                        <span>[3] Math Bypass (Arithmetic)</span>
                    </div>
                )
            });
            setActiveGame('selector');
            setHistory(newHistory);
            setInput('');
            return;
        }

        // --- ASYNC API FETCHES ---
        if (lowerInput === 'quote') {
            if (Date.now() - lastApiCall.current < 3000) {
                newHistory.push({ type: 'error', text: 'Please wait 3 seconds before making another API request.' });
                setHistory(newHistory);
                setInput('');
                return;
            }
            lastApiCall.current = Date.now();
            newHistory.push({ type: 'output', text: 'Fetching encrypted quote...' });
            setHistory(newHistory);
            setInput('');
            try {
                const res = await fetch('https://dummyjson.com/quotes/random');
                const data = await res.json();
                setHistory(prev => [...prev, { type: 'system', text: `"${data.quote}" - ${data.author}` }]);
            } catch (err) {
                setHistory(prev => [...prev, { type: 'error', text: 'Failed to fetch quote. Network error.' }]);
            }
            return;
        }

        if (lowerInput.startsWith('weather')) {
            if (Date.now() - lastApiCall.current < 3000) {
                newHistory.push({ type: 'error', text: 'Please wait 3 seconds before making another API request.' });
                setHistory(newHistory);
                setInput('');
                return;
            }
            lastApiCall.current = Date.now();
            const args = trimmedInput.split(' ');
            const city = args.slice(1).join(' ') || 'London';
            newHistory.push({ type: 'output', text: `Accessing atmospheric sensors for ${city}...` });
            setHistory(newHistory);
            setInput('');
            try {
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
                const geoData = await geoRes.json();

                if (!geoData.results || geoData.results.length === 0) {
                    setHistory(prev => [...prev, { type: 'error', text: `Failed to locate coordinates for: ${city}.` }]);
                    return;
                }

                const { latitude, longitude, name, country } = geoData.results[0];

                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const weatherData = await weatherRes.json();

                if (weatherData.current_weather) {
                    const { temperature, windspeed, weathercode } = weatherData.current_weather;
                    
                    const getWeatherCondition = (code) => {
                        if (code === 0) return 'Clear Sky ☀️';
                        if (code >= 1 && code <= 3) return 'Partly Cloudy ⛅';
                        if (code === 45 || code === 48) return 'Foggy 🌫️';
                        if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'Rainy 🌧️';
                        if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'Snowy ❄️';
                        if (code >= 95 && code <= 99) return 'Thunderstorm ⛈️';
                        return 'Unknown';
                    };
                    const condition = getWeatherCondition(weathercode);

                    setHistory(prev => [...prev, { type: 'system', text: `${name}, ${country}: ${condition} | ${temperature}°C | Wind: ${windspeed}km/h` }]);
                } else {
                    setHistory(prev => [...prev, { type: 'error', text: `Atmospheric data unavailable for ${name}.` }]);
                }
            } catch (err) {
                setHistory(prev => [...prev, { type: 'error', text: 'Failed to connect to weather satellites.' }]);
            }
            return;
        }

        // --- SYSTEM & FUN COMMANDS ---
        if (lowerInput === 'date') {
            newHistory.push({ type: 'output', text: new Date().toString() });
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput === 'sysinfo') {
            newHistory.push({ type: 'output', text: `OS Platform: ${navigator.platform}` });
            newHistory.push({ type: 'output', text: `User Agent: ${navigator.userAgent}` });
            newHistory.push({ type: 'output', text: `Screen: ${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)` });
            newHistory.push({ type: 'output', text: `Language: ${navigator.language}` });
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput.startsWith('echo ')) {
            const sanitize = (str) => str.replace(/[<>&"']/g, '');
            newHistory.push({ type: 'output', text: sanitize(trimmedInput.substring(5)) });
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput === 'matrix') {
            for (let i = 0; i < 8; i++) {
                let line = '';
                for (let j = 0; j < 20; j++) line += Math.random().toString(36).substring(2, 6) + ' ';
                newHistory.push({ type: 'output', text: line });
            }
            setHistory(newHistory);
            setInput('');
            return;
        }

        // --- STANDARD COMMANDS ---
        if (lowerInput === 'clear') {
            setHistory([
                { type: 'system', text: 'JYOTISHMAN SAIKIA OS v1.0.0' },
                { type: 'system', text: 'Type "help" to see available commands.' }
            ]);
            setInput('');
            return;
        }

        if (lowerInput === 'help') {
            newHistory.push({
                type: 'output', node: (
                    <div className="flex flex-col gap-4 mt-2">
                        <div>
                            <div className="font-bold text-secondary mb-1">[ PORTFOLIO ]</div>
                            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-2 gap-y-1 ml-2">
                                <span className="font-black text-tertiary">about</span><span className="opacity-90">About Jyotishman</span>
                                <span className="font-black text-tertiary">skills</span><span className="opacity-90">Tech stack & tools</span>
                                <span className="font-black text-tertiary">projects</span><span className="opacity-90">View my work</span>
                                <span className="font-black text-tertiary">contact</span><span className="opacity-90">Send me a message</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-secondary mb-1">[ SYSTEM ]</div>
                            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-2 gap-y-1 ml-2">
                                <span className="font-black text-tertiary">theme</span><span className="opacity-90">Change color (e.g. theme blood)</span>
                                <span className="font-black text-tertiary">clear</span><span className="opacity-90">Clear terminal screen</span>
                                <span className="font-black text-tertiary">sysinfo</span><span className="opacity-90">View system diagnostics</span>
                                <span className="font-black text-tertiary">date</span><span className="opacity-90">Current date/time</span>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-secondary mb-1">[ INTERNET & APPS ]</div>
                            <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-2 gap-y-1 ml-2">
                                <span className="font-black text-tertiary">game</span><span className="opacity-90">Launch Simulation Hub (3 Games)</span>
                                <span className="font-black text-tertiary">quote</span><span className="opacity-90">Fetch encrypted quote</span>
                                <span className="font-black text-tertiary">weather</span><span className="opacity-90">Check atmospheric data (e.g. weather london)</span>
                            </div>
                        </div>
                    </div>
                )
            });
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput === 'contact') {
            newHistory.push({ type: 'system', text: 'INITIATING CONTACT PROTOCOL...' });
            newHistory.push({ type: 'output', text: 'Type "cancel" at any time to abort.' });
            newHistory.push({ type: 'output', text: 'Enter your name:' });
            setInteractiveMode('contact_name');
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput === 'projects') {
            newHistory.push({
                type: 'output', node: (
                    <div className="flex flex-col gap-1 mt-1">
                        <span>1. MYY_WEATHER - Web Application (REACT, API) [LIVE]</span>
                        <a href="https://myyweather.vercel.app" target="_blank" rel="noopener noreferrer" className="text-secondary font-black hover:underline cursor-pointer flex items-center gap-2">
                            <span>-&gt; LAUNCH LIVE PREVIEW (Type '1')</span>
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>

                        <span
                            onClick={() => navigate('/projects')}
                            className="text-secondary font-black hover:underline cursor-pointer flex items-center gap-2 mt-4"
                        >
                            <span>-&gt; OPEN FULL PROJECTS PAGE (Type 'all projects')</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>

                        <span className="mt-4 text-surface-dim opacity-70">(Type "contact" to get in touch!)</span>
                    </div>
                )
            });
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput === 'all projects' || lowerInput === 'projects --all') {
            newHistory.push({ type: 'output', text: 'Opening full projects page...' });
            setHistory(newHistory);
            setInput('');
            setTimeout(() => navigate('/projects'), 1000);
            return;
        }

        if (lowerInput === '1' || lowerInput === 'open myy_weather') {
            newHistory.push({ type: 'output', text: 'Launching MYY_WEATHER in a new tab...' });
            window.open('https://myyweather.vercel.app', '_blank', 'noopener,noreferrer');
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (lowerInput.startsWith('theme')) {
            const args = lowerInput.split(' ');
            if (args.length < 2) {
                newHistory.push({ type: 'output', text: 'Usage: theme <color>\nAvailable: default, blood, matrix, amber' });
            } else {
                const requestedTheme = args[1];
                if (requestedTheme === 'blood' || requestedTheme === 'red') {
                    setTheme(THEMES.blood);
                    newHistory.push({ type: 'output', text: 'Theme updated to BLOOD.' });
                } else if (requestedTheme === 'matrix' || requestedTheme === 'green') {
                    setTheme(THEMES.matrix);
                    newHistory.push({ type: 'output', text: 'Theme updated to MATRIX.' });
                } else if (requestedTheme === 'amber' || requestedTheme === 'yellow') {
                    setTheme(THEMES.amber);
                    newHistory.push({ type: 'output', text: 'Theme updated to AMBER.' });
                } else if (requestedTheme === 'default' || requestedTheme === 'white') {
                    setTheme(THEMES.default);
                    newHistory.push({ type: 'output', text: 'Theme updated to DEFAULT.' });
                } else {
                    newHistory.push({ type: 'error', text: `Unknown theme: ${requestedTheme}. Try: blood, matrix, amber, default` });
                }
            }
            setHistory(newHistory);
            setInput('');
            return;
        }

        if (commands[lowerInput]) {
            const outputLines = commands[lowerInput].split('\n');
            outputLines.forEach(line => {
                newHistory.push({ type: 'output', text: line });
            });
        } else {
            newHistory.push({ type: 'error', text: `Command not found: ${lowerInput}` });
        }

        setHistory(newHistory);
        setInput('');
    };

    const handleFocusInput = () => {
        if (!isBooting && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={handleFocusInput}
            className={`${theme.bg} ${theme.text} ${theme.shadow} font-mono text-base p-0 w-full h-full min-h-[400px] md:min-h-[500px] max-h-[600px] overflow-hidden border-2 border-primary flex flex-col transition-all cursor-text group relative`}
        >
            {/* CRT Scanline Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-10"
                style={{
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%'
                }}
            />

            {/* Clean Brutalist Window Header */}
            <div className={`${theme.headerBg} ${theme.headerText} w-full px-4 py-2 border-b-2 border-primary flex justify-between items-center cursor-default z-20 relative transition-colors`}>
                <div className={`font-display font-bold tracking-widest uppercase text-sm ${theme.glow}`}>Terminal</div>
                <div className="flex gap-1.5">
                    <div className="w-4 h-4 bg-black"></div>
                    <div className="w-4 h-4 bg-black"></div>
                    <div className="w-4 h-4 bg-background"></div>
                </div>
            </div>

            <div ref={historyContainerRef} className={`flex-grow flex flex-col gap-3 p-6 overflow-y-auto z-20 relative ${theme.glow} transition-colors`}>
                {history.map((line, idx) => (
                    <div key={idx} className={
                        line.type === 'system' ? 'text-tertiary font-bold' :
                            line.type === 'error' ? 'text-primary' :
                                line.type === 'input' ? 'text-secondary font-bold' : theme.text
                    }>
                        {line.node ? line.node : line.text}
                    </div>
                ))}

                {/* Blinking Cursor during boot */}
                {isBooting && (
                    <div className="w-3 h-5 bg-tertiary animate-pulse mt-1"></div>
                )}

                <div ref={bottomRef} />
            </div>

            {!isBooting && (
                <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3 mt-auto p-4 bg-black/50 border-t-2 border-[#222] z-20 relative backdrop-blur-sm">
                    <span className={`${theme.prompt} font-bold whitespace-nowrap text-sm md:text-base flex-shrink-0 ${theme.glow} transition-colors`}>
                        {getPromptIndicator()}
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`bg-transparent border-none outline-none flex-grow w-full min-w-0 ${theme.text} focus:ring-0 p-0 font-bold text-sm md:text-base cursor-text ${theme.glow} transition-colors`}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </form>
            )}
        </div>
    );
};

export default Terminal;
