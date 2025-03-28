# Virtual Memory Simulation

This project simulates the working of three popular page replacement algorithms used in virtual memory management: **LRU (Least Recently Used)**, **Optimal**, and **FIFO (First In First Out)**. The simulation allows users to input a reference string and the number of frames, and it then computes the number of page faults for each algorithm, displaying the best algorithm based on page fault count. The results are also visualized on a bar chart.

## Features

- Simulate three page replacement algorithms: **LRU**, **Optimal**, and **FIFO**.
- Input a reference string (sequence of memory accesses) and the number of frames (physical memory).
- Real-time display of page fault counts for each algorithm.
- Visual representation of page faults using a bar chart.
- Displays the best-performing algorithm based on the minimum page faults.

## How It Works

### 1. **LRU (Least Recently Used)** Algorithm:
   - This algorithm replaces the page that has not been used for the longest period of time.
   - The page replacement process keeps track of the order in which pages were accessed and evicts the least recently used page when a page fault occurs.
   
### 2. **Optimal** Algorithm:
   - The Optimal algorithm replaces the page that will not be used for the longest period in the future.
   - While this algorithm requires knowledge of future page accesses (which is impractical in real systems), it is used as a benchmark for comparing the efficiency of other algorithms.
   
### 3. **FIFO (First In First Out)** Algorithm:
   - This algorithm evicts the oldest page (the first one that was loaded into memory).
   - It follows a simple queue-like approach, with pages being added and removed based on their order of arrival.

## Installation and Setup

To run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/anugrahthomas/virtual-memory-management.git
    cd virtual-memory-management
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The app will be running on [http://localhost:5173](http://localhost:5173).

## Dependencies

- `react`: A JavaScript library for building user interfaces.
- `react-hot-toast`: A library to display notifications.
- `chart.js`: A charting library to visualize data in a bar chart.
- `react-chartjs-2`: A React wrapper for Chart.js.

## Code Explanation

### React Components:

- **App Component**: The main component of the application. It holds the state for user input (reference string and number of frames), the simulation results, and the chart data.
  - **State Variables**:
    - `numFrames`: Stores the number of frames entered by the user.
    - `referenceString`: Stores the reference string entered by the user.
    - `pageFaultsData`: Stores the page fault counts for each algorithm.
    - `bestAlgorithm`: Stores the name of the algorithm that resulted in the fewest page faults.
    - `chartData`: Stores the data to display the page faults in a bar chart.

- **Algorithms**: The project implements the following algorithms for page replacement:
  - **LRU (Least Recently Used)**: This algorithm tracks the order of page accesses and replaces the least recently used page.
  - **Optimal**: Replaces the page that will not be used for the longest period in the future.
  - **FIFO (First In First Out)**: Replaces the oldest page that was loaded into memory.

### Example Simulation:

1. Enter a reference string (e.g., `1 2 3 4 5 1 2 3 4`).
2. Enter the number of frames (e.g., `3`).
3. Click "Run Simulation" to compute and display the page faults for each algorithm.
4. View the results in a bar chart, with each algorithm's page faults shown, and see which algorithm performed the best.


## Conclusion

This project demonstrates how different page replacement algorithms perform in terms of minimizing page faults. It is a useful tool for understanding the impact of these algorithms on memory management in operating systems.

## Contributing

Feel free to fork the repository and submit pull requests if you would like to contribute improvements or fixes to the project.


## Authors

- Shivansh
- Anugrah
- Kunal
