
/*---------------------------------------------------- 
Squares game starts
------------------------------------------------------*/

var mapping = jsPsych.randomization.sampleWithoutReplacement(['sk', 'ks'], 1)[0]
/* getting the images to display */
var change_detection_images = ['images/squares/black.png', 'images/squares/blue.png', 'images/squares/brown.png', 'images/squares/cyan.png', 'images/squares/green.png', 'images/squares/magenta.png', 'images/squares/orange.png', 'images/squares/red.png', 'images/squares/yellow.png']
/* setting the locations to randomize from */
var locations = ["<img class='a' src=", "<img class='b' src=", "<img class='c' src=", "<img class='d' src=", "<img class='e' src=", "<img class='f' src=", "<img class='g' src=", "<img class='h' src=", "<img class='i' src=", "<img class='j' src=", "<img class='k' src=", "<img class='l' src=",]
var locations_setsize1 = ["<img class='upper1' src=", "<img class='upper2' src=", "<img class='upper3' src=", "<img class='lower1' src=", "<img class='lower2' src=", "<img class='lower3' src="]

/* functions for squares game */

//This function decides on a random location for the test square
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//This function picks squares to show
function get_squares(images, number_of_images) {
    return jsPsych.randomization.sampleWithoutReplacement(change_detection_images, number_of_images)
}
/*This function picks the locations in which it will be shown 
 It also takes care of randomizing the different quadrants   */
function get_locations(locations_arr, number_of_images, locations_arr1) {
    random_locations = [];
    if (number_of_images == 1) {
        return jsPsych.randomization.sampleWithoutReplacement(locations_arr1, 1)
    }
    for (var i = 0; i < 4; i++) {
        random_2_locations = jsPsych.randomization.sampleWithoutReplacement(locations_arr.slice(i * 3, i * 3 + 3), 2)
        random_locations.push(random_2_locations[0])
        if (number_of_images > 4) {
            random_locations.push(random_2_locations[1])
        }
    }
    return random_locations
}
/*This function combines the squares and the locations that were randomly chosen */
function generate_random_squares(condition) {
    number_of_images = parseInt(condition[0])
    change_detection_images = jsPsych.randomization.shuffle(change_detection_images)
    current_locations = get_locations(locations, number_of_images, locations_setsize1)
    squares = '';
    for (index = 0; index < number_of_images; index++) {
        squares += current_locations[index] + change_detection_images[index] + ">"
    }
    return squares + fixation;
}
var condition_squares_exp = jsPsych.randomization.sampleWithoutReplacement(['4same', '4diff', '8same', '8diff'], 1)[0]
var fixation = '<div class="fixation">+</div>'

/*---------------------------------------------------- 
Timeline for squares starts
------------------------------------------------------*/

/*---------------------------------------------------- 
Start instructions variabels
------------------------------------------------------*/
var instructions_squares = {
    type: "instructions",
    pages: ["The experiment will have two parts, we will now start the first one, called the <b>'squares game'</b>.",
        "We will now provide instructions regarding the squares game. <b>Please read them carefully.</b>",
        "Feel free to go back and forth between the screens using the arrows (left=previous, right=next) or the buttons at the bottom of the screen."
        , "At the end of the instructions, <b>we will ask you to complete a short test about them</b>, to make sure everything is well understood."
        , "In this part of the experiment, you will see a plus in the middle of the screen." +
        "<p> We want you to focus on the plus during the whole experiment.</p> " + "<img src='images/fixation.png'>",
        "<p> Then, 4 or 8 colored squares will appear on the screen. You need to remember the colors of all of the squares.</p>" +
        "<img src='images/squares/example1.png'>",
        "<p> Right afterward, the squares will disappear and instead, one square will show up in a place where one of the squares was previously displayed.</p>" +
        "<p> Your goal is to identify whether this square is in the same or different color as the one previously displayed in this location.</p>" +
        "<p> You need to press <b>'" + mapping[0] + "'</b> if you think the color is the same as in the group picture.</p>" +
        "<img src='images/squares/example2.png'>",
        "<p> You need to press <b>'" + mapping[1] + "'</b> if you think the color is different than in the group picture.</p>" +
        "<img src='images/squares/example3.png'>", "<p> We will now ask you to complete a short test to make sure that you understood the instructions."],
    show_clickable_nav: true,
};

var Q1_square_options = ["2 or 4", "4 or 8", "4 or 6"];
var Q2_square_options = ["True", "False"];
var Q3_square_options = ["Click on it", "Press the LEFT or RIGHT arrow keys", "Press the ‘S’ or ‘K’ key with your LEFT or RIGHT hand."];
var Q4_square_options = ["The goal is to remember the color of each of the squares", "I need to read the instructions again"];
var Q5_square_options = ["On the squares to remember their colors", "On the single square to remember its color",];

var instructions_test_squares = {
    type: 'survey-multi-choice',
    questions: [
        { prompt: "How many squares will be initially shown?", name: 'set_size', correct: '4 or 8', options: Q1_square_options, required: true },
        { prompt: "The single square will appear after the squares will disappear ", name: 'steps', correct: 'True', options: Q2_square_options, required: true },
        { prompt: "How do you choose if a square is same or different?", name: 'choose_square', correct: 'Press the ‘S’ or ‘K’ key with your LEFT or RIGHT hand.', options: Q3_square_options, required: true },
        { prompt: "What is your goal?", name: 'goal', correct: 'The goal is to remember the color of each of the squares', options: Q4_square_options, required: true },
        { prompt: "What should you focus on?", name: 'focus', correct: 'On the squares to remember their colors', options: Q5_square_options, required: true },
    ],
    data: { trial_name: 'test_squares' }
};

var if_trial_squares = {
    type: 'html-button-response',
    stimulus: "<p>Sorry. You made a mistake.<br>"
        + "Let’s go back to the instructions. "
        + "Please read them carefully before submitting your answers. <br>"
        + "Thank you!",
    choices: ['Back to instructions']
}
var to_repeat_squares;
var check_answers = {
    timeline: [if_trial_squares],
    conditional_function: function () {
        // get the data from the previous trial,
        // and check which key was pressed
        to_repeat_squares = false;
        var responses_to_test_square = JSON.parse(jsPsych.data.get().filter({ trial_type: 'survey-multi-choice' }).last(1).select('responses').values[0])
        for (i = 0; i < instructions_test_squares.questions.length; i++) {
            current_name = instructions_test_squares.questions[i].name;
            current_correct = instructions_test_squares.questions[i].correct
            if (current_correct != responses_to_test_square[current_name]) {
                to_repeat_squares = true;
                return to_repeat_squares
            }
            else {
                to_repeat_squares = false;
            }
        }
        return to_repeat_squares
    }
}

var instructions_squares_loop = {
    timeline: [instructions_squares, instructions_test_squares, check_answers],
    loop_function: function () {
        if (to_repeat_squares == true) {
            return true;
        } else {
            return false;
        }
    }
}
/*---------------------------------------------------- 
Start practice part
------------------------------------------------------*/
var current_squares_practice_trial = 0;
var current_locations = null; // set up a global variable 
var condition_squares_practice = jsPsych.randomization.sampleWithoutReplacement(['1same', '1diff'], 1)[0] //this makes sure that the subject will have at least one set_size1 trial in practice
var start_practice_squares = {
    type: 'html-keyboard-response',
    stimulus: "<p> We will now start some practice trials.<br> You may already want to be ready with your fingers on '<b>s'</b> and <b>'k'</b>. <br><img class=keyboard src='images/keyboard.png'> <br> <u>Please try to be as accurate as possible for the experiment to succeed.</u> <br><br><b>Press any key to begin</b></u>",
    post_trial_gap: 1000,
    on_finish: function () { document.querySelector('head').insertAdjacentHTML('beforeend', '<style id="cursor-toggle"> html { cursor: none; } </style>') },
}

var fixation_memory = {
    type: 'html-keyboard-response',
    stimulus: fixation,
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
}

var memory_practice = {
    type: "html-keyboard-response",
    stimulus: function () { return generate_random_squares(condition_squares_practice) },
    choices: jsPsych.NO_KEYS,
    trial_duration: 200,
    data: {
        phase: 'practice', trial_name: 'memory', trial_num: function () { return current_squares_practice_trial },
        set_size: function () {
            return condition_squares_practice[0]
        }
    }
}

var fixation_retention = {
    type: 'html-keyboard-response',
    stimulus: fixation,
    choices: jsPsych.NO_KEYS,
    trial_duration: 900
}

var test_practice = {
    type: "html-keyboard-response",
    stimulus: function () {
        rand_num = getRandomInt(number_of_images - 1)
        if (condition_squares_practice[1] == 's') { /* it is the same condition */
            square = current_locations[rand_num] + change_detection_images[rand_num] + ">"
        }
        else { /* it is different condition */
            square = current_locations[rand_num] + jsPsych.randomization.sampleWithoutReplacement(change_detection_images.slice(number_of_images), 1) + ">"
        }
        return square + fixation
    },
    choices: ['s', 'k'],
    trial_duration: 6000,
    data: {
        phase: 'practice', trial_name: 'test', trial_num: function () { return current_squares_practice_trial },
        correct_response: function () {
            if (condition_squares_practice[1] == 's') { //it is same condition
                key_press_num = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(mapping[0])

            }
            else {
                key_press_num = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(mapping[1])
            }
            return key_press_num
        },
        set_size: function () {
            return condition_squares_practice[0]
        }
    },
    on_finish: function (data) {
        condition_squares_practice = jsPsych.randomization.sampleWithoutReplacement(['1same', '1diff', '4same', '4diff', '8same', '8diff'], 1)[0] //now everything could be
        var correct = false;
        if (data.correct_response == data.key_press) {
            correct = true;
        }
        else if (data.key_press == null) {
            correct = null;
        }
        data.is_correct = correct;
        current_squares_practice_trial += 1;
    }
}

var feedback_squares = {
    type: 'html-keyboard-response',
    stimulus: function () {
        feedback_text = 'incorrect'
        last_trial_correct = jsPsych.data.getLastTrialData().values()[0].is_correct;
        if (last_trial_correct == true) {
            feedback_text = 'correct'
        }
        else if (last_trial_correct == null) {
            feedback_text = 'Please respond faster'
        }
        return feedback_text
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 500
}

var demo_procedure_squares = {
    timeline: [fixation_memory, memory_practice, fixation_retention, test_practice, feedback_squares],
    repetitions: 3 //3.5sec per trial*15 =52.5sec
}

var if_trial_practice_squares = {
    on_start: function () {
        if (document.querySelector('#cursor-toggle') != null) {
            document.querySelector('#cursor-toggle').remove()
        }
    },
    type: 'html-button-response',
    stimulus: "<p>Sorry. You made too many mistakes.<br>"
        + "Let’s do the practice session once again. <br>"
        + "Thank you!",
    choices: ['Back to practice']
}
var to_repeat_practice_squares;
var check_accuracy = {
    timeline: [if_trial_practice_squares],
    conditional_function: function () {
        /* Get the data from the previous trial,and calculate accuracy
           If the participant wasn't perfect in the trials with set_size 1 - we will repeat.*/
        to_repeat_practice_squares = false;
        var correct_prac_square = jsPsych.data.getLastTimelineData().filter({ phase: 'practice', trial_name: 'test', set_size: '1' }).select('is_correct').sum()
        var total_prac_square = jsPsych.data.getLastTimelineData().filter({ phase: 'practice', trial_name: 'test', set_size: '1' }).select('is_correct').count()
        var prac_square_accuracy = correct_prac_square / total_prac_square;
        if (prac_square_accuracy != 1) {
            to_repeat_practice_squares = true;
            return to_repeat_practice_squares
        }
        else {
            to_repeat_practice_squares = false;
        }
        return to_repeat_practice_squares
    }
}

var practice_squares_loop = {
    timeline: [start_practice_squares, demo_procedure_squares, check_accuracy],
    loop_function: function () {
        if (to_repeat_practice_squares == true) {
            return true;
        } else {
            return false;
        }
    }
}
/*Start exp part of squares game*/
var start_exp_squares = {
    type: 'html-keyboard-response',
    stimulus: '<p>Good Job! <br> You have finished the practice trials.<br> We will now start the real experiment. Please try to be as accurate as possible. <br> <br> <b> Press any key to begin</p>'
};

var current_squares_exp_trial = 0;

var memory = {
    type: "html-keyboard-response",
    stimulus: function () { return generate_random_squares(condition_squares_exp) },
    choices: jsPsych.NO_KEYS,
    trial_duration: 200,
    data: {
        phase: 'exp', trial_name: 'memory', trial_num: function () { return current_squares_exp_trial }
    }
}

var test = {
    type: "html-keyboard-response",
    stimulus: function () {
        rand_num = getRandomInt(number_of_images - 1)
        if (condition_squares_exp[1] == 's') { /* it is the same condition */
            square = current_locations[rand_num] + change_detection_images[rand_num] + ">"
        }
        else { /* it is different condition */
            square = current_locations[rand_num] + jsPsych.randomization.sampleWithoutReplacement(change_detection_images.slice(number_of_images), 1) + ">"
        }
        return square + fixation
    },
    choices: ['s', 'k'],
    trial_duration: 6000,
    data: {
        phase: 'exp', trial_name: 'test', mapping: mapping, trial_num: function () { return current_squares_exp_trial },
        correct_response: function () {
            if (condition_squares_exp[1] == 's') { //it is same condition
                key_press_num = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(mapping[0])
            }
            else {
                key_press_num = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(mapping[1])
            }
            return key_press_num
        },
        set_size: function () {
            return condition_squares_exp[0]
        },
        condition: function () {
            return condition_squares_exp[1]
        }
    },

    on_finish: function (data) {
        condition_squares_exp = jsPsych.randomization.sampleWithoutReplacement(['4same', '4diff', '8same', '8diff'], 1)[0]
        var correct = false;
        if (data.correct_response == data.key_press) {
            correct = true;
        }
        else if (data.key_press == null) {
            correct = null;
        }
        data.is_correct = correct;
        current_squares_exp_trial += 1;
    }
}

var test_procedure_squares = {
    timeline: [fixation_memory, memory, fixation_retention, test, feedback_squares],
    repetitions: 2 //3.5sec per trial per 120 trials= 420sec
}

var full_procedure_squares = {
    timeline: [instructions_squares_loop, practice_squares_loop, start_exp_squares, test_procedure_squares]
} //instructions takes 60sec total
timeline.push(full_procedure_squares)
