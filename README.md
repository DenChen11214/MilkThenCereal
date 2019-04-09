# MilkThenCereal
# Dennis Chen, Bill Ni, Robin Han, Kevin Lin
P #04: Viz not to be confused with vis or vis-a-vis

## Project Description
Source: [Video Game Sales With Ratings](https://www.kaggle.com/rush4ratio/video-game-sales-with-ratings) .   
This dataset contains a list of video games with sales greater than 100,000 copies. There are fields such as the rank, genre, publisher, and sales in North America, Europe, Japan, and the rest of the world. This data set is sure to bring back some nostalgia, as it contains almost every game from the first ever Super Mario Bros to Fifa 15. It’ll be interesting to compare ratings and sales of some of your favorite games! 
## How We Aim to Make This Data Come Alive 
The data that will be shown will be a pie chart of gaming platforms, genres, etc and examples of games from those platforms. When a slice of the pie chart is clicked, a list of the games relating to that slice will be shown on the side. We also plan to allow users to customize their own bar graphs to let them see the relationship between certain fields, like the sales in North America vs the platform of the game. Our visualizations will allow the user to explore questions that involve sales like: “How do the sales of this platform in North America compare to the sales of the platoform in Europe?” or “What genre has, on average, the most amount of sales?” Questions that our data will provoke will most likely have to do with more abstract relationships between fields like whether or not scores given by users or metacritics have to do with how well a game sells and how games made in different eras compare with each other.
## D3 Feature Utilization
The user will first select the basic categorization of the pie chart similar to [this](http://bl.ocks.org/wizicer/f662a0b04425fc0f7489), which will subsequently divide the games into their respective subsection. Every time a new categorization is selected, the pie chart is regenerated. The user can then hover over one of the sections of the pie chart, which will highlight that specific section and make the others more transparent. A list of games relating to that section will then be shown on the side.
The user will be able to click a button to swap between the pie chart and the bar graph. The bar graph is created using d3 and has a customizable x-axis. Choosing a different category for the x-axis will generate a new graph.
After a user is done with the pie chart, he/she can press the center button, which will reset the pie chart
## Sketch-up of Envisioned Visualization
![alt text](https://github.com/DenChen11214/MilkThenCereal/blob/master/diagram.jpg?raw=true)
## Launch Code
1. Clone the repository:

    ```
    $ git clone https://github.com/DenChen11214/MilkThenCereal.git
    ```
2. Create your virtual environment. Replace VENV with the name of your virtual environment
  
    ```
    $ python3 -m venv VENV
    ```
3. Activate the virtual environment by typing ```$ . PATH_TO_VENV/bin/activate``` in the terminal. Make sure you are in the directory which contains the virtual environment. To check, type in ```ls``` to get a current listing of the files in your current working directory.  

4. Install the dependencies with [requirements.txt](requirements.txt) by running the following command  

    ```
    pip install -r requirements.txt
    ```
5. Change into the repo (```cd MilkThenCereal```)and run the python file by typing ```$ python app.py``` in the terminal.
6. If successful, the following message will appear in the terminal:
```
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
* Restarting with stat
* Debugger is active!
* Debugger PIN: 248-748-502
```
7. Open your web browser and open localhost:5000
