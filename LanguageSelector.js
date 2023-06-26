let rtl = [
  "ar",
  "ur",
  "fa",
  "he",
  "arc",
  "az",
  "dv",
  "arabic",
  "aramaic",
  "azeri",
  "maldivian",
  "dhivehi",
  "hebrew",
  "kurdish",
  "persian",
  "urdu"
];
class LanguageSelector {
  setLang(lang) {
    l = lang.toLowerCase();
    localStorage.setItem("lang", l);
    return true;
  }
  getLang() {
    var lang = localStorage.getItem("lang");
    if (lang != null) {
      return lang;
    } else {
      return "en";
    }
  }
  removeLang() {
    localStorage.removeItem("lang");
    return true;
  }
  loadLang() {
    var l = this.getLang();
    var strs = lang[l];
    return strs;
  }

  parse(node) {
    var lang = this.loadLang();
    var len = lang.length - 1;
    var keys = Object.keys(lang);
    var values = Object.values(lang);
    for (var i = 0; i <= keys.length - 1; i++) {
      node.innerText = node.innerText.replaceAll(keys[i], values[i]);
    }
    return true;
  }
  dfsTraversal(node) {
    if (node.childNodes.length == 1) {
      this.parse(node);
      return true;
    } else {
      node = node.firstChild;
      while (node) {
        this.dfsTraversal(node);
        node = node.nextSibling;
      }
    }
  }

  //if your website uses animations based on language directions , this function sets it. 
  changeSideFade() {
    var elementsToFade = document.querySelectorAll(
      ".fadeInRight , .fadeInLeft "
    );
    for (var i = 0; i < elementsToFade.length; i++) {
      if (elementsToFade[i].classList.contains("fadeInLeft")) {
        elementsToFade[i].classList.remove("fadeInLeft");
        elementsToFade[i].classList.add("fadeInRight");
      } else {
        elementsToFade[i].classList.remove("fadeInRight");
        elementsToFade[i].classList.add("fadeInLeft");
      }
    }
    return true;
  }
  changeLanguage(node) {
    if (rtl.includes(this.getLang())) {
      this.changeSideFade();
      document.body.style.direction = "rtl";
    }
    this.dfsTraversal(node);
    return true;
  }
}
