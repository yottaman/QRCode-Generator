class QRCode {
  constructor(text) {
    this.text = text;
  }

  generate() {
    console.log(`Generating QR Code for: ${this.text}`);
  }

  render(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas with ID "${canvasId}" not found.`);
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText("QR Code Placeholder", 10, 50);
  }
}
