# Album Filters

This project is a web application that loads album data from a JSON file, displays it in a table, and allows the user to filter the data by artist, album name, or minimum rating. The assignment focuses on using **fetch**, **arrays**, **objects**, **templating**, and **form events** to manipulate the DOM.

---

## Overview

In this project:

- Album data is loaded from `albums.json`.
- Users can filter the albums using a search input and a minimum rating field.
- The table updates dynamically to show only the results that match the search criteria.
- Bonus functionality allows sorting albums by rating, reviews, and release date.

This assignment demonstrates my skills in working with **JavaScript**, **arrays**, **loops**, **objects**, **templating**, and the **fetch API**.

---

## Features

### 1. Data Fetching & Templating
- Async function fetches album data from `albums.json`.
- Original data is stored in a backup variable called `albumStore`.
- Uses display templating to dynamically render album rows in the table.
- Data is displayed in the correct section of the table.

### 2. Data Filtering
- Form with **submit event** triggers filtering functions.
- **Text search** filters albums by `album` and `artistName`, case-insensitive.
- **Number search** filters albums based on minimum rating.
- Results are rendered dynamically in the table.
- If no results are found, the app shows a “no results” message.

### 3. Bonus Features
- Click on table headers to sort albums by:
  - **Average rating** (highest → lowest)  
  - **Number of reviews** (highest → lowest)  
  - **Release date** (newest → oldest)

---

## Skills Used

- Fetch API (`fetch`)  
- Async/Await  
- Arrays and array methods (`filter`, `map`)  
- Objects and object properties  
- DOM manipulation and templating  
- Event handling for forms and table headers  
- Basic UI feedback for no search results  

---
