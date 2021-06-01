
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites
- Node v14.16.1
- npm v7.9.0
- Git Bash
- Postgresql

### Installation
1. Fork the repo and Clone your fork
   ```sh
   git clone https://github.com/gabriel-son/test-assessment.git
   ```
2. Sync your fork using this guide
   ```sh
   https://docs.github.com/en/github/collaborating-with-pull-requests/working-with-forks/syncing-a-fork
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Change the line endings for project files by running the following commands sequentially
   ```sh
   git config --local core.autocrlf input
   ```
   ```sh
   git rm --cached -r . 
   ```
   ```sh
   git reset --hard 
   ```
5. Create an environment variable file with the following command
    ```sh
   touch .env 
   ```
6. Make sure your Postgresql server is running and proceed to create a database of your choose. Proceed to pick your database name, username and password to create a connection    string in the .env file.
7. Run the following in your terminal to create the database schema.
     ```sh
   sequelize db:migrate 
   ```
9. Run the project `npm run dev`
