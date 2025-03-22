# Elemental Card Gallery

A showcase for the Elekin card game, featuring card browsing, deck building, and game mechanics.

## Setting Up Email Subscription Feature

To enable the email subscription feature, you need to set up the `subscribers` table in your Supabase project:

1. Navigate to your Supabase project dashboard.
2. Select the SQL Editor tab.
3. Create a new query and paste the contents of the `src/db/setup-subscribers-table.sql` file.
4. Run the query to create the table and necessary policies.

Alternatively, you can run this command using the Supabase CLI:

```bash
supabase db execute < src/db/setup-subscribers-table.sql
```

## Features

- Browse elemental cards and their details
- View featured cards of the week
- Join the newsletter to stay updated on game launches
- Responsive design for all devices

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Tech Stack

- React
- Next.js
- Tailwind CSS
- Framer Motion
- Supabase

## Local Setup

1. Install prerequisites:
   - Git: https://git-scm.com/downloads
   - Node.js: https://nodejs.org/en/download/

2. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-name]
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Prepare your local storage:
   - Place your Excel file (ElementalMastersCards.xlsx) in the `storage` folder at the root of your project.
   - Create a `storage/images/cards` folder and place all your card images there.

5. Convert Excel data to JSON:
   ```
   node src/utils/excelToJson.js
   ```
   This will create a `cards.json` file in the `storage` folder.

6. Start the development server:
   ```
   npm run dev
   ```

7. Open your browser and visit `http://localhost:5173`

## File Structure

```
[your-project-name]/
│
├── storage/
│   ├── ElementalMastersCards.xlsx
│   ├── cards.json
│   └── images/
│       └── cards/
│           ├── card1.jpg
│           ├── card2.jpg
│           └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── ...
│
└── ... (other project files)
```

## Updating Card Data

1. Update your Excel file in the `storage` folder.
2. Run the conversion script:
   ```
   node src/utils/excelToJson.js
   ```
3. Restart your development server if it's running.

## Adding New Card Images

1. Add new card images to the `storage/images/cards` folder.
2. Update your Excel file with the new card information.
3. Run the conversion script as described above.

Remember to keep your local `storage` folder up to date and in sync with your Excel data.