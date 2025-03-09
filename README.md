# Keyword Highlighter and Formatter Extension

This Chrome extension searches the active webpage for a user-specified keyword, highlights all occurrences of the keyword in the visible text, and formats the matching snippets with contextual tag information. For example, if the keyword appears in an `<h1>` tag or within a hyperlink (`<a>` tag), the extension will display the snippet along with a note such as "in H1" or "as hyperlink". The results are stored and then displayed in a separate tab. An optional summarization feature allows you to send the collected text to an AI summarizer (via the ApyHub API) and display a summary.

## Features

- **Keyword Search:**  
  Enter a keyword via the extension popup to search for matching text on the active webpage.

- **Text Highlighting:**  
  Highlights the keyword within text nodes by wrapping each occurrence in a yellow `<span>`.

- **Contextual Tag Information:**  
  Displays the tag name (or "as hyperlink" for links) for each snippet that contains the keyword.

- **Clickable Hyperlinks:**  
  If the matching text is found within a hyperlink, the snippet is rendered as a clickable link that opens the target URL in a new tab.

- **Result Storage & Display:**  
  The extension stores the formatted HTML snippets in `chrome.storage` and displays them in a dedicated new tab.

- **Optional Summarization:**  
  Provides an optional "Summarize" button that sends the displayed text to an AI summarizer (via the ApyHub API) and shows a summary below the search results.

