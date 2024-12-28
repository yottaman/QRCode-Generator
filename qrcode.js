class QRCode {
    constructor(text, size = 200) {
      this.text = text;
      this.size = size;
      this.matrix = null;
    }
  
    // Metodo principale per generare il QR code
    generate() {
      // Step 1: Convertire il testo in binario (semplificato per alfanumerico)
      const binaryData = this.encodeData(this.text);
  
      // Step 2: Generare una matrice QR semplice (dimensione fissa 21x21 per semplicità)
      this.matrix = this.createMatrix(binaryData);
  
      return this.matrix;
    }
  
    // Codifica dei dati
    encodeData(text) {
      const alphanumericMap = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
      let binaryString = "";
  
      for (const char of text.toUpperCase()) {
        const index = alphanumericMap.indexOf(char);
        if (index === -1) {
          throw new Error(`Character '${char}' not supported.`);
        }
        binaryString += index.toString(2).padStart(6, "0"); // 6-bit alfanumerico
      }
  
      // Aggiungere un padding per completare il blocco
      binaryString = binaryString.padEnd(21 * 21, "0"); // 21x21 matrice QR fissa
      return binaryString;
    }
  
    // Creazione della matrice 2D
    createMatrix(binaryData) {
      const size = 21; // Dimensione fissa
      const matrix = Array.from({ length: size }, () => Array(size).fill(0));
  
      let dataIndex = 0;
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          // Posizionare i dati solo nella parte centrale, per semplicità
          if (row > 1 && row < size - 2 && col > 1 && col < size - 2) {
            matrix[row][col] = parseInt(binaryData[dataIndex++], 10);
          }
        }
      }
  
      // Aggiungere moduli fissi (finder pattern e timing pattern)
      this.addFinderPattern(matrix, size);
      this.addTimingPattern(matrix, size);
  
      return matrix;
    }
  
    // Aggiungere il finder pattern
    addFinderPattern(matrix, size) {
      const pattern = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ];
  
      // In alto a sinistra
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          matrix[i][j] = pattern[i][j];
          matrix[i][size - 7 + j] = pattern[i][j];
          matrix[size - 7 + i][j] = pattern[i][j];
        }
      }
    }
  
    // Aggiungere il timing pattern
    addTimingPattern(matrix, size) {
      for (let i = 8; i < size - 8; i++) {
        matrix[6][i] = i % 2;
        matrix[i][6] = i % 2;
      }
    }
  
    // Renderizzare il QR code su un canvas
    render(canvasId) {
      if (!this.matrix) {
        throw new Error("Matrix not generated. Call generate() first.");
      }
  
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      const cellSize = this.size / this.matrix.length;
  
      canvas.width = this.size;
      canvas.height = this.size;
  
      for (let row = 0; row < this.matrix.length; row++) {
        for (let col = 0; col < this.matrix[row].length; col++) {
          ctx.fillStyle = this.matrix[row][col] ? "#000" : "#fff";
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }
  }
  