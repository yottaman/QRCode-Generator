class QRCode {
  constructor(text) {
    this.text = text;
    this.size = 200; // Dimensione del QR code
    this.canvas = null;
  }

  // Funzione per generare il QR code
  generate() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    const ctx = this.canvas.getContext('2d');

    // Codifica il testo in un formato adatto per il QR Code
    const qrData = this.encodeText(this.text);

    // Disegna il QR code nel canvas
    const cellSize = this.size / qrData.length;
    for (let row = 0; row < qrData.length; row++) {
      for (let col = 0; col < qrData.length; col++) {
        ctx.fillStyle = qrData[row][col] ? "black" : "white";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  // Codifica il testo in una matrice di QR code
  encodeText(text) {
    const size = this.getSizeFromText(text);
    let matrix = this.createEmptyMatrix(size);
    this.addFinderPatterns(matrix);
    this.addDataToMatrix(matrix, text);

    return matrix;
  }

  // Calcola la dimensione del QR code in base al testo
  getSizeFromText(text) {
    // Per semplificare, restituiremo una dimensione fissa di 21x21 per i QR code.
    return 21;
  }

  // Crea una matrice vuota per il QR code
  createEmptyMatrix(size) {
    let matrix = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = 0; // Tutti i valori sono inizialmente vuoti
      }
    }
    return matrix;
  }

  // Aggiungi i pattern di ricerca (Finder patterns) alla matrice
  addFinderPatterns(matrix) {
    const size = matrix.length;
    const patternSize = 7;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = (i === 0) ? 0 : size - patternSize;
        let y = (j === 0) ? 0 : size - patternSize;
        this.addPattern(matrix, x, y, patternSize);
      }
    }
  }

  // Aggiungi un pattern alla matrice
  addPattern(matrix, x, y, size) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          matrix[x + i][y + j] = 1;
        }
      }
    }
  }

  // Aggiungi i dati del testo alla matrice
  addDataToMatrix(matrix, text) {
    let index = 0;
    const size = matrix.length;

    // Per semplicità, aggiungiamo i dati del testo in sequenza
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 0 && index < text.length) {
          matrix[i][j] = text.charCodeAt(index) % 2; // Simula la codifica
          index++;
        }
      }
    }
  }

  // Renderizza il QR Code su un canvas esistente
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
