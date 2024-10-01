# Elemental Masters - Local File Setup

This README provides instructions on how to set up and use the local file structure for the Elemental Masters website. All files are stored under the `C:\Users\Mark\Website` folder, maintaining the same hierarchy previously used for S3.

## File Structure

```
C:\Users\Mark\Website\
│
├── data\
│   └── cards.json
│
├── images\
│   └── cards\
│       ├── water-elemental.png
│       ├── fire-spirit.png
│       └── ... (other card images)
│
└── ... (other website files and folders)
```

## Setup Instructions

1. Create the following folders if they don't already exist:
   - `C:\Users\Mark\Website\data`
   - `C:\Users\Mark\Website\images\cards`

2. Move your `cards.json` file to `C:\Users\Mark\Website\data\cards.json`.

3. Move all card images to `C:\Users\Mark\Website\images\cards\`.

4. Update your React components to use the new local file paths. For example:
   - Update image src attributes to use `/images/cards/[image-name].png`
   - Update data fetching to use `/data/cards.json`

## Usage in Code

When referencing files in your React components, use paths relative to the public folder. For example:

```javascript
// Fetching card data
fetch('/data/cards.json')
  .then(response => response.json())
  .then(data => {
    // Process the card data
  });

// Displaying a card image
<img src={`/images/cards/${card.image}`} alt={card.name} />
```

## Maintenance

- To add new cards, update the `C:\Users\Mark\Website\data\cards.json` file and add the corresponding images to `C:\Users\Mark\Website\images\cards\`.
- Ensure that all file names in `cards.json` match exactly with the image file names in the `cards` folder.

## Deployment

When deploying your website, ensure that the entire `C:\Users\Mark\Website` folder structure is copied to your web server's public directory.

Remember to update any server configurations or build scripts to reflect this new local file structure.