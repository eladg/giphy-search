// add the style tag into our dom
require("./style/loader.css");
require("./style/site.css");

// load our environment config file
var config = require("./config");

import ImageView from "./imageView";
import Lightbox from "./lightbox";

class Application {

  constructor(conf) {
    // elements
    this.root = document.getElementsByTagName("body")[0];

    // init + add the loader to dom
    this.loader = this.initLoader();
    this.loaderShows = false;

    // the input keyboard textfield / clear button
    this.initInterface();

    // set the images container
    this.imagesRoot = document.createElement("div");
    this.imagesRoot.setAttribute("class", "images");
    this.root.appendChild(this.imagesRoot);

    // init properties
    this.apiUrl = conf.apiUrl + "?api_key=" + conf.apiKey + "&limit=" + conf.limit;

    // init images data
    this.images = [];
  }

  request(query, callback) {
    
    // the request's url
    var url = this.apiUrl + "&q=" + query;

    // XMLHttpRequest...
    var request = new XMLHttpRequest();
    request.onreadystatechange = ( function(res) {
      
      // check response
      if (request.status === 200 && request.readyState === XMLHttpRequest.DONE) {
        try {
          var data = JSON.parse(request.responseText)
          callback(data);
        } catch(err) {
          console.log("failed parsing api response... :(");
          console.error(err);        
        }
      }

      // handle error... maybe report an issue and retry.
      if (request.status && request.status !== 200) {
        console.error("failed to fetch data... :(");
      }
    }).bind(this);

    request.open("GET", url);
    request.send();
  }

  initInterface() {
    this.interface = document.createElement("div");
    this.interface.setAttribute("class", "interface");

    var textField = this.initTextfield();
    this.interface.appendChild(textField);

    var clearButton = this.initClearButton();
    this.interface.appendChild(clearButton);
  
    this.root.appendChild(this.interface);
  }

  initClearButton() {
    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Clear";

    button.onclick = (function(e) {
      this.clear();
    }).bind(this);

    return button;
  }

  initLoader() {
    var loader = document.createElement("div");
    loader.setAttribute("class", "loader");

    var circle = document.createElement("div");
    circle.setAttribute("class", "loader_circle");
    loader.appendChild(circle);

    var text = document.createElement("p");
    text.setAttribute("class", "loader_text");
    text.innerHTML = "loading...";
    loader.appendChild(text);

    return loader;
  }

  initTextfield() {
    var textField = document.createElement("input");
    textField.placeholder = "search for something cool and press enter...";
    textField.id="input";

    textField.onkeydown = (function(event) {
      if (event.keyCode == 13) {
        var query = event.target.value;
        console.log("searching for: " + query);
        this.search(query);
      }
    }).bind(this);

    return textField;
  }

  search(query) {
    this.toggleLoader();

    this.request(query, (function(response) {
  
      var imagesData = response.data;

      if (imagesData.length === 0) {
        console.log("sorry, no results...");
      }

      for (var i = 0; i < imagesData.length; i++) {
        var imageData = imagesData[i];
        var image = new ImageView(imageData, this.showLightBox.bind(this));
        this.addElement(image.element());
      }

      this.toggleLoader();

    }).bind(this));
  }

  showLightBox(e) {
    var lightbox = new Lightbox(this.root, e.target);
  }

  toggleLoader() {
    if (this.loaderShows) {
      this.removeElement(this.loader);
      this.loaderShows = false;
    } else {
      this.addElement(this.loader);
      this.loaderShows = true;
    }
  }

  addElement(elem) {
    this.imagesRoot.insertBefore(elem, this.imagesRoot.children[0]);
  }

  removeElement(elem) {
    this.imagesRoot.removeChild(elem);
  }

  clear() {
    this.imagesRoot.innerHTML = "";
  }

  run(query) {
    this.search(query);
  }
}

var app = new Application(config);
app.run("suprise");