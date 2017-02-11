class Lightbox {
  
  constructor(targetContainer, image) {
    // container
    this.container = targetContainer;

    // lightbox
    this.lightboxDiv = document.createElement("div");
    this.lightboxDiv.setAttribute("class", "lightbox-target");
    this.lightboxDiv.id = "lightbox-" + image.id;

    var lightboxImg = document.createElement("img");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    // lightbox div
    this.lightboxDiv.appendChild(lightboxImg);

    this.lightboxDiv.onclick = this.remove.bind(this);

    this.container.appendChild(this.lightboxDiv);
  }

  remove() {
    this.container.removeChild(this.lightboxDiv);
  }
}

export default Lightbox;