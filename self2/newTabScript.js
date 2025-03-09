// newTabScript.js

// When the new tab page loads, retrieve the highlighted lines from storage and display them.
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("highlightedLines", (result) => {
      console.log("Retrieved highlightedLines:", result.highlightedLines);
      if (result.highlightedLines) {
        document.getElementById('content').innerHTML = result.highlightedLines;
      } else {
        document.getElementById('content').innerHTML = "No highlighted content found.";
      }
    });
  });
  
  // (Optional) Summarize button event listener for further functionality
  document.getElementById('summarize').addEventListener('click', async () => {
    const contentDiv = document.getElementById('content');
    const textToSummarize = contentDiv.innerText || contentDiv.textContent;
    
    if (!textToSummarize || textToSummarize.trim() === "") {
      alert("No content to summarize.");
      return;
    }
    
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerText = "Summarizing...";
  
    try {
      const response = await fetch('https://api.apyhub.com/ai/summarize-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apy-token': 'API_KEY_GOES_HERI'
        },
        body: JSON.stringify({ text: textToSummarize })
      });
      
      if (!response.ok) {
        summaryDiv.innerText = "Error in summarization: " + response.statusText;
        return;
      }
      
      const data = await response.json();
  console.log("API response:", data);
  
  // Check for multiple possible response structures:
  if (data.summary) {
    summaryDiv.innerText = "Summary: " + data.summary;
  } else if (data.data && data.data.summary) {
    summaryDiv.innerText = "Summary: " + data.data.summary;
  } else {
    summaryDiv.innerText = "No summary received. Full response: " + JSON.stringify(data);
  }
} catch (error) {
  summaryDiv.innerText = "Error: " + error.message;
}
  });