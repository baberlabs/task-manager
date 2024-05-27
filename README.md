# Task Management Application

This React-based Task Management Application allows users to efficiently manage their tasks. Users can add new tasks, edit existing ones, mark tasks as completed or incomplete, and delete tasks. The application leverages local storage to persist tasks between sessions.

## Features

- **Add New Tasks**: Easily add new tasks to your to-do list.
- **Edit Tasks**: Modify the details of existing tasks.
- **Mark as Done**: Mark tasks as completed.
- **Undo Completed Tasks**: Move tasks back to the to-do list.
- **Delete Tasks**: Remove tasks permanently.
- **Persistent Storage**: Tasks are saved in local storage to maintain state across browser sessions.

## Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-management-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd task-management-app
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to access the application.

## Application Structure

- **src/App.jsx**: The main component containing the core logic for task management.
- **src/assets/icons/**: Directory containing icon assets used throughout the application.

## Components

### `App`

The `App` component is the primary component responsible for managing the application's state and rendering the user interface. It includes state hooks and handler functions for various operations such as adding, editing, completing, and deleting tasks.

### `TaskItem`

The `TaskItem` component renders individual tasks and their associated controls. It handles interactions such as editing, completing, undoing, and deleting tasks through a menu interface.

## State Management

The application uses React's `useState` and `useEffect` hooks for state management:

- **`items`**: State for the to-do tasks.
- **`completedItems`**: State for the completed tasks.
- **`inputValue`**: State for the current value of the task input field.
- **`activeMenuIndex`**: State for the active menu index in the to-do list.
- **`activeCompletedMenuIndex`**: State for the active menu index in the completed list.
- **`editIndex`**: State for the index of the task being edited.
- **`editValue`**: State for the value of the task being edited.

## Local Storage

The application uses the browser's local storage to persist tasks between sessions. Tasks are stored under two keys:

- **`currentItems`**: Stores the to-do tasks.
- **`currentCompletedItems`**: Stores the completed tasks.

## Accessibility

The application includes several accessibility features to enhance usability:

- **ARIA Labels**: Descriptive labels for buttons and editable fields to assist screen reader users.
- **Keyboard Navigation**: All interactive elements are accessible via keyboard.

## Contributing

We welcome contributions to enhance the functionality and user experience of this application. To contribute:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**.
4. **Commit your changes**:

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Icons used in this project are sourced from reputable icon libraries.
