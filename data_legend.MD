<h2> Congrats on finishing running your experiment ;) </h2>

The csv output contains a row for every change in the stimulus shown to the subject. Therefore, we start by filtering the rows we are interested in, using the block type and the trial name. For example, to find the responses for the test square in the experiment part: block_type == exp and trial_name==test_squares.

The code saves the following relevant variables:

**block_type** (practice/exp) - whether it is a train or a test block 

**trial_name** (memory/test) - whether it is the memory array part or the test part of the task 

**set_size** (4/8) - number of shown squares in the memory array

**correct_response** (83/75) - 83 if the correct response is "s" and 75 if it was "k"

**rt (ms)** - response time

**trial_num** - specific for practice/test blocks 

**key_press** - (83/75) - whether the subject pressed "s" or "k" respectively

**accuracy** (TRUE/FALSE) - did the subject press the correct keypress 

**stimulus** - png of the pictures used in the memory array or in the test square (depending on trial_name). 

For example, the stimulus of the test_square may look like this: 
<img class='c' src=images/squares/blue.png><div class="fixation">+</div>
It means that a blue square appeared in location "c", along side a fixation plus.

stimulus (color) - colors of the squares can be derived from the three first letters (blu) by sub_stringing the.

stimulus (location (a-l) - locations of the squares can be derived from the class part of the stimulus. There were 12 different locations, three in each quartile of the screen - across the diagonal.

**condition** (s/d) - whether the test square was in the same square or a different color - s=same, d=different.
