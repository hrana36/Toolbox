# YouTube & Facebook Video Downloader Design Spec

**Goal:** Integrate a client-side video and audio downloader tool under the "Media & Text Helpers" tab in the Cyber Deck Toolbox, supporting YouTube and Facebook URLs using a secure, open-source proxy API (Cobalt API).

## User Interface & Design
- **Location**: Add a new sub-tab named **VIDEO DOWNLOADER** (`video_dl`) alongside `yt`, `word`, and `case` under the "Media & Text Helpers" category.
- **Controls**:
  - URL input field with clear placeholders for YouTube and Facebook links.
  - Format selector toggle or radio buttons: Video (MP4) vs. Audio Only (MP3).
  - Quality selector dropdown (1080p, 720p, 480p, 360p, etc.).
  - Download trigger button that starts the process.
- **Feedback**:
  - Live progress messages (idle, processing, error, downloading).
  - Terminal-style visual alerts to warn about any API errors or network issues.

## Technical Integration
- **API Endpoint**: `https://api.cobalt.tools/api/json` via `fetch` POST request.
- **Request Body Payload**:
  ```json
  {
    "url": "user_input_url",
    "videoQuality": "1080",
    "isAudioOnly": false,
    "filenamePattern": "basic"
  }
  ```
- **Response Handling**:
  - Success returns a direct download URL:
    ```json
    {
      "status": "success",
      "url": "https://..."
    }
    ```
  - Open/download the file link directly in the browser by opening a new window or utilizing a download link element.
  - Error returns a JSON object with message details to display to the user.
