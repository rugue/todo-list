# Todo List App

A simple and efficient Todo List application built with React Native, Expo, and Redux.

## Features

- Add, toggle, and delete todos
- Filter todos by status (all, active, completed)
- Persist todos using AsyncStorage
- Clean and intuitive user interface

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/rugue/TodoListApp.git
   cd TodoListApp
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Running the App

To start the app, run the following command:

```
npx expo start
```

This will start the Metro bundler and provide you with options to run the app on an iOS simulator, Android emulator, or on your physical device using the Expo Go app.

## Project Structure

```
TodoListApp/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── src/
│   ├── store.ts
│   ├── features/
│   │   └── todoSlice.ts
│   └── screens/
│       └── MainScreen.tsx
├── babel.config.js
├── app.json
└── package.json
```

## Technologies Used

- React Native
- Expo
- Redux Toolkit
- AsyncStorage
- TypeScript

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/yourusername/TodoListApp/issues) if you want to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/rugue/TodoListApp](https://github.com/rugue/TodoListApp)
