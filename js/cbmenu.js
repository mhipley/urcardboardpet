function CBMenu(){

  // The query will appear above the panels. The background-image of the panels will change
  // to the 'textures' of the panels.
  // setPanel stores the choice and increments the current panel if there is another panel
  // of options available.

  this.currentPanel = 1;
  this.panel1 = {
    query: "What is this example question?1",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "shirt",
          texture: "textures/shirt.png",
          weight_values: {
            jock: 2,
            goth: 5,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "zz",
          texture: "textures/zz.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "tuft",
          texture: "textures/tuft.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        }
      ]
  };
  this.panel2 = {
    query: "What is this example question?2",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png",
          weight_values: {
            jock: 5,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "shirt",
          texture: "textures/shirt.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "zz",
          texture: "textures/zz.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        },
        {
          value: "tuft",
          texture: "textures/tuft.png",
          weight_values: {
            jock: 2,
            goth: 1,
            nerd: 3,
            prep: -2
          }
        }
      ]
  };
  // Stored choices have keys of choiceX in relation to the corresponding panel and value
  this.choices = {
    jock: 0,
    goth: 0,
    nerd: 0,
    prep: 0
  };

  this.clickPanel = function(){
    // Store choice
    var dataValue = $(this).attr('data-value');
    var filterOptions = function(value){
      return function(option){
        return option.value == dataValue;
      }
    }
    var weights = Menu['panel' + Menu.currentPanel].options.filter(filterOptions(dataValue))[0].weight_values;
    var weightKeys = Object.keys(weights);
    for(var i = 0; i < weightKeys.length; i++){
      Menu.choices[weightKeys[i]] += weights[weightKeys[i]];
    }
    // Set-up next set of choices
    Menu.currentPanel += 1;
    if(typeof Menu['panel' + Menu.currentPanel] == "undefined"){
      // Exit and set-up Cardboard Pet
      Menu.complete();
    } else {
      Menu.setPanel(Menu['panel' + Menu.currentPanel]);
    }
  }
  this.setPanel = function(panelData){
    var menuOptions = $('.menu-option');
    $('#menu-question').text(panelData.query);
    for(var i = 0; i < 4; i++){
      $(menuOptions[i])
        .css('background-image', 'url('+ panelData.options[i].texture + ')')
        .attr('data-value',panelData.options[i].value);
    }
  }
  this.complete = function(){
    // Take the choices and create a url for the Pet
    // Logic to determine choices and corresponding url values will need some work
    var choices = this.choices;
    var bf = Object.keys(choices).reduce(function(a, b){ 
      return choices[a] > choices[b] ? a : b;
    });
    var secret_code = '';

    switch(bf){
      case 'nerd':
        secret_code = 'results.html?q=abcd';
        break;
      default:
        secret_code = 'index.html';
        break;
    }
    // For now, just loads the VR Pet with a random parameter
    $('#cbpet-body').show();
    $('#menu-body').remove();
    window.location = secret_code;
  };

  // Initialization
  this.setPanel(this.panel1);
  $('#menu-body').show();
  $('#cbpet-body').hide();
  $('.menu-option').click(this.clickPanel);
}