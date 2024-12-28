// Funzione per generare il QR Code
class QRCode {
  constructor(text) {
    this.text = text;
    this.size = 200;  // Dimensione del QR Code
    this.canvas = null;
  }

  // Funzione per generare e disegnare il QR Code
  generate() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    const ctx = this.canvas.getContext('2d');
    
    // Codifica il testo in un formato adatto per il QR Code (semplificato)
    const data = this.encodeText(this.text);

    // Disegna il QR Code nel canvas
    const cellSize = this.size / data.length;
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data.length; col++) {
        if (data[row][col] === 1) {
          ctx.fillStyle = "black";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  // Funzione per codificare il testo in una matrice (QR code semplificato)
  encodeText(text) {
    // Implementa una semplice codifica del testo in una matrice di QR Code
    // (Questa parte dovrà essere migliorata per generare QR Code validi reali)
    const size = 21;  // Impostiamo una dimensione fissa per la matrice (in un QR Code standard)
    let data = Array(size).fill().map(() => Array(size).fill(0));

    // Popoliamo la matrice con valori pseudo-casuali basati sul testo
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      data[i % size][(i * 2) % size] = charCode % 2;  // Simula un pattern (questo va migliorato)
    }
    return data;
  }

  // Funzione per renderizzare il QR Code su un canvas esistente
  render(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas with ID "${canvasId}" not found.`);
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.canvas, 0, 0);
  }
}
