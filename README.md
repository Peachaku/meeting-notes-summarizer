# Meeting Notes Summarizer

A lightweight React application that helps users summarize their meeting notes using AI. Built with TypeScript, React, and Tailwind CSS, this application provides a clean, responsive interface optimized for both desktop and tablet use.

## Features

- **Clean, Modern UI**: Built with Tailwind CSS for a professional look and feel
- **Responsive Design**: Optimized for both desktop and tablet screens
- **Real-time Character Count**: Track the length of your meeting notes
- **Loading States**: Visual feedback during processing
- **Error Handling**: Graceful error management for API calls
- **Clear Functionality**: Easy reset of input and results
- **Formatted Output**: Structured summary display with proper formatting

## Design Decisions

### Component Architecture
- **Modular Components**: Built with reusable, self-contained components
- **TypeScript Integration**: Strong typing for better development experience
- **State Management**: Clean state handling with React hooks

### Responsive Design
- **Tablet Optimization**:
  - Larger text areas and buttons for better touch interaction
  - Increased font sizes for improved readability
  - Optimized spacing and padding for tablet screens
  - Touch-friendly button sizes and spacing

- **Desktop Optimization**:
  - Maximum width constraints for better readability
  - Comfortable text area height
  - Efficient use of screen real estate
  - Clear visual hierarchy

### UI/UX Considerations
- Loading indicators for better user feedback
- Disabled states for buttons during processing
- Clear visual separation between input and output
- Consistent spacing and typography
- Focus states for better accessibility

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd meeting-notes-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Development

### Project Structure
```
src/
  ├── components/
  │   └── MeetingNotes.tsx    # Main meeting notes component
  ├── pages/
  │   └── Home.tsx           # Home page component
  ├── App.tsx                # Root component
  ├── main.tsx              # Entry point
  └── index.css             # Global styles
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Future Enhancements

- Integration with actual LLM API

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
