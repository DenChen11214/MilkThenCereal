# MilkThenCereal
# Dennis Chen, Bill Ni, Robin Han, Kevin Lin
P #04: Viz not to be confused with vis or vis-a-vis

## Project Description
Source: [Video Game Sales With Ratings](https://www.kaggle.com/rush4ratio/video-game-sales-with-ratings) .   
This dataset contains a list of video games with sales greater than 100,000 copies. There are fields such as the rank, genre, publisher, and sales in North America, Europe, Japan, and the rest of the world. This data set is sure to bring back some nostalgia, as it contains almost every game from the first ever Super Mario Bros to Fifa 15. It’ll be interesting to compare ratings and sales of some of your favorite games! 
## How We Aim to Make This Data Come Alive 
The data that will be shown without user interaction will consist of pie charts for the platforms, year of release, genres, publishers, and ESRB ratings(E.g. Everyone, Teen, Adults Only..etc) of the games. We plan to also have pie charts that the user can hover over to get a list of games by that publisher, genre, etc. When a game is hovered over, the critic scores and a bar graph of the game’s sales will be shown. We also plan to allow users to customize their own bar graphs to let them see the relationship between certain fields, like the sales in North America vs the platform of the game. Our visualizations will allow the user to explore questions that involve sales like: “How do the sales of this game in North America compare to the sales of the game in Europe?” or “What genre has, on average, the most amount of sales?” Questions that our data will provoke will most likely have to do with more abstract relationships between fields like whether or not scores given by users or metacritics have to do with how well a game sells and how games made in different eras compare with each other.
## D3 Feature Utilization
The user will first select the basic categorization of the pie chart similar to [this](http://bl.ocks.org/wizicer/f662a0b04425fc0f7489), which will subsequently divide the games into their respective subsection. Every time a new categorization is selected, the pie chart is regenerated. The user can then hover over one of the sections of the pie chart, which will highlight that specific section and make the others more transparent. The user can then hover over one of the games in that section, highlighting that specific game and making every other game in that section and other games in other sections more transparent as well. Hovering over a game will display specific info relating to that game such as the sales and its critic score.   
The user would also be allowed to click on the game, permanently highlighting the game and its section and fixing the specific info displayed in the bar graph. The user would then be able to hover over any other game in other sections and compare its specific data with the one already selected. The differences in the sales will be noticeable with different colored bars in the bar graph and the scores would be displayed separately for the user to see.  
After a user is done comparing or wishes to selected another game, he/she can press the reset button, which will highlight any of the previously selected games.  
## Sketch-up of Envisioned Visualization
![alt text](https://github.com/DenChen11214/MilkThenCereal/blob/master/diagram.jpg?raw=true)
## Launch Code
1. Clone the repository:

    ```
    $ git clone https://github.com/DenChen11214/MilkThenCereal.git
    ```
2. Create your virtual environment. Replace <VENV> with the name of your virtual environment
  
    ```
    $ python3 -m venv <VENV>
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
