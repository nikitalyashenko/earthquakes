# 🌍 Global Catalog of Earthquakes

Welcome to the **Global Catalog of Earthquakes** app! This application provides features to import and analyze global earthquake data. Let's get started!

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:
- Node.js
- Docker
- pnpm

### Steps

1. Copy the example environment variables:
   ```sh
   cp ./env.example ./.env
   ```

2. Start the database for local development:
   ```sh
   docker-compose up
   ```

3. Install the required modules:
   ```sh
   pnpm i
   ```

4. Run the server:
   ```bash
   pnpm run start
   ```

5. Run database migrations to set up the schemas:
   ```bash
   pnpm run migration:run
   ```

## 📊 Importing Data

To import earthquake data, use the following mutation with the correct dataset URL:

```graphql
mutation ImportEarthquakes($fileUrl: String!) {
  importEarthquakes(fileUrl: $fileUrl)
}
```

Dataset URL: [earthquakes1970-2014.csv](https://data.humdata.org/dataset/4881d82b-ba63-4515-b748-c364f3d05b42/resource/10ac8776-5141-494b-b3cd-bf7764b2f964/download/earthquakes1970-2014.csv)

🎉 Now you have a fully working development environment!

## 🗄️ Migrations

For database migrations, use the following commands:

- Generate a migration file if you've made changes to your entities or related types:
  ```sh
  pnpm run migration:generate
  ```

- Run unprocessed migrations:
  ```sh
  pnpm run migration:run
  ```

- You dont need it)):
  ```sh
  migration:revert
  ```

## 🧹 Code Validation

Ensure your code adheres to the project's standards with these commands:

- Check code format:
  ```sh
  pnpm run check-format
  ```

- Check types:
  ```sh
  pnpm run check-types
  ```

- Fix all file styles:
  ```sh
  pnpm run format
  ```

- Lint all files:
  ```sh
  pnpm run lint
  ```

## 🔜 Next Steps

I'm having a lot of fun with this project 
I'd like to improve a lot of things here, but I'm very short on time!
Here are a few ideas:

- Split data into different tables and set up relations & indexes
- Implement vector search
- Connect Metabase and display nice charts
- Improve the importing process to create an import record in the database with ID, file name, and file hash sum, with a relation to each record
- Rewrite all in Rust xD

---

Made with ❤️ by Nikita Lyashenko
