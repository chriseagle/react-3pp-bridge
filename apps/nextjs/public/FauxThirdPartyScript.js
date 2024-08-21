(function (global) {
  console.log("FauxThirdPartyScript.js loaded");
  const lib = {};
  lib.version = "1.0.0";
  lib.init = function () {
    console.log("FauxThirdPartyScript.js init");
    const node = document.querySelector("#faux-target");
    if (node) {
      node.innerHTML = "Faux Third Party Script DOM Manipulation";
    }

    if (
      global.FauxThirdPartyScriptCb &&
      Array.isArray(global.FauxThirdPartyScriptCb)
    ) {
      console.log("FauxThirdPartyScript.js callbacks");
      global.FauxThirdPartyScriptCb.forEach((cb) => {
        cb("init");
      });
    }
  };

  global.FauxThirdPartyScript = lib;

  if (document.readyState === "loading") {
    // Still loading
    document.addEventListener("DOMContentLoaded", function () {
      FauxThirdPartyScript.init();
    });
  } else {
    // DOM already loaded
    FauxThirdPartyScript.init();
  }
})(window);
