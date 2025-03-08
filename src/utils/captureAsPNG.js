import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Captures an HTML element and saves it as a PNG or PDF.
 * @param elementId The ID of the HTML element to capture.
 * @param filename The name of the downloaded file.
 * @param format "png" or "pdf" (default: "png").
 */

function replaceOklchWithRGB(element) {
  const styles = window.getComputedStyle(element);
  const bgColor = styles.backgroundColor;

  if (bgColor.includes("oklch")) {
    element.style.backgroundColor = "rgb(255, 255, 255)"; // Replace with white or another color
  }

  for (const child of element.children) {
    replaceOklchWithRGB(child); // Recursively fix child elements
  }
}

const waitForElement = async (id, timeout = 5000) => {
  const startTime = Date.now();
  while (!document.getElementById(id)) {
    if (Date.now() - startTime > timeout) {
      console.error(`Timeout: Element with ID '${id}' not found.`);
      return null;
    }
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms
  }
  return document.getElementById(id);
};

export const captureElement = async ({
  elementId,
  filename = "captured",
  format = "png", // "png" or "pdf"
  download = true,
}) => {
  const element = await waitForElement(elementId);
  if (!element) return; // Stop if element is still not found

  replaceOklchWithRGB(element);

  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    if (format === "png") {
      const image = canvas.toDataURL("image/png");

      if (navigator.clipboard) {
        canvas.toBlob((blob) => {
          if (blob) {
            const item = new ClipboardItem({ "image/png": blob });
            navigator.clipboard.write([item]);
          }
        });
      } else {
        console.warn("Clipboard API not supported.");
      }

      if (download) {
        const link = document.createElement("a");
        link.href = image;
        link.download = `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else if (format === "pdf") {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 200; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);

      if (download) {
        pdf.save(`${filename}.pdf`);
      }
    }
  } catch (error) {
    console.error("Error capturing element:", error);
  }
};
