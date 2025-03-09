document.getElementById('highlight').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value.trim();
    if (!keyword) {
      alert('Please enter a keyword.');
      return;
    }
    // Send a message to the active tab to highlight the keyword
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { keyword: keyword }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert("Error: " + chrome.runtime.lastError.message);
            return;
          }
          if (response && response.highlightedLines) {
            // Save the highlighted lines to storage for the new tab to read
            chrome.storage.local.set({ highlightedLines: response.highlightedLines }, () => {
              alert("Keyword highlighted on page. You can now open the lines.");
            });
          } else {
            alert("No lines found with the keyword.");
          }
        });
      }
    });
  });
  
  // Open new tab with highlighted lines
  document.getElementById('open').addEventListener('click', () => {
    chrome.storage.local.get("highlightedLines", (data) => {
      if (data.highlightedLines && data.highlightedLines.trim() !== "") {
        chrome.tabs.create({ url: chrome.runtime.getURL("newTab.html") });
      } else {
        alert("No highlighted content available. Please highlight first.");
      }
    });
  });
  