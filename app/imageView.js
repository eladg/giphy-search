class ImageView {
  
  constructor(data, lightboxCallback) {
    
    this.id = data.id;
    this.src = data.images.fixed_height.url;
    
    if (data.username) {
      this.altName = data.username;
    } else {
      this.altName = "unknown";
    }
    
    if (data.user && data.user.display_name) {
      this.username = data.user.display_name;
    } else {
      this.username = "unknown";
    }
    
    if (data.user && data.user.profile_url) {
      this.userUrl = data.user.profile_url;
    } else {
      this.userUrl = "misisng profile url";
    }

    this.lightboxCallback = lightboxCallback;
  }

  element() {
    var imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "image");

    var link = document.createElement("a");
    link.setAttribute("href", "#" + this.id);

    var img = document.createElement("img");
    img.id = this.id;
    img.src = this.src;
    img.alt = this.altName;

    link.appendChild(img);

    var meta = document.createElement("div");
    meta.setAttribute("class", "meta");
    meta.innerHTML = "by " + this.username;
    meta.onclick = function(e) {
      e.stopPropagation();
    }

    link.appendChild(meta);
    
    // on click:
    imageDiv.onclick = this.lightboxCallback;
    imageDiv.id = "image-" + this.id;
    imageDiv.appendChild(link);

    return imageDiv;
  }
}

export default ImageView;