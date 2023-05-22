# AdventureAlbum App

AdventureAlbum App is the back-end part of the AdventureAlbum web application. It provides the server-side logic and API endpoints required for user authentication, managing vacations, locations, adventures, and media uploads.

## Installation

To run the AdventureAlbum App locally, follow these steps:

1. Clone the repository:

```bash
    git clone https://github.com/TylerLampel/AdventureAlbum.git
```

2. Navigate to the app directory:

```bash
    cd AdventureAlbum/app
```

3. Install dependencies:

```bash
    bundle install
```

4. Set up the database:

- AdventureAlbum App uses a PostgreSQL database. Make sure you have PostgreSQL installed and running.

- Create a new PostgreSQL database.

- Set the database connection configuration in the `/config/environments` file.

5. Run database migrations:

```bash
    rails db:migrate
```

6. Start the development server:

```bash
rails server
```

7. The AdventureAlbum App API will be accessible at http://localhost:3000.

## Technologies Used

- Ruby on Rails: A web application framework written in Ruby.

- PostgreSQL: A powerful, open-source relational database management system.

- ActiveStorage: A file attachment and uploading library provided by Ruby on Rails.

## Contributing

Contributions to the AdventureAlbum App are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.
