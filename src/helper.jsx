export const downloadGif = async (giphyObject) => {
  const gifUrl = giphyObject.images.original.url; // Extract GIF URL

  try {
    const response = await fetch(gifUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = giphyObject?.title ?? "giphy.gif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading GIF:", error);
  }
};

// Example usage
