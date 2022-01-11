The code saves the following relevant variables:

phase (practice/test) - whether it is a train or a test block **please use block_type**

trial_name (memory/test) - whether it is the memory array part or the test part of the task **please use trial_type**

set_size (4/8) - number of shown squares in the memory array

correct_response (83/75) - 83 if the correct response is "s" and 75 if it was "k"

rt - response time

trial_num - specific for practice/test blocks **please use trial**

keypress - (83/75) - whether the subject pressed "s" or "k" respectively

is_correct (0/1) - did the subject pressed the correct keypress **please use accuracy**

stimulus - png of the pictures used in the memory array or in the test square (depending on trial_name).

stimulus (color) - colors of the squares can be derived from the three first letters of the stimulus (contact me for an implementation in R)

stimulus (location (a-l) - locations of the squares can be derived from the class part of the stimulus. There were 12 different locations, three in each quartile of the screen - across the diagonal.

condition (s/d) - whether the test square was in the same square or a different color - s=same, d=different. **please use correct_response**
