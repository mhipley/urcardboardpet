// Code for running the core functionality of URCardboardPet
// All functions are called in the script block at the end of index.html

function init() {
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('cbpet-body');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(-30, 25, 0);

  // scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  THREE.ImageUtils.crossOrigin = '';

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);


  var light = new THREE.HemisphereLight(0x777777, 0x94E4FF, 1);
  scene.add(light);

  // var texture = THREE.ImageUtils.loadTexture(
  //   'textures/patterns/checker.png'
  // );
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat = new THREE.Vector2(50, 50);
  // texture.anisotropy = renderer.getMaxAnisotropy();

  // var material = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   specular: 0xffffff,
  //   shininess: 20,
  //   shading: THREE.FlatShading,
  //   map: texture
  // });

  // var geometry = new THREE.PlaneGeometry(1000, 1000);

  // var mesh = new THREE.Mesh(geometry, material);
  // mesh.rotation.x = -Math.PI / 2;
  // scene.add(mesh);

  if(location.search){
    var images = imagesFromUrl(location.search.split("?q=")[1]);
  } else {
    var images = imagesFromUrl();
  }

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);

  function imagesFromUrl(data){
    // return an object with all the approriate images. For random, include all

    // For presentation, need to add new elements on the end of each array.
    // Twink
    // body: 0 hands: 2 hairs: 2,3,4 shirts: 0,1
    // Softboi
    // body: 1 hands: 3 hairs: 0,1 shirts: 2
    // Fuckboi
    // body: 2 hands: 4 hairs: 0,1 shirts: 3
    // Goth
    // body: 3 hands: 5 hairs: None shirts: 4 
    // Chubbie
    // body: 4 hands: 6 hairs: None shirts: 5
    var hands = ["./textures/hands/hand1.png","./textures/hands/hand2.png","./textures/hands/twink_hand.png","./textures/hands/softboi_hand.png","./textures/hands/fuckboi_hand.png","./textures/hands/goth_hand.png","./textures/hands/chubbie_hand.png"];
    var shirts = ["./textures/shirts/twink_shirt_01.png","./textures/shirts/twink_shirt_02.png","./textures/shirts/softboi_shirt.png","./textures/shirts/fuckboi_shirt.png","./textures/shirts/goth_shirt.png","./textures/shirts/chubbie_shirt.png"];
    var hairs = ["./textures/hair/boi_hair_01.png","./textures/hair/boi_hair_02.png","./textures/hair/twink_hair_01.png","./textures/hair/twink_hair_02.png","./textures/hair/twink_hair_03.png"];
    var texts = ["./textures/text/text1.png","./textures/text/text2.png","./textures/text/text3.png","./textures/text/text4.png"];
    var body = ["./textures/body/twink_body.png","./textures/body/softboi_body.png","./textures/body/fuckboi_body.png","./textures/body/goth_body.png","./textures/body/chubbie_body.png"];
    var bGImages = ["./textures/backgrounds/background1.png","./textures/backgrounds/background2.png"];
    
    if(typeof data == "undefined"){
      return {
        hands: hands,
        shirts: shirts,
        hairs: hairs,
        texts: texts,
        body: body,
        bGImages: bGImages
      }
    }
    try {
      var images =  {
        hands: [hands[data.charCodeAt(0) - 97]],
        shirts: [shirts[data.charCodeAt(1) - 97]],
        hairs: [hairs[data.charCodeAt(2) - 97]],
        texts: [texts[data.charCodeAt(3) - 97]],
        body: [body[data.charCodeAt(4) - 97]],
        bGImages: [bGImages[data.charCodeAt(5) - 97]]
      };
      for(var key in images){
        if(typeof images[key][0] == "undefined"){
          images[key] = eval(key);
        }
      }
      return images;
    } catch(e){
      return imagesFromUrl();
    }
  }

  function createSceneElement(textureArray, width, height, widthSegment, heightSegment, rotation, x, y, z){
    
    // try and catch for no texture. some models don't have hair
    try {
      var texture = textureArray[Math.floor(Math.random() * textureArray.length)];
    } catch(e){
      return;
    }
    var sceneGeometry = new THREE.PlaneGeometry(width, height, widthSegment, heightSegment);
    var mesh = new THREE.MeshBasicMaterial();
    mesh.map = new THREE.ImageUtils.loadTexture(texture);
    mesh.transparent = true;
    mesh.side = THREE.DoubleSide;
    mesh.depthWrite = false;

    var sceneMesh = new THREE.Mesh(sceneGeometry, mesh);
    sceneMesh.position.set(x, y, z);
    sceneMesh.rotation.y = rotation;
    return sceneMesh;
  }

  // PLANTS START
  var plants = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var plantWidth = 43.1, plantHeight = 72.3, plantWidthS = 1, plantHeightS = 100;

  // First plant (Front row left)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (Math.PI / 2),
      10,
      (plantHeight / 2 - 3),
      (plantWidth / 2 - 60)
    ));
  // Second plant (Front row right)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (- Math.PI / 2),
      10,
      (plantHeight / 2 - 5),
      (plantWidth / 2 + 10)
    ));
  // Third plant (Front row middle)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (- Math.PI / 2),
      30,
      (plantHeight / 2),
      (plantWidth / 2 - 10)
    ));
  // Fourth plant (Mid row Left)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (Math.PI / 2),
      60,
      (plantHeight / 2 + 20),
      (plantWidth / 2 - 70)
    ));
  // Fifth plant (Back row left)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (Math.PI / 2),
      70,
      (plantHeight / 2 - 3),
      (plantWidth / 2 - 60)
    ));
  // Sixth plant (Middle row right)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (- Math.PI / 2),
      80,
      (plantHeight / 2 - 5),
      (plantWidth / 2 + 10)
    ));
  // Seventh plant (Middle row middle)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (- Math.PI / 2),
      90,
      (plantHeight / 2),
      (plantWidth / 2 - 3)
    ));
  // Eighth plant (Middle row left)
  scene.add(createSceneElement(
      plants,
      plantWidth,
      plantHeight,
      plantWidthS,
      plantHeightS,
      (Math.PI / 2),
      90,
      (plantHeight / 2 + 20),
      (plantWidth / 2 - 70)
    ));  
  // PLANTS END

  var handWidth = 39.0, handHeight = 59.6, handWidthS = 1, handHeightS = 100;
  var hand = createSceneElement(
      images.hands,
      handWidth,
      handHeight,
      handWidthS,
      handHeightS,
      (- Math.PI / 2),
      30,
      (handHeight / 2 - 5),
      (handWidth / 2 - 46)
    );
  hand.name = "hand";
  scene.add(hand);

  // var tuftWidth = 20, tuftHeight = 17.2, tuftWidthS =1, tuftHeightS = 100;
  // scene.add(createSceneElement(
  //     images.tufts,
  //     tuftWidth,
  //     tuftHeight,
  //     tuftWidthS,
  //     tuftHeightS,
  //     (Math.PI / 2),
  //     90,
  //     (tuftHeight / 2 + 20),
  //     (tuftWidth / 2 - 70)
  //   ));  

  var shirtWidth = 57.5, shirtHeight = 30.1, shirtWidthS = 1, shirtHeightS = 100;
  var shirt = createSceneElement(
      images.shirts,
      shirtWidth,
      shirtHeight,
      shirtWidthS,
      shirtHeightS,
      (-Math.PI / 2),
      40,
      (shirtHeight / 2 + 3),
      (shirtWidth / 2 - 30)
    );
  scene.add(shirt);


  // Reticle
  var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.01);
  var material = new THREE.MeshNormalMaterial();
  var reticle = new THREE.Mesh(geometry, material);
  
  // Position reticle mesh
  reticle.position.x = 0;
  reticle.position.y = 0;
  reticle.position.z = -10;
  
  camera.add(reticle);

  var hairWidth = 36.8, hairHeight = 35.5, hairWidthS =1, hairHeightS = 100;
  scene.add(createSceneElement(
      images.hairs,
      hairWidth,
      hairHeight,
      hairWidthS,
      hairHeightS,
      (- Math.PI / 2),
      35,
      (hairHeight / 2 + 45),
      (hairWidth / 2 - 23.5)
    ));  


  // var eyebrowsWidth = 20.9, eyebrowsHeight = 2.6, eyebrowsWidthS = 1, eyebrowsHeightS = 100;
  // scene.add(createSceneElement(
  //     images.eyebrows,
  //     eyebrowsWidth,
  //     eyebrowsHeight,
  //     eyebrowsWidthS,
  //     eyebrowsHeightS,
  //     (- Math.PI / 2),
  //     40,
  //     (eyebrowsHeight / 2 + 54.5),
  //     (eyebrowsWidth / 2 - 14.1)
  //   ));  


  // var eyesWidth = 19.2, eyesHeight = 3.5, eyesWidthS =1, eyesHeightS = 100;
  // scene.add(createSceneElement(
  //     images.eyes,
  //     eyesWidth,
  //     eyesHeight,
  //     eyesWidthS,
  //     eyesHeightS,
  //     (- Math.PI / 2),
  //     40,
  //     (eyesHeight / 2 + 52),
  //     (eyesWidth / 2 - 13.1)
  //   ));  


  var bodyWidth = 54.3, bodyHeight = 70.9, bodyWidthS =1, bodyHeightS = 100;
  scene.add(createSceneElement(
      images.body,
      bodyWidth,
      bodyHeight,
      bodyWidthS,
      bodyHeightS,
      (- Math.PI / 2),
      50,
      (bodyHeight / 2 + 5),
      (bodyWidth / 2 - 26.7)
    ));  

  var text_img = images.texts[Math.floor(Math.random() * images.texts.length)];

  var text_cyl = new THREE.CylinderGeometry( 90, 90, 30, 32, 20, true );
  var text_mat = new THREE.MeshBasicMaterial();
  text_mat.map = new THREE.ImageUtils.loadTexture(
    text_img);
  text_mat.transparent = true;
  text_mat.side = THREE.BackSide;
  text_mat.depthWrite = false;
  var text_spin = new THREE.Mesh( text_cyl, text_mat );
  text_spin.position.set(50, -40, 0);
  text_spin.name = "textSpin";

  scene.add( text_spin );

  var skybox_sides_geo = new THREE.CylinderGeometry( 100, 100, 400, 32 );
  var skybox_cap_geo = new THREE.Geometry();
  var r = 100.0;
  for (var i = 0; i < 100; i++) {
    var a = i * 1/100 * Math.PI * 2;
    var z = Math.sin(a);
    var x = Math.cos(a);
    var a1 = (i+1) * 1/100 * Math.PI * 2;
    var z1 = Math.sin(a1);
    var x1 = Math.cos(a1);
    skybox_cap_geo.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x*r, 0, z*r),
      new THREE.Vector3(x1*r, 0, z1*r)
    );
    skybox_cap_geo.faceVertexUvs[0].push([
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(x/2+0.5, z/2+0.5),
      new THREE.Vector2(x1/2+0.5, z1/2+0.5)
    ]);
    skybox_cap_geo.faces.push(new THREE.Face3(i*3, i*3+1, i*3+2));
  }
  // skybox_cap_geo.computeCentroids();
  // skybox_cap_geo.computeFaceNormals();
  var bG = images.bGImages[Math.floor(Math.random() * images.bGImages.length)];
  var skybox_sides_texture = new THREE.ImageUtils.loadTexture(bG);
  // var skybox_cap_texture =
  //   THREE.ImageUtils.loadTexture("textures/patterns/skybox_top.png");
  // var skybox_bottom_texture =
  //   THREE.ImageUtils.loadTexture("textures/patterns/skybox_bottom.png");

  var skybox_sides_mat = new THREE.MeshBasicMaterial({map:skybox_sides_texture, side: THREE.BackSide});
  var skybox_sides = new THREE.Mesh( skybox_sides_geo, skybox_sides_mat );

  var skybox_cap_mat = new THREE.MeshBasicMaterial( {color: 0x3a3d6d, side: THREE.BackSide} );
  var skybox_bot_mat = new THREE.MeshBasicMaterial( {color: 0x3a3d6d, side: THREE.BackSide} );
  var skybox_cap_top = new THREE.Mesh( skybox_cap_geo, skybox_cap_mat );
  var skybox_cap_bottom = new THREE.Mesh( skybox_cap_geo, skybox_bot_mat );
  skybox_cap_top.position.y = 190;
  skybox_cap_bottom.position.y = -190;
  skybox_cap_top.rotation.x = Math.PI;

  var skybox = new THREE.Object3D();
  skybox.add(skybox_sides);
  skybox.add(skybox_cap_top);
  skybox.add(skybox_cap_bottom);
  skybox.position.set(50, 0, 0);
  skybox.rotation.y = - Math.PI / 2;
  scene.add( skybox );


  // create the particle variables
  function createParticleElements(){

  }
  var particleCountA = 30,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20,
      map: THREE.ImageUtils.loadTexture("./textures/petals/petal1.png"),
      transparent: true
    });
  particleCountA.name = "particleCountA";

  // now create the individual particles
  for (var p = 0; p < particleCountA; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      // create a velocity vector
    particle.velocity = new THREE.Vector3(
      0,        // x
      -Math.random(), // y
      0);       // z
    // add it to the geometry
    particles.vertices.push(particle);
  }

  var particleSystemA = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemA.sortParticles = true;
  particleSystemA.name = "particleSystemA";

  scene.add(particleSystemA);


  // PARTICLE SYSTEM B
  var particleCountB = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal2.png"
    ),
    transparent: true
  });
  particleCountB.name = "particleCountB";

  for (var p = 0; p < particleCountB; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

    particle.velocity = new THREE.Vector3(0, (- Math.random()), 0);
    particles.vertices.push(particle);
  }

  var particleSystemB = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemB.sortParticles = true;
  particleSystemB.name = "particleSystemB";

  scene.add(particleSystemB);

  //END PARTICLE SYSTEM B

  // PARTICLE SYSTEM C
  var particleCountC = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal3.png"
    ),
    transparent: true
  });
  particleCountC.name = "particleCountC";

  for (var p = 0; p < particleCountC; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
    particles.vertices.push(particle);
  }

  var particleSystemC = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemC.sortParticles = true;
  particleSystemC.name = "particleSystemC";

  scene.add(particleSystemC);

  //END PARTICLE SYSTEM C

  // PARTICLE SYSTEM D
  var particleCountD = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal4.png"
    ),
    transparent: true
  });
  particleCountD.name = "particleCountD";

  for (var p = 0; p < particleCountD; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
    particles.vertices.push(particle);
  }

  var particleSystemD = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemD.sortParticles = true;
  particleSystemD.name = "particleSystemD";

  scene.add(particleSystemD);

  //END PARTICLE SYSTEM D

  // PARTICLE SYSTEM E
  var particleCountE = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal5.png"
    ),
    transparent: true
  });
  particleCountE.name = "particleCountE";

  for (var p = 0; p < particleCountE; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
    particles.vertices.push(particle);
  }

  var particleSystemE = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemE.sortParticles = true;
  particleSystemE.name = "particleSystemE";

  scene.add(particleSystemE);

  //END PARTICLE SYSTEM E

  // PARTICLE SYSTEM F
  var particleCountF = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal6.png"
    ),
    transparent: true
  });
  particleCountF.name = "particleCountF";

  for (var p = 0; p < particleCountF; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
    particles.vertices.push(particle);
  }

  var particleSystemF = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemF.sortParticles = true;
  particleSystemF.name = "particleSystemF";

  scene.add(particleSystemF);

  //END PARTICLE SYSTEM F

  // PARTICLE SYSTEM G
  var particleCountG = 30,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 20,
    map: THREE.ImageUtils.loadTexture(
      "./textures/petals/petal7.png"
    ),
    transparent: true
  });
  particleCountG.name = "particleCountG";

  for (var p = 0; p < particleCountG; p++) {

    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
    particles.vertices.push(particle);
  }

  var particleSystemG = new THREE.ParticleSystem(
      particles,
      pMaterial);

  particleSystemG.sortParticles = true;
  particleSystemG.name = "particleSystemG";

  scene.add(particleSystemG);

  //END PARTICLE SYSTEM G
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {

  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}


// function rotateHand () {
//   var hand = scene.getObjectByName("hand");
//   hand.rotation.z = Math.PI / 8;

// }

function render(dt) {
    // rotateHand();
  var particleSystemA = scene.getObjectByName( "particleSystemA" );
  var particleCountA = scene.getObjectByName( "particleCountA" );

  // add some rotation to the system
  particleSystemA.rotation.x += 0.01;
  
  var pCount = particleCountA;
  while(pCount--) {
    // get the particle
    var particle = particles.vertices[pCount];
    
    // check if we need to reset
    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }
    
    // update the velocity
    particle.velocity.x -= Math.random() * .1;
    
    // and the position
    particle.position.addSelf(
      particle.velocity);
  }
  
  // flag to the particle system that we've
  // changed its vertices. This is the
  // dirty little secret.
  particleSystemA.geometry.__dirtyVertices = true;

  //PARTICLE ANIMATION

  var particleSystemB = scene.getObjectByName( "particleSystemB" );
  var particleCountB = scene.getObjectByName( "particleCountB" );

  particleSystemB.rotation.x -= 0.01;
      
  var pCount = particleCountB;
  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;

    particle.position.addSelf(
      particle.velocity);
  }
  
  particleSystemB.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION

  //PARTICLE ANIMATION C

  var particleSystemC = scene.getObjectByName( "particleSystemC" );
  var particleCountC = scene.getObjectByName( "particleCountC" );

  particleSystemC.rotation.x -= 0.01;
      
  var pCount = particleCountC;
  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;

    particle.position.addSelf(particle.velocity);
  }

  particleSystemC.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION C

  //PARTICLE ANIMATION D

  var particleSystemD = scene.getObjectByName( "particleSystemD" );
  var particleCountD = scene.getObjectByName( "particleCountD" );

  particleSystemD.rotation.x -= 0.01;
      
  var pCount = particleCountD;
  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;

    particle.position.addSelf(
      particle.velocity);
  }

  particleSystemD.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION D

  //PARTICLE ANIMATION E

  var particleSystemE = scene.getObjectByName( "particleSystemE" );
  var particleCountE = scene.getObjectByName( "particleCountE" );

  particleSystemE.rotation.x -= 0.01;
      
  var pCount = particleCountE;
  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;

    particle.position.addSelf(
      particle.velocity);
  }

  particleSystemE.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION E

  //PARTICLE ANIMATION F

  var particleSystemF = scene.getObjectByName( "particleSystemF" );
  var particleCountF = scene.getObjectByName( "particleCountF" );

  particleSystemF.rotation.x -= 0.01;
      
  var pCount = particleCountF;
  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;

    particle.position.addSelf(particle.velocity);
  }
      
  particleSystemF.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION F

  //PARTICLE ANIMATION G

  var particleSystemG = scene.getObjectByName( "particleSystemG" );
  var particleCountG = scene.getObjectByName( "particleCountG" );

  particleSystemG.rotation.x -= 0.01;
      
  var pCount = particleCountG;

  while(pCount--) {
    var particle = particles.vertices[pCount];

    if(particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    particle.velocity.x -= Math.random() * .1;
    particle.position.addSelf(particle.velocity);
  }
    
  particleSystemG.geometry.__dirtyVertices = true;

  //END PARTICLE ANIMATION G

  var timer = Date.now() * 0.0001;
  var timer2 = Date.now() * 0.001;

  var hand = scene.getObjectByName("hand");
  //hand.rotation.z = timer * Math.PI / 8;
  hand.rotation.z = Math.sin(timer2) / 2 + Math.PI / 8;

  var object = scene.getObjectByName( "textSpin" );

  object.rotation.y = timer * 5;

  var period = 2000;
  effect.render(scene, camera);
}


function animate(t) {
  requestAnimationFrame(animate);
  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}



