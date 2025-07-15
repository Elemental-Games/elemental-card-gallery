import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, Download, Upload, RefreshCw } from "lucide-react";

const CardRevealPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Card reveal state
  const [selectedCardType, setSelectedCardType] = useState('air-creature');
  const [cardImageUrl, setCardImageUrl] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [cardName, setCardName] = useState('');
  
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Card type definitions based on marketing strategy
  const cardTypes = {
    'air-creature': {
      name: 'Air Creature',
      vibe: 'Ethereal, Sky-High Wonder, Freedom',
      colors: ['#1E40AF', '#E5E7EB', '#6B7280'], // Electric blues, silver whites, storm grays
      defaultTagline: 'Command the Skies',
      background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #E5E7EB 100%)',
      effects: 'Swirling clouds with lightning'
    },
    'water-creature': {
      name: 'Water Creature',
      vibe: 'Deep Mystery, Flowing Power, Ancient Wisdom',
      colors: ['#1E3A8A', '#06B6D4', '#10B981'], // Deep ocean blues, aquamarine, bioluminescent greens
      defaultTagline: 'Dive Into Power',
      background: 'linear-gradient(135deg, #1E3A8A 0%, #06B6D4 50%, #10B981 100%)',
      effects: 'Underwater coral cities with glowing currents'
    },
    'fire-creature': {
      name: 'Fire Creature',
      vibe: 'Explosive Energy, Passion, Unstoppable Force',
      colors: ['#DC2626', '#F97316', '#FEF3C7'], // Blazing reds, molten oranges, white-hot yellows
      defaultTagline: 'Forge Your Destiny',
      background: 'linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FEF3C7 100%)',
      effects: 'Volcanic forges with molten lava flows'
    },
    'earth-creature': {
      name: 'Earth Creature',
      vibe: 'Ancient Strength, Natural Harmony, Unbreakable Foundation',
      colors: ['#166534', '#6B7280', '#FCD34D'], // Rich forest greens, stone grays, golden earth tones
      defaultTagline: 'Rooted in Power',
      background: 'linear-gradient(135deg, #166534 0%, #6B7280 50%, #FCD34D 100%)',
      effects: 'Ancient forest with massive stone formations'
    },
    'rune': {
      name: 'Rune',
      vibe: 'Arcane Knowledge, Strategic Mastery, Hidden Secrets',
      colors: ['#7C3AED', '#3B82F6', '#FCD34D'], // Mystical purples, arcane blues, golden script
      defaultTagline: 'Master the Arcane',
      background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #FCD34D 100%)',
      effects: 'Floating magical library with glowing runes'
    },
    'counter': {
      name: 'Counter',
      vibe: 'Tactical Defense, Perfect Timing, Outsmarting Opponents',
      colors: ['#3B82F6', '#E5E7EB', '#FFFFFF'], // Defensive blues, shield silvers, protective whites
      defaultTagline: 'Perfect Defense',
      background: 'linear-gradient(135deg, #3B82F6 0%, #E5E7EB 50%, #FFFFFF 100%)',
      effects: 'Crystalline barrier with energy shields'
    },
    'shield': {
      name: 'Shield',
      vibe: 'Protection & Power, Hidden Potential, Sacred Defense',
      colors: ['#FCD34D', '#3B82F6', '#FFFFFF'], // Sacred golds, protective blues, mystical whites
      defaultTagline: 'Shield & Strike',
      background: 'linear-gradient(135deg, #FCD34D 0%, #3B82F6 50%, #FFFFFF 100%)',
      effects: 'Ancient temple with protective wards'
    }
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('card-reveal-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('card-reveal-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('card-reveal-theme', 'light');
    }
  }, [isDarkMode]);

  // Update tagline when card type changes
  useEffect(() => {
    if (selectedCardType && !tagline) {
      setTagline(cardTypes[selectedCardType].defaultTagline);
    }
  }, [selectedCardType]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'diorio1') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCardImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Start animation loop
    const animate = () => {
      drawCanvas(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    setIsAnimating(true);
    animate();
  };

  const drawCanvas = (ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cardType = cardTypes[selectedCardType];
    
    // Set canvas size for Instagram Posts (4:5 format)
    canvas.width = 1080;
    canvas.height = 1350;

    // Create animated rune-inspired background
    const time = Date.now() * 0.001; // For animation timing
    
    // Base gradient with rune-inspired colors (deep purples and golds)
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    gradient.addColorStop(0, '#2D1B69'); // Deep purple center
    gradient.addColorStop(0.4, '#7C3AED'); // Rune purple
    gradient.addColorStop(0.8, '#1E1B4B'); // Dark purple
    gradient.addColorStop(1, '#0F0A29'); // Almost black

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add animated floating rune symbols/particles
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 50; i++) {
      const x = (Math.sin(time * 0.5 + i) * 100) + (canvas.width / 2) + (Math.sin(i * 0.1) * 300);
      const y = (Math.cos(time * 0.3 + i) * 150) + (canvas.height / 2) + (Math.cos(i * 0.15) * 400);
      const size = 3 + Math.sin(time + i) * 2;
      
      ctx.fillStyle = '#FCD34D'; // Golden color for rune particles
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add mystical energy lines
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      const startX = Math.sin(time * 0.2 + i) * canvas.width;
      const startY = Math.cos(time * 0.15 + i) * canvas.height;
      const endX = Math.sin(time * 0.3 + i + Math.PI) * canvas.width;
      const endY = Math.cos(time * 0.25 + i + Math.PI) * canvas.height;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Add overlay gradient for card type colors
    const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = cardType.colors;
    overlayGradient.addColorStop(0, colors[0] + '40'); // Add transparency
    overlayGradient.addColorStop(0.5, colors[1] + '20');
    overlayGradient.addColorStop(1, colors[2] + '40');
    
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalAlpha = 1;

    // Draw card image if uploaded
    if (cardImageUrl) {
      const img = new Image();
      img.onload = () => {
        const cardWidth = 500; // Optimized for 4:5 format
        const cardHeight = 750;
        const x = (canvas.width - cardWidth) / 2;
        const y = (canvas.height - cardHeight) / 2;
        
        // Add card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 15;
        
        ctx.drawImage(img, x, y, cardWidth, cardHeight);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        drawText();
      };
      img.src = cardImageUrl;
    } else {
      drawText();
    }

    function drawText() {
      // Card name (top of canvas)
      if (cardName) {
        ctx.font = 'bold 56px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';
        
        // Add glow effect
        ctx.shadowColor = '#FCD34D';
        ctx.shadowBlur = 20;
        
        ctx.strokeText(cardName, canvas.width / 2, 120);
        ctx.fillText(cardName, canvas.width / 2, 120);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Tagline (bottom of canvas)
      if (tagline) {
        ctx.font = 'bold 42px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        
        // Add glow effect
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        
        ctx.strokeText(tagline, canvas.width / 2, canvas.height - 180);
        ctx.fillText(tagline, canvas.width / 2, canvas.height - 180);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Description (below tagline)
      if (description) {
        ctx.font = '28px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        
        // Word wrap for description
        const words = description.split(' ');
        const maxWidth = canvas.width - 120;
        let line = '';
        let y = canvas.height - 120;
        
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          
          if (testWidth > maxWidth && n > 0) {
            ctx.strokeText(line, canvas.width / 2, y);
            ctx.fillText(line, canvas.width / 2, y);
            line = words[n] + ' ';
            y += 35;
          } else {
            line = testLine;
          }
        }
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      }

      // Card type indicator (top left)
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'left';
      
      // Add glow effect
      ctx.shadowColor = '#7C3AED';
      ctx.shadowBlur = 10;
      
      ctx.strokeText(cardType.name.toUpperCase(), 60, 80);
      ctx.fillText(cardType.name.toUpperCase(), 60, 80);
      
      // Reset shadow and text align
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      setIsAnimating(false);
    }
  };

  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if recording is supported
    if (!canvas.captureStream || !window.MediaRecorder) {
      alert('Video recording is not supported in your browser. Please try Chrome or Firefox.');
      return;
    }

    // Create media stream from canvas
    const stream = canvas.captureStream(30); // 30 FPS
    
    recordedChunksRef.current = [];
    
    // Try different codecs for better browser compatibility
    let options = { mimeType: 'video/webm;codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
      }
    }
    
    mediaRecorderRef.current = new MediaRecorder(stream, options);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, {
        type: 'video/webm'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cardName || 'card-reveal'}-${selectedCardType}-animated.webm`;
      link.click();
      
      URL.revokeObjectURL(url);
      setIsRecording(false);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);

    // Record for 3 seconds
    setTimeout(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    }, 3000);
  };

  const downloadReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Stop animation before downloading to get a clean frame
    stopAnimation();
    
    // Generate one final frame
    const ctx = canvas.getContext('2d');
    drawCanvas(ctx);

    const link = document.createElement('a');
    link.download = `${cardName || 'card-reveal'}-${selectedCardType}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Login form (same as email preview)
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <Helmet>
          <title>Admin Login - Card Reveal Creator | Elekin TCG</title>
          <meta name="description" content="Admin access to card reveal creation system" />
        </Helmet>
        
        <div className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-center mb-6">
            <h1 className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🃏 Admin Access
            </h1>
            <p className={`mt-2 text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Enter password to access card reveal creator
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 font-sans ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
            </div>
            
            {loginError && (
              <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Access Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={toggleTheme}
              className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Helmet>
        <title>Card Reveal Creator - Admin Panel | Elekin TCG</title>
        <meta name="description" content="Admin card reveal creation and marketing system" />
      </Helmet>

      {/* Admin Header */}
      <div className={`shadow-sm border-b p-4 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🃏 Card Reveal Creator
            </h1>
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create stunning marketing reveals for Elekin TCG cards
            </p>
          </div>
          
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className={`${
              isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Card Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Card Type Selection */}
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Card Type
                  </Label>
                  <Select value={selectedCardType} onValueChange={setSelectedCardType}>
                    <SelectTrigger className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(cardTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {cardTypes[selectedCardType].vibe}
                  </p>
                </div>

                {/* Card Name */}
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Card Name
                  </Label>
                  <Input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Enter card name"
                    className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                </div>

                {/* Card Image Upload */}
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Card Image
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                                         {cardImageUrl && (
                       <Button
                         type="button"
                         variant="outline"
                         onClick={() => {
                           setCardImageUrl('');
                         }}
                       >
                         Clear
                       </Button>
                     )}
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Tagline
                  </Label>
                  <Input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Enter catchy tagline"
                    className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                </div>

                {/* Description */}
                <div>
                  <Label className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter reveal description or marketing copy"
                    className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
                    rows={3}
                  />
                </div>

                                 {/* Action Buttons */}
                 <div className="space-y-2 pt-4">
                   <Button
                     onClick={isAnimating ? stopAnimation : generateReveal}
                     className="w-full bg-purple-600 hover:bg-purple-700"
                   >
                     <RefreshCw className={`w-4 h-4 mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
                     {isAnimating ? 'Stop Animation' : 'Generate Reveal'}
                   </Button>
                   
                   <div className="flex gap-2">
                     <Button
                       onClick={downloadReveal}
                       variant="outline"
                       disabled={!canvasRef.current}
                       className="flex-1"
                     >
                       <Download className="w-4 h-4 mr-2" />
                       PNG
                     </Button>
                     <Button
                       onClick={startRecording}
                       variant="outline"
                       disabled={!canvasRef.current || !isAnimating || isRecording}
                       className="flex-1"
                     >
                       {isRecording ? (
                         <>
                           <div className="w-4 h-4 mr-2 bg-red-500 rounded-full animate-pulse" />
                           Recording...
                         </>
                       ) : (
                         <>
                           <Download className="w-4 h-4 mr-2" />
                           Video
                         </>
                       )}
                     </Button>
                   </div>
                 </div>
              </CardContent>
            </Card>

            {/* Card Type Info */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {cardTypes[selectedCardType].name} Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="w-full h-20 rounded-lg mb-4"
                  style={{ background: cardTypes[selectedCardType].background }}
                />
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Vibe:</strong> {cardTypes[selectedCardType].vibe}
                </p>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Effects:</strong> {cardTypes[selectedCardType].effects}
                </p>
                                 <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   <strong>Default Tagline:</strong> &quot;{cardTypes[selectedCardType].defaultTagline}&quot;
                 </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                                 <div className="flex justify-center">
                   <canvas
                     ref={canvasRef}
                     className="max-w-full h-auto border rounded-lg shadow-lg"
                     style={{ maxWidth: '320px', maxHeight: '400px' }}
                   />
                 </div>
                                 <p className={`text-xs text-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                   Output: 1080x1350px (Instagram Posts 4:5 format)
                 </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRevealPage; 