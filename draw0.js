// Získání reference k HTML canvas elementu s id 'myCanvas'
let canvas = document.getElementById('myCanvas');

// Získání 2D vykreslovacího kontextu pro canvas
let ctx = canvas.getContext('2d');

// Nastavení barvy výplně na šedou
ctx.fillStyle = '#DCDCDC';

// Vykreslení obdélníka, který pokryje celý canvas touto šedou barvou
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Přidání posluchače událostí k celému dokumentu pro detekci stisku klávesy
document.addEventListener('keydown', function(event) {
    console.log(event); 
    // Kontroluje, zda byla stisknuta klávesa Escape
    if (event.code === 'Escape') {
        // Pokud ano, znovu vykreslí celý canvas šedou barvou
        ctx.fillStyle = '#DCDCDC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return; // Ukončení funkce
    }

    

    switch (event.code) {
    case "KeyS":
            // Generuje náhodné souřadnice x a y uvnitř plátna
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
    
        // Generuje náhodnou velikost obdélníka mezi 50 a 150
        let size = Math.random() * 100 + 50;
    
        // Generuje náhodnou barvu
        let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    
        // Vykreslí obdélník s náhodnými parametry
        drawRectangle(x, y, size, size, col);
        break;
    case "KeyE":
        randomEllipse();
        break;
    case "KeyL":
        drawRandomTriangle(canvas);
        break;
    case "KeyK":
      drawRandomCross(canvas);
        break;
    case "KeyP":
      drawRandomLines(canvas);
        break;
    case "KeyT":
        drawTarget(10,20);
        break;
    case "KeyR":
        recursiveTarget(10,20);
        break;
    }
});

function randomEllipse (){
    let w = Math.random() * 100 + 50;
    let h = Math.random() * 100 + 50;
    let x = (Math.random() * (canvas.width - w )) + w / 2;
    let y = (Math.random() * (canvas.height - h )) + h / 2;
    let col = 'rgb(${Math.random() * 255}, ${Math.random() * 255} , ${Math.random() * 255})';
    drawEllipse(x, y, w, h, col);
}

function drawTarget(circles= 10, gap= 20){
    for(i = 1; i <= circles;i++){
        drawCircle (canvas.width/2, canvas.height/2, i*gap, "yellow");
    }
}

function recursiveTarget(circles=10,gap=20){
    if(circles>0){
        drawCircle(canvas.width/2, canvas.height/2, circles*gap,"green");
        recursivetarget(circles-1,gap);
    }else{
        return;
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function drawRandomLines(canvas, count = 10, gap = 15) {
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
  
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      const color = getRandomColor();
  
      ctx.strokeStyle = color;
      ctx.lineWidth = i + 1;
  
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 100, y);
      ctx.stroke();
    }
  }
  
  function drawRandomTriangle(canvas) {
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const color = getRandomColor();
  
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const size = 40; // Velikost trojúhelníku
  
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
  }
  
  function drawRandomCross(canvas) {
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const color = getRandomColor();
  
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const size = 40; // Velikost kříže
  
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
  
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.stroke();
  }
  
  /*document.addEventListener('keydown', function (event) {
    if (event.key === 'l') { // Reagovat na stisk klávesy "L" nebo "l"
      drawRandomTriangle(canvas);
    }
  });*/
  
// Funkce pro vykreslení obdélníka na plátno s danými parametry
function drawRectangle(x, y, w, h, col) {
    // Nastavení barvy výplně pro obdélník
    ctx.fillStyle = col;
    // Vykreslení obdélníka na plátno s danými souřadnicemi (x, y),
    // šířkou (w) a výškou (h)
    ctx.fillRect(x, y, w, h);
}


// Funkce pro vykreslení elipsy na plátno s danými parametry
function drawEllipse(x, y, w, h, col) {
    // Nastavení barvy výplně pro elipsu
    ctx.fillStyle = col;
    // Začátek nové cesty (to je důležité pro kreslení tvarů jako jsou kruhy, elipsy atd.)
    ctx.beginPath();
    // Vykreslení elipsy s centrem v bodě (x, y), s horizontálním poloměrem (w / 2),
    // vertikálním poloměrem (h / 2) a úhlem od 0 do 2π (což je celý kruh)
    ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
    // Vyplnění elipsy nastavenou barvou
    ctx.fill();
}

// Funkce pro vykreslení kruhu na plátno s danými parametry
function drawCircle(x, y, r, col='black') {
    // Nastavení barvy výplně pro kruh
    ctx.strokeStyle = col;
    // Začátek nové cesty (to je důležité pro kreslení tvarů jako jsou kruhy, elipsy atd.)
    ctx.beginPath();
    // Vykreslení kruhu s centrem v bodě (x, y), poloměrem (r) a úhlem od 0 do 2π
    // (což je celý kruh)
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    // Vyplnění kruhu nastavenou barvou
    ctx.stroke();
}

// Funkce pro vykreslení čtverce na plátno s danými parametry
function drawSquare(x, y, s, col) {
    // Nastavení barvy výplně pro čtverec
    ctx.fillStyle = col;
    // Vykreslení čtverce na plátno s danými souřadnicemi (x, y) a rozměry (s x s)
    ctx.fillRect(x, y, s, s);
}

