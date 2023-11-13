```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note left of browser: Event handler prevents reloading, adds a new note to the list, renders it and sends it to the server
    activate server
    server-->>browser: HTML 302 redirect
    deactivate server
```
