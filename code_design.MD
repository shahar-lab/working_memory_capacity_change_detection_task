The code starts with a dynamic css implementation of locations to insure that squares are customized for each participants' screen size. This part modifies the css file under css/myexp.css.

Then, images from the images folder attached to this repository are called and locations according to the css part are called. Mapping of key presses to responses is randomly assigned.

Then some functions are declared for further use.

Instructions block is then created, with a conditional part to ensure that participants understood everything.

Then, we start declaring variables for the practice part. Also notice the mouse is dissappearing in appropriate parts using the cursor-toggle command.
In the practice part there are trials in which only one square appears to confirm their understanding. They can continue in the task only if they have 100% success with one square. 

Then, similar variables for the test part and finally we create a procedure variable which creates a timeline for all the variables. We there put the number of repetitions as the number of trials we want.

To configure the number of trials, search for "repetitions" and update it according to the phase you wish to update.

The data is currently saved locally on the computer, but using a POST request it can be saved on a server.

