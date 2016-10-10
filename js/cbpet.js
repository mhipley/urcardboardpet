// Code for running the core functionality of URCardboardPet
// All functions are called in the script block at the end of index.html

function init() {
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('example');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(-30, 25, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

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

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);

  // PLANTS

  var pA_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pA = pA_images[Math.floor(Math.random() * pA_images.length)];

  var plantA_w = 43.1, plantA_h = 72.3, plantA_w_s =1, plantA_h_s = 100;
  var plantA_geometry = new THREE.PlaneGeometry( plantA_w, plantA_h, plantA_w_s, plantA_h_s );
  //var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

  var plantA_mat = new THREE.MeshBasicMaterial();
  plantA_mat.map = new THREE.ImageUtils.loadTexture(
    pA);
  plantA_mat.transparent = true;
  plantA_mat.side = THREE.DoubleSide;
  plantA_mat.depthWrite = false;
  // mat.color = new THREE.Color(0xff0000);
  // for(var i=0; i<geometry.vertices.length/2; i++) {
  //     geometry.vertices[2*i].position.z = Math.pow(2, i/20);
  //     geometry.vertices[2*i+1].position.z = Math.pow(2, i/20);
  // }
  var plantA = new THREE.Mesh( plantA_geometry, plantA_mat );

  plantA.position.set( 10, plantA_h / 2 - 3, plantA_w / 2 - 60);
  plantA.rotation.y =  Math.PI / 2;
  scene.add( plantA )


  var pB_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pB = pB_images[Math.floor(Math.random() * pB_images.length)];


  var plantB_w = 43.1, plantB_h = 72.3, plantB_w_s =1, plantB_h_s = 100;
  var plantB_geometry = new THREE.PlaneGeometry( plantB_w, plantB_h, plantB_w_s, plantB_h_s );

  var plantB_mat = new THREE.MeshBasicMaterial();
  plantB_mat.map = new THREE.ImageUtils.loadTexture(
    pB);
  plantB_mat.transparent = true;
  plantB_mat.side = THREE.DoubleSide;
  plantB_mat.depthWrite = false;

  var plantB = new THREE.Mesh( plantB_geometry, plantB_mat );

  plantB.position.set( 10, plantB_h / 2 - 5, plantB_w / 2 + 10);
  plantB.rotation.y = - Math.PI / 2;
  scene.add( plantB );


  var pC_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pC = pC_images[Math.floor(Math.random() * pC_images.length)];

  var plantC_w = 43.1, plantC_h = 72.3, plantC_w_s =1, plantC_h_s = 100;
  var plantC_geometry = new THREE.PlaneGeometry( plantC_w, plantC_h, plantC_w_s, plantC_h_s );

  var plantC_mat = new THREE.MeshBasicMaterial();
  plantC_mat.map = new THREE.ImageUtils.loadTexture(
    pC);
  plantC_mat.transparent = true;
  plantC_mat.side = THREE.DoubleSide;
  plantC_mat.depthWrite = false;

  var plantC = new THREE.Mesh( plantC_geometry, plantC_mat );

  plantC.position.set( 30, plantC_h / 2, plantC_w / 2 - 3 );
  plantC.rotation.y = - Math.PI / 2;
  scene.add( plantC );


  var pD_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pD = pD_images[Math.floor(Math.random() * pD_images.length)];

  var plantD_w = 43.1, plantD_h = 72.3, plantD_w_s =1, plantD_h_s = 100;
  var plantD_geometry = new THREE.PlaneGeometry( plantD_w, plantD_h, plantD_w_s, plantD_h_s );

  var plantD_mat = new THREE.MeshBasicMaterial();
  plantD_mat.map = new THREE.ImageUtils.loadTexture(
    pD);
  plantD_mat.transparent = true;
  plantD_mat.side = THREE.DoubleSide;
  plantD_mat.depthWrite = false;

  var plantD = new THREE.Mesh( plantD_geometry, plantD_mat );

  plantD.position.set( 60, plantD_h / 2 + 20 , plantD_w / 2 - 70);
  plantD.rotation.y =  Math.PI / 2;
  scene.add( plantD )

  var pE_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pE = pE_images[Math.floor(Math.random() * pE_images.length)];

  var plantE_w = 43.1, plantE_h = 72.3, plantE_w_s =1, plantE_h_s = 100;
  var plantE_geometry = new THREE.PlaneGeometry( plantE_w, plantE_h, plantE_w_s, plantE_h_s );

  var plantE_mat = new THREE.MeshBasicMaterial();
  plantE_mat.map = new THREE.ImageUtils.loadTexture(
    pE);
  plantE_mat.transparent = true;
  plantE_mat.side = THREE.DoubleSide;
  plantE_mat.depthWrite = false;
  var plantE = new THREE.Mesh( plantE_geometry, plantE_mat );

  plantE.position.set( 70, plantE_h / 2 - 3, plantE_w / 2 - 60);
  plantE.rotation.y =  Math.PI / 2;
  scene.add( plantE )


  var pF_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pF = pF_images[Math.floor(Math.random() * pF_images.length)];


  var plantF_w = 43.1, plantF_h = 72.3, plantF_w_s =1, plantF_h_s = 100;
  var plantF_geometry = new THREE.PlaneGeometry( plantF_w, plantF_h, plantF_w_s, plantF_h_s );

  var plantF_mat = new THREE.MeshBasicMaterial();
  plantF_mat.map = new THREE.ImageUtils.loadTexture(
    pF);
  plantF_mat.transparent = true;
  plantF_mat.side = THREE.DoubleSide;
  plantF_mat.depthWrite = false;

  var plantF = new THREE.Mesh( plantF_geometry, plantF_mat );

  plantF.position.set( 80, plantF_h / 2 - 5, plantF_w / 2 + 10);
  plantF.rotation.y = - Math.PI / 2;
  scene.add( plantF );


  var pG_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pG = pG_images[Math.floor(Math.random() * pG_images.length)];

  var plantG_w = 43.1, plantG_h = 72.3, plantG_w_s =1, plantG_h_s = 100;
  var plantG_geometry = new THREE.PlaneGeometry( plantG_w, plantG_h, plantG_w_s, plantG_h_s );

  var plantG_mat = new THREE.MeshBasicMaterial();
  plantG_mat.map = new THREE.ImageUtils.loadTexture(
    pG);
  plantG_mat.transparent = true;
  plantG_mat.side = THREE.DoubleSide;
  plantG_mat.depthWrite = false;

  var plantG = new THREE.Mesh( plantG_geometry, plantG_mat );

  plantG.position.set( 90, plantG_h / 2, plantG_w / 2 - 3 );
  plantG.rotation.y = - Math.PI / 2;
  scene.add( plantG );


  var pH_images = ["./textures/plants/plant1.png","./textures/plants/plant2.png","./textures/plants/plant3.png","./textures/plants/plant4.png"];
  var pH = pH_images[Math.floor(Math.random() * pH_images.length)];

  var plantH_w = 43.1, plantH_h = 72.3, plantH_w_s =1, plantH_h_s = 100;
  var plantH_geometry = new THREE.PlaneGeometry( plantH_w, plantH_h, plantH_w_s, plantH_h_s );

  var plantH_mat = new THREE.MeshBasicMaterial();
  plantH_mat.map = new THREE.ImageUtils.loadTexture(
    pH);
  plantH_mat.transparent = true;
  plantH_mat.side = THREE.DoubleSide;
  plantH_mat.depthWrite = false;

  var plantH = new THREE.Mesh( plantH_geometry, plantH_mat );

  plantH.position.set( 90, plantH_h / 2 + 20 , plantH_w / 2 - 70);
  plantH.rotation.y =  Math.PI / 2;
  scene.add( plantH )


  //END PLANTS




  var hand_images = ["./textures/hands/hand1.png","./textures/hands/hand2.png"];
  var hand_img = hand_images[Math.floor(Math.random() * hand_images.length)];

  var hand_w = 39.0, hand_h = 59.6, hand_w_s =1, hand_h_s = 100;
  var hand_geometry = new THREE.PlaneGeometry( hand_w, hand_h, hand_w_s, hand_h_s );

  var hand_mat = new THREE.MeshBasicMaterial();
  hand_mat.map = new THREE.ImageUtils.loadTexture(
    hand_img);
  hand_mat.transparent = true;
  hand_mat.side = THREE.DoubleSide;
  hand_mat.depthWrite = false;

  var hand = new THREE.Mesh( hand_geometry, hand_mat );

  hand.position.set( 30, hand_h / 2 - 5, hand_w / 2 - 46);
  hand.rotation.y = - Math.PI / 2;
  hand.name = "hand";
  scene.add( hand );


  var tuft_images = ["./textures/tuft/tuft1.png","./textures/tuft/tuft2.png","./textures/tuft/tuft3.png"];
  var tuft_img = tuft_images[Math.floor(Math.random() * tuft_images.length)];

  var tuft_w = 20, tuft_h = 17.2, tuft_w_s =1, tuft_h_s = 100;
  var tuft_geometry = new THREE.PlaneGeometry( tuft_w, tuft_h, tuft_w_s, tuft_h_s );

  var tuft_mat = new THREE.MeshBasicMaterial();
  tuft_mat.map = new THREE.ImageUtils.loadTexture(
    tuft_img);
  tuft_mat.transparent = true;
  tuft_mat.side = THREE.DoubleSide;
  tuft_mat.depthWrite = false;
  var tuft = new THREE.Mesh( tuft_geometry, tuft_mat );

  tuft.position.set( 30, tuft_h / 2 + 54.4, tuft_w / 2 - 10);
  tuft.rotation.y = - Math.PI / 2 + 0.7;
  scene.add( tuft );


  var shirt_images = ["./textures/shirts/shirt1.png","./textures/shirts/shirt2.png"];
  var shirt_img = shirt_images[Math.floor(Math.random() * shirt_images.length)];

  var shirt_w = 57.5, shirt_h = 30.1, shirt_w_s =1, shirt_h_s = 100;
  var shirt_geometry = new THREE.PlaneGeometry( shirt_w, shirt_h, shirt_w_s, shirt_h_s );

  var shirt_mat = new THREE.MeshBasicMaterial();
  shirt_mat.map = new THREE.ImageUtils.loadTexture(
    shirt_img);
  shirt_mat.transparent = true;
  shirt_mat.side = THREE.DoubleSide;
  shirt_mat.depthWrite = false;
  var shirt = new THREE.Mesh( shirt_geometry, shirt_mat );

  shirt.position.set( 40, shirt_h / 2 + 3, shirt_w / 2 - 30);
  shirt.rotation.y = - Math.PI / 2;
  scene.add( shirt );

  var hair_images = ["./textures/hair/hair1.png","./textures/hair/hair2.png","./textures/hair/hair3.png"];
  var hair_img = hair_images[Math.floor(Math.random() * hair_images.length)];

  var hair_w = 36.8, hair_h = 35.5, hair_w_s =1, hair_h_s = 100;
  var hair_geometry = new THREE.PlaneGeometry( hair_w, hair_h, hair_w_s, hair_h_s );

  var hair_mat = new THREE.MeshBasicMaterial();
  hair_mat.map = new THREE.ImageUtils.loadTexture(
    hair_img);
  hair_mat.transparent = true;
  hair_mat.side = THREE.DoubleSide;
  hair_mat.depthWrite = false;
  var hair = new THREE.Mesh( hair_geometry, hair_mat );

  hair.position.set( 35, hair_h / 2 + 45, hair_w / 2 - 23.5);
  hair.rotation.y = - Math.PI / 2;
  scene.add( hair );

  var eyebrows_w = 20.9, eyebrows_h = 2.6, eyebrows_w_s =1, eyebrows_h_s = 100;
  var eyebrows_geometry = new THREE.PlaneGeometry( eyebrows_w, eyebrows_h, eyebrows_w_s, eyebrows_h_s );

  var eyebrows_mat = new THREE.MeshBasicMaterial();
  eyebrows_mat.map = new THREE.ImageUtils.loadTexture(
    "./textures/eyebrows.png");
  eyebrows_mat.transparent = true;
  eyebrows_mat.side = THREE.DoubleSide;
  eyebrows_mat.depthWrite = false;
  var eyebrows = new THREE.Mesh( eyebrows_geometry, eyebrows_mat );

  eyebrows.position.set( 40, eyebrows_h / 2 + 54.5, eyebrows_w / 2 - 14.1);
  eyebrows.rotation.y = - Math.PI / 2;
  scene.add( eyebrows );


  var eyes_w = 19.2, eyes_h = 3.5, eyes_w_s =1, eyes_h_s = 100;
  var eyes_geometry = new THREE.PlaneGeometry( eyes_w, eyes_h, eyes_w_s, eyes_h_s );

  var eyes_mat = new THREE.MeshBasicMaterial();
  eyes_mat.map = new THREE.ImageUtils.loadTexture(
    "./textures/eyes.gif");
  eyes_mat.transparent = true;
  eyes_mat.side = THREE.DoubleSide;
  eyes_mat.depthWrite = false;
  var eyes = new THREE.Mesh( eyes_geometry, eyes_mat );

  eyes.position.set( 40, eyes_h / 2 + 52, eyes_w / 2 - 13.1);
  eyes.rotation.y = - Math.PI / 2;
  scene.add( eyes );

  var body_w = 54.3, body_h = 70.9, body_w_s =1, body_h_s = 100;
  var body_geometry = new THREE.PlaneGeometry( body_w, body_h, body_w_s, body_h_s );

  var body_mat = new THREE.MeshBasicMaterial();
  body_mat.map = new THREE.ImageUtils.loadTexture(
    "./textures/body.png");
  body_mat.transparent = true;
  body_mat.side = THREE.DoubleSide;
  body_mat.depthWrite = false;
  var body = new THREE.Mesh( body_geometry, body_mat );

  body.position.set( 50, body_h / 2 + 5, body_w / 2 - 26.7);
  body.rotation.y = - Math.PI / 2;
  scene.add( body );


  var text_images = ["./textures/text/text1.png","./textures/text/text2.png","./textures/text/text3.png","./textures/text/text4.png"];
  var text_img = text_images[Math.floor(Math.random() * text_images.length)];

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
  for (var i=0; i<100; i++) {
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
  var bG_images = ["./textures/backgrounds/background1.png","./textures/backgrounds/background2.png"];
  var bG = bG_images[Math.floor(Math.random() * bG_images.length)];
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
  var particleCountA = 30,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20,
      map: THREE.ImageUtils.loadTexture(
        "./textures/petals/petal1.png"
      ),
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

      particle.velocity = new THREE.Vector3(
        0,        // x
        -Math.random(), // y
        0);       // z
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


