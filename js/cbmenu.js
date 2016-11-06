function CBMenu(){

  // The query will appear above the panels. The background-image of the panels will change
  // to the 'textures' of the panels.
  // setPanel stores the choice and increments the current panel if there is another panel
  // of options available.

  this.currentPanel = 1;
  this.panel1 = {
    query: "Who's your favorite eevee evolution?",
    options: [
        {
          value: "flareon",
          texture: "textures/questions/q1o1.gif",
          weight_values: {
            twink: 0,
            softboi: 0,
            fuckboi: 0,
            goth: 0,
            chubbie: 0
          }
        },
        {
          value: "jolteon",
          texture: "textures/questions/q1o2.gif",
          weight_values: {
            twink: 0,
            softboi: 0,
            fuckboi: 0,
            goth: 0,
            chubbie: 0
          }
        },
        {
          value: "vaporeon",
          texture: "textures/questions/q1o3.gif",
          weight_values: {
            twink: 0,
            softboi: 0,
            fuckboi: 0,
            goth: 0,
            chubbie: 0
          }
        },
        {
          value: "psyduck",
          texture: "textures/questions/q1o4.gif",
          weight_values: {
            twink: 0,
            softboi: 0,
            fuckboi: 0,
            goth: 0,
            chubbie: 0
          }
        }
      ]
  };

  // Stored choices have keys of choiceX in relation to the corresponding panel and value
  this.choices = {
    twink: 0,
    softboi: 0,
    fuckboi: 0,
    goth: 0,
    chubbie: 0
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

    var elm = document.getElementById("menu-question");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
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
    var bf_url = '';
    switch(bf){
      // Hands
      // Tufts
      // Shirts
      // Hairs
      // Eyebrows
      // Texts
      // Eyes
      // Body
      // bGImages
      
      case 'twink':
        // Two shirts, 3 hairs

        bf_url = 'results.html?q=' + secret_code;
        break;
      case 'softboi':
        // Two hairs
        bf_url = 'results.html?q=' + secret_code;
        break;
      case 'fuckboi':
        // Two hairs
        bf_url = 'results.html?q=' + secret_code;
        break;
      case 'goth':
        bf_url = 'results.html?q=' + secret_code;
        break;
      case 'chubbie':
        bf_url = 'results.html?q=' + secret_code;
        break;
      default:
        bf_url = 'index.html';
        break;
    }
    // For now, just loads the VR Pet with a random parameter
    $('#cbpet-body').show();
    $('#menu-body').remove();
    window.location = secret_code;
  };
  this.randomElement = function(array){
    return array[Math.floor(Math.random() * array.length)];
  };
  // Initialization
  this.setPanel(this.panel1);
  $('#menu-body').show();
  $('#cbpet-body').hide();
  $('.menu-option').click(this.clickPanel);
  


}