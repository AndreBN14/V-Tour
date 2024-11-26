// Esta clase guarda la información que se muestra en los paneles , además de vincular los eventos del clic

/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = (this.fadeBackgroundEl = document.querySelector('#fadeBackground'));

    this.placeTitleEl = document.querySelector('#infoTitle'); // Título del lugar
    this.placeDescriptionEl = document.querySelector('#infoDescription'); // Descripción del lugar

    // Información de los lugares históricos
    this.placeInfo = {
      huallamarcaButton: {
        title: 'Huaca Huallamarca',
        imgEl: document.querySelector('#huallamarcaInfoImage'),
        description:
          'La Huaca Huallamarca, conocida antiguamente como Pan de Azúcar, es un importante sitio arqueológico ubicado en San Isidro, Lima, Peru. Esta pirámide escalonada de 19 metros de altura fue utilizada como centro ceremonial, administrativo y cementerio a lo largo de su historia. Restaurada en el siglo XX, es un testimonio vivo del pasado prehispánico integrado al entorno urbano moderno.',
      },
      santoDomingoButton: {
        title: 'Convento de Santo Domingo',
        imgEl: document.querySelector('#santoDomingoInfoImage'),
        description:
          'El Convento de Santo Domingo es una de las joyas arquitectonicas e historicas de Lima. Construido en el siglo XVI, es famoso por su estilo barroco y su importancia religiosa. Alberga los restos de Santa Rosa de Lima, San Martin de Porres y San Juan Macias, los tres santos peruanos. Su claustro principal esta decorado con azulejos sevillanos del siglo XVII y pinturas que narran la vida de Santo Domingo de Guzman.',
      },
      puentePiedraButton: {
        title: 'Puente Piedra',
        imgEl: document.querySelector('#puentePiedraInfoImage'),
        description:
          'Puente Piedra, situado al norte de Lima, tiene una rica historia que se remonta al periodo colonial. Su nombre proviene de un antiguo puente construido en piedra que cruzaba el rio Chillón, facilitando el comercio y la conexion entre Lima y el interior del pais. Hoy en dia, el distrito que lleva su nombre es un importante punto de transito y desarrollo urbano en la capital peruana.',
      },
      
    };

    // Vinculación de eventos
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.backgroundEl = document.querySelector('#background');
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
    this.backgroundEl.addEventListener('click', this.onBackgroundClick);

    // Configuración de propiedades de visualización
    this.el.object3D.renderOrder = 2;
    this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 1;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  onMenuButtonClick: function (evt) {
    var placeInfo = this.placeInfo[evt.currentTarget.id];

    // Mostrar el fondo y la información del lugar seleccionado
    this.backgroundEl.object3D.scale.set(2, 2, 1);
    this.el.object3D.scale.set(2.5, 2.5, 2.5);

    if (AFRAME.utils.device.isMobile()) {
      this.el.object3D.scale.set(1.4, 1.4, 1.4);
    }

    this.el.object3D.visible = true;
    // this.fadeBackgroundEl.object3D.visible = true;

    if (this.placeImageEl) {
      this.placeImageEl.object3D.visible = false;
    }

    this.placeImageEl = placeInfo.imgEl;
    this.placeImageEl.object3D.visible = true;

    this.placeTitleEl.setAttribute('text', 'value', placeInfo.title);
    this.placeDescriptionEl.setAttribute('text', 'value', placeInfo.description);
  },

  onBackgroundClick: function () {
    // Ocultar el fondo y la información del lugar seleccionado
    this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
  },

  
});

