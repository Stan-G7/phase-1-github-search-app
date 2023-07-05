# GitHub Search App

This is a JavaScript application that allows you to search for GitHub users by name and display their repositories. It utilizes the GitHub API to fetch user and repository data.

## How to Use the App

1. Clone or download the project repository.

2. Open the `index.html` file in a web browser.

3. In the search input field, enter the name of the GitHub user you want to search for.

4. Click the "Submit" button or press Enter to initiate the search.

5. The application will retrieve the user information from the GitHub API and display it on the page. The displayed information includes the username, avatar, and a link to the user's profile.

6. To view the repositories of a specific user, click on their name in the search results.

7. The application will send a request to the GitHub API to fetch the repositories of the selected user and display them on the page.

8. You can search for different users by repeating steps 3 to 7.

## API Usage

The application uses the GitHub API to retrieve user and repository data. It utilizes the following endpoints:

- User Search Endpoint: <https://api.github.com/search/users?q={username}>
  - This endpoint searches for users based on the provided username.
  - Rate limit: 10 requests per minute.

- User Repos Endpoint: <https://api.github.com/users/{username}/repos>
  - This endpoint retrieves all public repositories for the specified user.
  - Rate limit: 60 requests per hour.

## Technologies Used

- HTML
- CSS
- JavaScript

## License

This project is licensed under the [MIT License](LICENSE).
