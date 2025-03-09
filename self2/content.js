// Function to highlight paragraphs that contain the keyword and return those paragraphs' HTML
function highlightParagraphs(keyword) {
    let matchingParagraphs = [];
    // Iterate over all <p> elements
    const paragraphs = document.getElementsByTagName('p');
    for (let p of paragraphs) {
      if (p.textContent.toLowerCase().includes(keyword.toLowerCase())) {
        // Create a regex to find the keyword (case-insensitive)
        const regex = new RegExp(`(${keyword})`, 'gi');
        p.innerHTML = p.innerHTML.replace(regex, `<span style="background-color: yellow;">$1</span>`);
        matchingParagraphs.push(p.outerHTML);
      }
    }
    return matchingParagraphs.join('<br>');
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.keyword) {
      const highlightedLines = highlightParagraphs(request.keyword);
      sendResponse({ highlightedLines: highlightedLines });
    }
  });
  