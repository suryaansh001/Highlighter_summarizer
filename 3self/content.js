console.log("Content script loaded.");

function searchAndHighlight(keyword) {
  const results = [];
  
  // Create a TreeWalker to traverse text nodes (ignoring whitespace)
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    },
    false
  );
  
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.toLowerCase().includes(keyword.toLowerCase())) {
      // Get the parent element for context
      const parent = node.parentElement;
      // Highlight the keyword within the text node
      const regex = new RegExp(`(${keyword})`, 'gi');
      const highlightedText = node.nodeValue.replace(regex, '<span style="background-color: yellow;">$1</span>');
      
      let formatted;
      if (parent && parent.tagName === "A" && parent.href) {
        // If the text is within an anchor, create a clickable hyperlink
        formatted = `<div><a href="${parent.href}" target="_blank">${highlightedText}</a> <em>(as hyperlink)</em></div>`;
      } else if (parent) {
        // Otherwise, just display the highlighted text with the parent tag label
        formatted = `<div>${highlightedText} <em>(in ${parent.tagName})</em></div>`;
      } else {
        formatted = `<div>${highlightedText}</div>`;
      }
      results.push(formatted);
    }
  }
  
  return results.join('<br>');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.keyword) {
    const highlightedResults = searchAndHighlight(request.keyword);
    console.log("Search results:", highlightedResults);
    sendResponse({ highlightedResults: highlightedResults });
  }
});
