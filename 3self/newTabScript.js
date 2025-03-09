document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("highlightedLines", (result) => {
      console.log("Retrieved search results:", result.highlightedLines);
      if (result.highlightedLines) {
        document.getElementById('content').innerHTML = result.highlightedLines;
      } else {
        document.getElementById('content').innerHTML = "No search results found.";
      }
    });
  });
  
  document.getElementById('summarize').addEventListener('click', async () => {
    const contentDiv = document.getElementById('content');
    // Use innerText so we send just the text without HTML tags.
    const textToSummarize = contentDiv.innerText || contentDiv.textContent;
    
    if (!textToSummarize || textToSummarize.trim() === "") {
      alert("No content to summarize.");
      return;
    }
    
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerText = "Summarizing...";
    
    const options = {
      method: 'POST',
      headers: {
        'apy-token': 'API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textToSummarize })
    };
    
    try {
      const response = await fetch('API_URL', options);
      if (!response.ok) {
        summaryDiv.innerText = "Error in summarization: " + response.statusText;
        return;
      }
      const data = await response.json();
      console.log("Summarization API response:", data);
      if (data.summary) {
        summaryDiv.innerText = "Summary: " + data.summary;
      } else if (data.data && data.data.summary) {
        summaryDiv.innerText = "Summary: " + data.data.summary;
      } else {
        summaryDiv.innerText = "No summary received.";
      }
    } catch (error) {
      summaryDiv.innerText = "Error: " + error.message;
    }
  });
  