document.getElementById('highlight').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value.trim();
    if (!keyword) {
      alert("Please enter a keyword.");
      return;
    }
    
    // Send the keyword to the active tab's content script.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { keyword: keyword }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          alert("Error: " + chrome.runtime.lastError.message);
          return;
        }
        if (response && response.highlightedResults && response.highlightedResults.trim() !== "") {
          // Save the formatted results in chrome storage.
          chrome.storage.local.set({ highlightedLines: response.highlightedResults }, () => {
            alert("Search results saved. You can now open the results.");
          });
        } else {
          alert("No matching content found.");
        }
      });
    });
  });
  
  // Open a new tab to display the results.
  document.getElementById('open').addEventListener('click', () => {
    chrome.storage.local.get("highlightedLines", (result) => {
      if (result.highlightedLines && result.highlightedLines.trim() !== "") {
        chrome.tabs.create({ url: chrome.runtime.getURL("newTab.html") });
      } else {
        alert("No search results available. Please perform a search first.");
      }
    });
  });
  