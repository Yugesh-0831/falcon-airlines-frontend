# Flight Booking Frontend

This is the frontend application for the flight booking system. Users can book flights and receive real-time updates on their flight status.

## Features

- User-friendly interface for booking flights.
- Real-time updates on flight status.
- Notifications for flight updates.

## Tech Stack

- React.js
- Tailwind CSS
- Redux for state management
- Socket.IO for real-time updates

## Prerequisites

- Node.js (v12 or later)
- npm or yarn

## Getting Started

1. Clone the repository:
    ```sh
    git clone https://github.com/Yugesh-0831/indigo-hackathon-frontend.git
    cd indigo-hackathon-frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```sh
    npm start
    # or
    yarn start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Application Pages

### Login Page

- Users can log in using their email and password.
- Admins have separate credentials to access the admin panel.

<img width="1440" alt="Screenshot 2024-07-30 at 5 24 32 PM" src="https://github.com/user-attachments/assets/d30ccf0d-82d4-45e9-8243-28f08b54211a">


### Signup Page

- New users can create an account by providing their email, password, name, and phone number.

<img width="1440" alt="Screenshot 2024-07-30 at 5 24 53 PM" src="https://github.com/user-attachments/assets/c4c3743e-6c1e-44dd-bb36-9d4b5440dcc6">


### Flights Page

- Users can see all the available flights and book them.

<img width="1440" alt="Screenshot 2024-07-30 at 4 49 32 PM" src="https://github.com/user-attachments/assets/62da1a1e-23dc-491c-a29e-7a1d63778dea">


### My Flights Section

- Displays a list of flights booked by the user.
- Shows detailed information about each flight, including departure and arrival times and gates.

<img width="1440" alt="Screenshot 2024-07-30 at 4 49 58 PM" src="https://github.com/user-attachments/assets/c753f458-9362-433b-8998-42374ae9e43a">

- Provides real-time updates on the status of booked flights.

<img width="1440" alt="Screenshot 2024-07-30 at 4 50 24 PM" src="https://github.com/user-attachments/assets/c535be0e-ebc6-4826-93f7-0864253ab87d">


### Admin Panel

- Admins can view and manage flight details.
  
<img width="1440" alt="Screenshot 2024-07-30 at 4 49 32 PM" src="https://github.com/user-attachments/assets/977675b0-b220-4622-af77-df92e5db10f7">

- Allows admins to update flight information such as status, gates, and times.
- Sends notifications via email and SMS to users when flight details are updated.

<img width="1440" alt="Screenshot 2024-07-30 at 4 48 44 PM" src="https://github.com/user-attachments/assets/e1448439-b99f-4180-99ec-af732c5f464f">

