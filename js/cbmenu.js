function CBMenu(){

  // The query will appear above the panels. The background-image of the panels will change
  // to the 'textures' of the panels.
  // setPanel stores the choice and increments the current panel if there is another panel
  // of options available.

  this.currentPanel = 1;
  this.panel1 = {
    query: "What is this example question?",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png"
        },
        {
          value: "shirt",
          texture: "textures/shirt.png"
        },
        {
          value: "zz",
          texture: "textures/zz.png"
        },
        {
          value: "tuft",
          texture: "textures/tuft.png"
        }
      ]
  };
  this.panel2 = {
    query: "What is this example question?",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png"
        },
        {
          value: "shirt",
          texture: "textures/shirt.png"
        },
        {
          value: "zz",
          texture: "textures/zz.png"
        },
        {
          value: "tuft",
          texture: "textures/tuft.png"
        }
      ]
  };
  this.panel3 = {
    query: "What is this example question?",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png"
        },
        {
          value: "shirt",
          texture: "textures/shirt.png"
        },
        {
          value: "zz",
          texture: "textures/zz.png"
        },
        {
          value: "tuft",
          texture: "textures/tuft.png"
        }
      ]
  };
  this.panel4 = {
    query: "What is this example question?",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png"
        },
        {
          value: "shirt",
          texture: "textures/shirt.png"
        },
        {
          value: "zz",
          texture: "textures/zz.png"
        },
        {
          value: "tuft",
          texture: "textures/tuft.png"
        }
      ]
  };
  this.panel5 = {
    query: "What is this example question?",
    options: [
        {
          value: "hand",
          texture: "textures/hand.png"
        },
        {
          value: "shirt",
          texture: "textures/shirt.png"
        },
        {
          value: "zz",
          texture: "textures/zz.png"
        },
        {
          value: "tuft",
          texture: "textures/tuft.png"
        }
      ]
  };
  // Stored choices have keys of choiceX in relation to the corresponding panel and value
  this.choices = {};

  this.clickPanel = function(){
    // Store choice
    Menu.choices['choice' + Menu.currentPanel] = $(this).attr('data-value');

    // Set-up next set of choices
    Menu.currentPanel += 1;
    if(typeof Menu['panel' + Menu.currentPanel] == "undefined"){
      // Exit and set-up Cardboard Pet
      Menu.complete();
    }
    Menu.setPanel(Menu['panel' + Menu.currentPanel]);
  }
  this.setPanel = function(panelData){
    var menuOptions = $('.menu-option');
    for(var i = 0; i < 4; i++){
      $(menuOptions[i])
        .css('background-image', 'url('+ panelData.options[i].texture + ')')
        .attr('data-value',panelData.options[i].value);
    }
  }
  this.complete = function(){
    // Take the choices and create a url for the Pet
    debugger;
  };

  // Initialization
  this.setPanel(this.panel1);
  $('.menu-option').click(this.clickPanel);
}