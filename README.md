# Task Management Application

This is a simple Task Management (To-Do List) application built using Node.js, Express.js, MongoDB, and Bootstrap for the frontend. It allows users to manage tasks by adding, editing, completing, categorizing, filtering, and deleting tasks. Users can also set due dates for tasks.

## Features

- **Task Creation**: Add tasks with a title, description, category, and optional due date.
- **Task Listing**: View a list of all tasks, with their categories and due dates.
- **Task Completion**: Mark tasks as completed.
- **Task Editing**: Edit task details including title, description, category, and due date.
- **Task Deletion**: Delete tasks.
- **Task Filtering**: Filter tasks by categories such as Work, Personal, Home, or Others.
- **Validation**: Prevent tasks from being marked complete more than once or created with an empty title.

## Bonus Features

- **Task Categories**: Tasks can be categorized into "Work", "Personal", "Home", and "Others".
- **Due Dates**: Tasks can have a due date for better time management.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (for data persistence)
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Database**: MongoDB (can be replaced with MySQL or other databases)
- **API**: RESTful API for task management
- **Validation**: Frontend and backend validation for task data

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org).
- **MongoDB**: You need to have MongoDB installed locally or use a cloud service like MongoDB Atlas.
  
### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ritik800024/task-manager.git
   cd task-manager
