/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Ben Shaw
 * 
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
 export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    var $layout = $(`<div id="${hero.id}" class="column" style="padding:12px;margin:8px; height: 450px;float: left; width: 375px; background-color:${hero.backgroundColor};">`);
    $layout.append('<img src=' + hero.img + '>');
    $layout.append('<div name="name"   style="color:' + hero.color + ';">' + hero.name + '</div>');
    $layout.append('<div name="subtitle" style="font-style: italic;">"' + hero.subtitle + '"</div>');
    $layout.append('<div name="real name">Alter<span> </span>ego: ' + hero.first + ' ' + hero.last + '</div>');
    $layout.append('<p name="description">' + hero.description + '</p>');
    $layout.append(`<button class="edit" type="button" style="position:relative;">Edit</button>`);
    return $layout
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    //var $form=$(`<section id="${hero.id}">`);
    var $form=$('<div id="form">');
    var $formtop=$('<div id="top" class="column" style="float: left; width: 400px; background-color:'+hero.backgroundColor+';">');
    $formtop.append('<img src='+hero.img+ '>');
    var $formbot=$('<div id="bot" style="background-color: #F8F8FF;>');
    var $info=$('<form></form>');
    $info.append('Hero Name:<br><input type="text" name="herotname" value="'+hero.name+'"><br>')
    $info.append('First Name:<br><input type="text" name="firstname" value="'+hero.first+'"><br>')
    $info.append('Last Name:<br><input type="text" name="lastname" value="'+hero.last+'"><br>')
    $info.append('Subtitle Name:<br><input type="text" name="subtitle" value="'+hero.subtitle+'"><br>')
    $info.append('Description:<br><textarea name="message" style="width:200px;">'+hero.description+'</textarea><br>')
    $info.append('<button type="reset" value="Cancel">Cancel</button>')
    $info.append('<button type="submit" value="Save">Save</button>')  
    $formbot.append($info);
    $form.append($formtop);
    $formtop.append($info);
    return $form;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    //event.preventDefault();
    let block = event.target.parentNode
    $(`#${block.id}`).replaceWith(renderHeroEditForm(heroicData.find(a => a.id == block.id)))

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    //event.preventDefault();
    let block = event.target.parentNode.parentNode
    $(`#${block.id}`).replaceWith(renderHeroCard(heroicData.find(a => a.id == block.id)))
};



/**
 * Handles the JavaScript event representing a user clicking on the "submit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    let heroName = $('.hn').val();
    let firstName = $('.fn').val();
    let lastName = $('.ln').val();
    let newDescription = $('.des').val();
    let newSubtitle = $('.sub').val();
    let hero = event.target.parentNode.parentNode
    let newhero = heroicData.find(a => a.id == hero.id)
    //update data
    newhero.name = heroName;
    newhero.first = firstName;
    newhero.last = lastName;
    newhero.subtitle = newSubtitle;
    newhero.description = newDescription;
    newhero.firstSeen = new Date(newFirstSeen.getTime()+Math.abs(newFirstSeen.getTimezoneOffset()*60000));
    //replace the editform
    $(`#${hero.id}`).replaceWith(renderHeroCard(newhero))
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for (let i = 0; i < heroes.length; i++)
    {
        $root.append(renderHeroCard(heroes[i]));
    }
    $root.on('click', ".edit", function (e)
    {
        handleEditButtonPress(e);
        $(".cancel").on('click', function (event)
        {
            handleCancelButtonPress(event);
        });
        $(".submit").on('click', function (event)
        {
            handleEditFormSubmit(event);

        });
    });
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});